import "server-only";

import { createHmac, randomInt, timingSafeEqual } from "crypto";

const OTP_TTL_MS = 5 * 60 * 1000;
const RESEND_COOLDOWN_MS = 45 * 1000;
const OTP_COOKIE = "contact_otp";

const COUNTRY_PHONE_RULES = {
  India: { length: 10, regex: /^[6-9]\d{9}$/, countryCodes: ["91"] },
  UAE: { length: 9, regex: /^5\d{8}$/, countryCodes: ["971"] },
  UK: { length: 10, regex: /^7\d{9}$/, countryCodes: ["44"] },
  Singapore: { length: 8, regex: /^[89]\d{7}$/, countryCodes: ["65"] },
  USA: { length: 10, regex: /^[2-9]\d{2}[2-9]\d{6}$/, countryCodes: ["1"] },
};

function getSecret() {
  return process.env.SMS_API_KEY || process.env.OTP_SECRET || "";
}

export function generateOtp() {
  return String(randomInt(0, 10000)).padStart(4, "0");
}

export function normalizeLocalPhone(phone, country) {
  let digits = String(phone || "").replace(/\D/g, "");
  if (!digits) return "";

  const rule = COUNTRY_PHONE_RULES[country];
  if (!rule) return digits;

  const maxLen = rule.length;
  const codes = [...(rule.countryCodes || [])].sort(
    (a, b) => b.length - a.length,
  );

  for (const code of codes) {
    if (digits.startsWith(code) && digits.length > maxLen) {
      digits = digits.slice(code.length);
      break;
    }
  }

  if (digits.startsWith("0") && digits.length > maxLen) {
    digits = digits.slice(1);
  }

  return digits;
}

export function getSmsNumber(phone, country) {
  const local = normalizeLocalPhone(phone, country);
  const rule = COUNTRY_PHONE_RULES[country];
  if (!rule || !local) return local;
  if (country === "India") return local;
  return `${rule.countryCodes[0]}${local}`;
}

export function validatePhoneForCountry(phone, country) {
  if (!country || !COUNTRY_PHONE_RULES[country]) {
    return "Please select a valid country.";
  }

  const local = normalizeLocalPhone(phone, country);
  const rule = COUNTRY_PHONE_RULES[country];

  if (!local) return "Please enter your phone number.";
  if (local.length !== rule.length || !rule.regex.test(local)) {
    return "Please enter a valid phone number.";
  }

  if (/^(\d)\1+$/.test(local)) {
    return "Please enter a valid phone number.";
  }

  return null;
}

function hashOtp(otp, phone) {
  return createHmac("sha256", getSecret())
    .update(`${phone}:${otp}`)
    .digest("hex");
}

function sign(value) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createOtpCookieValue(phone, otp) {
  const payload = JSON.stringify({
    p: phone,
    h: hashOtp(otp, phone),
    e: Date.now() + OTP_TTL_MS,
    s: Date.now(),
  });
  const body = Buffer.from(payload).toString("base64url");
  return `${body}.${sign(body)}`;
}

function readSignedPayload(cookieValue) {
  if (!cookieValue || !getSecret()) return null;
  const sep = cookieValue.lastIndexOf(".");
  if (sep < 0) return null;

  const body = cookieValue.slice(0, sep);
  const signature = cookieValue.slice(sep + 1);
  const expected = sign(body);

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

export function getOtpCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(OTP_TTL_MS / 1000),
  };
}

export function getOtpCookieName() {
  return OTP_COOKIE;
}

export function assertCanResend(cookieValue) {
  const payload = readSignedPayload(cookieValue);
  if (!payload) return null;
  const waitMs = payload.s + RESEND_COOLDOWN_MS - Date.now();
  if (waitMs > 0) {
    return Math.ceil(waitMs / 1000);
  }
  return null;
}

export function verifyOtpFromCookie(cookieValue, phone, otp) {
  const payload = readSignedPayload(cookieValue);
  if (!payload) return "OTP expired. Please request a new code.";
  if (payload.e < Date.now()) return "OTP expired. Please request a new code.";
  if (payload.p !== phone) return "Phone number does not match this OTP.";

  const submitted = String(otp || "").trim();
  if (!/^\d{4}$/.test(submitted)) return "Enter the 4-digit OTP.";

  const expected = hashOtp(submitted, phone);
  const a = Buffer.from(payload.h);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return "Invalid OTP. Please try again.";
  }

  return null;
}

export async function sendOtpSms(number, otp) {
  const apiUrl = process.env.SMS_API_URL;
  const apiKey = process.env.SMS_API_KEY;
  const senderId = process.env.SMS_SENDER_ID || "RITZMW";
  const template =
    process.env.SMS_OTP_TEMPLATE ||
    "{otp} is your verification code. Don't share your code with anyone. Team CONTENAISSANCE";

  if (!apiUrl || !apiKey) {
    throw new Error("SMS is not configured.");
  }

  const message = template.replaceAll("{otp}", otp);
  const url = new URL(apiUrl);
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("senderid", senderId);
  url.searchParams.set("number", number);
  url.searchParams.set("message", message);

  const response = await fetch(url.toString(), { method: "GET", cache: "no-store" });
  const text = await response.text().catch(() => "");

  if (!response.ok) {
    throw new Error("Failed to send OTP.");
  }

  return text;
}
