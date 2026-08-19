"use client";

import React, { useEffect, useRef, useState } from "react";
import { Smartphone } from "lucide-react";

const fontFamily = '"League Spartan", sans-serif';
const bodyFont = '"Montserrat", sans-serif';

const NAVY = "#0D1334";

const COUNTRY_OPTIONS = ["India", "UAE", "UK", "Singapore", "USA"];

const COUNTRY_PHONE_RULES = {
  India: {
    length: 10,
    regex: /^[6-9]\d{9}$/,
    countryCodes: ["91"],
    message: "Enter a valid 10-digit Indian mobile number starting with 6–9.",
  },
  UAE: {
    length: 9,
    regex: /^5\d{8}$/,
    countryCodes: ["971"],
    message: "Enter a valid 9-digit UAE mobile number starting with 5.",
  },
  UK: {
    length: 10,
    regex: /^7\d{9}$/,
    countryCodes: ["44"],
    message: "Enter a valid 10-digit UK mobile number starting with 7.",
  },
  Singapore: {
    length: 8,
    regex: /^[89]\d{7}$/,
    countryCodes: ["65"],
    message: "Enter a valid 8-digit Singapore mobile number starting with 8 or 9.",
  },
  USA: {
    length: 10,
    regex: /^[2-9]\d{2}[2-9]\d{6}$/,
    countryCodes: ["1"],
    message: "Enter a valid 10-digit USA phone number (area code cannot start with 0 or 1).",
  },
};

const REPEATED_PATTERN_MESSAGE =
  "Please enter a valid phone number. Repeated patterns like 9999999999, 8888888888, 0000000000, or 9898989898 are not allowed.";

const EMAIL_INVALID_MESSAGE =
  "Please enter a valid email address (e.g. name@example.com).";

const REASON_OPTIONS = [
  "General Inquiry",
  "New Project",
  "RFP Submission",
  "Partnership",
];

const HOW_HEARD_OPTIONS = [
  "Search Engine",
  "Social Media",
  "Referral",
  "Advertisement",
  "Other",
];

function hasInvalidRepeatedPattern(digits) {
  if (!digits) return false;
  if (/^(\d)\1+$/.test(digits)) return true;
  if (digits.length >= 4 && /^(\d)(\d)(?:\1\2)+$/.test(digits)) return true;
  if (digits.length >= 4 && /^(\d{2})\1+$/.test(digits)) return true;
  return false;
}

function normalizeLocalPhone(phone, country) {
  let digits = String(phone || "").replace(/\D/g, "");
  if (!digits) return "";

  const rule = COUNTRY_PHONE_RULES[country];
  if (!rule) return digits;

  const lengths = Array.isArray(rule.length) ? rule.length : [rule.length];
  const maxLen = Math.max(...lengths);

  const codes = [...(rule.countryCodes || [])].sort((a, b) => b.length - a.length);
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

function validatePhoneForCountry(phone, country) {
  if (!country) return "Please select a country.";

  const rule = COUNTRY_PHONE_RULES[country];
  if (!rule) return "Please select a valid country.";

  const local = normalizeLocalPhone(phone, country);
  if (!local) return "Please enter your phone number.";

  const lengths = Array.isArray(rule.length) ? rule.length : [rule.length];
  if (!lengths.includes(local.length) || !rule.regex.test(local)) {
    return rule.message;
  }

  if (hasInvalidRepeatedPattern(local)) return REPEATED_PATTERN_MESSAGE;
  return null;
}

const EMAIL_LOCAL_SPECIALS =
  "!#$%&'*+-/=?^_" + String.fromCharCode(96) + "{|}~.";

function isAllowedEmailLocalChar(char) {
  const code = char.charCodeAt(0);
  if (code >= 48 && code <= 57) return true;
  if (code >= 65 && code <= 90) return true;
  if (code >= 97 && code <= 122) return true;
  return EMAIL_LOCAL_SPECIALS.includes(char);
}

function isAllowedDomainLabelChar(char) {
  const code = char.charCodeAt(0);
  if (code >= 48 && code <= 57) return true;
  if (code >= 65 && code <= 90) return true;
  if (code >= 97 && code <= 122) return true;
  return char === "-";
}

function validateEmail(email) {
  const value = String(email || "").trim();
  if (!value) return "Please enter your email address.";

  const atIndex = value.indexOf("@");
  if (atIndex <= 0 || atIndex !== value.lastIndexOf("@")) {
    return EMAIL_INVALID_MESSAGE;
  }

  const local = value.slice(0, atIndex);
  const domain = value.slice(atIndex + 1);

  if (
    !local ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..")
  ) {
    return EMAIL_INVALID_MESSAGE;
  }

  for (let i = 0; i < local.length; i += 1) {
    if (!isAllowedEmailLocalChar(local[i])) {
      return EMAIL_INVALID_MESSAGE;
    }
  }

  if (!domain || !domain.includes(".")) return EMAIL_INVALID_MESSAGE;

  const labels = domain.split(".");
  if (labels.length < 2) return EMAIL_INVALID_MESSAGE;

  const tld = labels[labels.length - 1];
  if (tld.length < 2 || !/^[A-Za-z]+$/.test(tld)) {
    return EMAIL_INVALID_MESSAGE;
  }

  for (const label of labels) {
    if (!label || label.startsWith("-") || label.endsWith("-")) {
      return EMAIL_INVALID_MESSAGE;
    }
    for (let i = 0; i < label.length; i += 1) {
      if (!isAllowedDomainLabelChar(label[i])) {
        return EMAIL_INVALID_MESSAGE;
      }
    }
  }

  return null;
}

function getPhoneMaxLength(country) {
  const rule = COUNTRY_PHONE_RULES[country];
  if (!rule) return 15;
  const lengths = Array.isArray(rule.length) ? rule.length : [rule.length];
  return Math.max(...lengths) + 4;
}

const labelClass =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em]";
const inputClass =
  "w-full border-0 border-b border-[#D5D7E0] bg-transparent px-0 py-2.5 text-[14px] leading-snug text-[#12141F] outline-none transition-colors duration-200 placeholder:text-[#12141F55]";
const selectClass = inputClass + " appearance-none cursor-pointer pr-8";
const fieldErrorClass = "mt-1.5 text-[12px] leading-snug text-[#C23B3B]";
const inputErrorClass = " border-[#C23B3B]";
const lockedInputClass =
  "cursor-not-allowed border-[#E7DCC8] bg-[#FBF8F2] text-[#12141FCC]";
const lockedSelectClass = "cursor-not-allowed text-[#12141FCC]";

function maskPhoneForDisplay(phone, country) {
  const local = normalizeLocalPhone(phone, country);
  if (!local || local.length < 4) return local;
  return `${local.slice(0, 2)}****${local.slice(-2)}`;
}

function OtpInput({ value, onChange, error, disabled }) {
  const inputRefs = useRef([]);
  const digits = value.padEnd(4, " ").split("").slice(0, 4);

  const updateValue = (nextDigits) => {
    onChange(nextDigits.join("").replace(/\s/g, ""));
  };

  const focusIndex = (index) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  const handleChange = (index, rawValue) => {
    const digit = rawValue.replace(/\D/g, "").slice(-1);
    const next = [...digits.map((d) => (d === " " ? "" : d))];
    next[index] = digit;
    while (next.length < 4) next.push("");
    updateValue(next);
    if (digit && index < 3) focusIndex(index + 1);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...digits.map((d) => (d === " " ? "" : d))];
      if (next[index]) {
        next[index] = "";
        updateValue(next);
      } else if (index > 0) {
        next[index - 1] = "";
        updateValue(next);
        focusIndex(index - 1);
      }
      return;
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusIndex(index - 1);
    }
    if (e.key === "ArrowRight" && index < 3) {
      e.preventDefault();
      focusIndex(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!pasted) return;
    onChange(pasted);
    focusIndex(Math.min(pasted.length, 3));
  };

  return (
    <div
      className="grid grid-cols-4 gap-3"
      role="group"
      aria-label="Enter 4-digit verification code"
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit === " " ? "" : digit}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          data-otp-index={index}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={`h-14 w-full rounded-[14px] border text-center text-[24px] font-semibold outline-none transition-colors ${
            error
              ? "border-[#C23B3B] bg-[#FFF4F4] text-[#C23B3B]"
              : digit && digit !== " "
                ? "border-[#D59E47] bg-[#FFF8EC] text-[#12141F]"
                : "border-[#E6E7EE] bg-white text-[#12141F]"
          } ${disabled ? "cursor-not-allowed opacity-70" : "focus:border-[#D59E47]"}`}
          style={{ fontFamily: bodyFont }}
        />
      ))}
    </div>
  );
}

function StatusAlert({ status, onDismiss }) {
  if (!status) return null;

  const success = status.type === "success";

  return (
    <div
      role={success ? "status" : "alert"}
      aria-live="polite"
      className={`fixed right-4 top-30 z-[1100] w-[calc(100vw-32px)] max-w-[360px] rounded-[16px] px-4 py-3 shadow-[0_18px_50px_rgba(13,19,52,0.18)] ${
        success ? "bg-[#EEF9F2] text-[#1F8A4C]" : "bg-[#FFF4F4] text-[#C23B3B]"
      }`}
      style={{ fontFamily: bodyFont }}
    >
      <button
        type="button"
        onClick={onDismiss}
        className="absolute right-3 top-3 cursor-pointer text-current/65 hover:text-current"
        aria-label="Dismiss message"
      >
        <i className="ri-close-line text-lg" />
      </button>
      <p className="m-0 pr-6 text-[12px] font-semibold uppercase tracking-[0.12em]">
        {status.title || (success ? "Success" : "Something went wrong")}
      </p>
      <p className="mt-1 pr-6 text-[13px] leading-snug">{status.text}</p>
      {status.hint ? (
        <p className="mt-1 pr-6 text-[12px] leading-snug opacity-80">{status.hint}</p>
      ) : null}
    </div>
  );
}

function SelectChevron() {
  return (
    <i
      className="ri-arrow-down-s-line pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-xl"
      style={{ color: NAVY }}
      aria-hidden
    />
  );
}

function setFieldFocus(el, focused, hasError) {
  if (!el) return;
  el.style.borderBottomColor = focused
    ? NAVY
    : hasError
      ? "#C23B3B"
      : "#D5D7E0";
}

export default function DetailContactForm() {
  const formRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [country, setCountry] = useState("");
  const [phoneError, setPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState(null);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [lockedPhone, setLockedPhone] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const formLocked = otpSent && !otpVerified;

  useEffect(() => {
    if (!otpSent || otpVerified || resendCountdown <= 0) return;
    const timer = window.setInterval(() => {
      setResendCountdown((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [otpSent, otpVerified, resendCountdown]);

  useEffect(() => {
    if (!formLocked) return;
    const timer = window.setTimeout(() => {
      const firstOtpInput = document.querySelector('[data-otp-index="0"]');
      firstOtpInput?.focus();
    }, 150);
    return () => window.clearTimeout(timer);
  }, [formLocked]);

  const handleNameInput = (e) => {
    if (formLocked) return;
    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z '-]/g, "");
  };

  const handlePhoneInput = (e) => {
    if (formLocked) return;
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9+]/g, "");
    if (phoneError) setPhoneError(null);
  };

  const handleEmailInput = () => {
    if (emailError) setEmailError(null);
  };

  const handleCountryChange = (e) => {
    if (formLocked) return;
    setCountry(e.target.value);
    setPhoneError(null);
  };

  const sendOtp = async (phone, selectedCountry) => {
    setSendingOtp(true);
    setOtpError(null);

    try {
      const response = await fetch("/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, country: selectedCountry }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = result.message || "Could not send OTP. Please try again.";
        setOtpError(message);
        setStatus({
          type: "error",
          title: "OTP not sent",
          text: message,
          hint: "Check your phone number and try again.",
        });
        return false;
      }

      setOtpSent(true);
      setOtpVerified(false);
      setOtpValue("");
      setLockedPhone(phone);
      setResendCountdown(45);
      setStatus({
        type: "success",
        title: "Verification code sent",
        text: `We sent a 4-digit code to ${maskPhoneForDisplay(phone, selectedCountry)}.`,
        hint: "Your blog enquiry details are locked until you verify the OTP.",
      });
      return true;
    } catch (error) {
      console.error("OTP send error:", error);
      setOtpError("Could not send OTP. Please try again.");
      setStatus({
        type: "error",
        title: "OTP not sent",
        text: "Could not send OTP. Please try again.",
      });
      return false;
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async (phone, selectedCountry, otp) => {
    try {
      const response = await fetch("/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, country: selectedCountry, otp }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = result.message || "Invalid OTP. Please try again.";
        setOtpError(message);
        setStatus({
          type: "error",
          title: "Verification failed",
          text: message,
          hint: "Double-check the 4-digit OTP or resend it.",
        });
        return false;
      }

      setOtpVerified(true);
      setOtpError(null);
      setStatus({
        type: "success",
        title: "Phone verified",
        text: "Your number is verified. Submitting your enquiry now.",
      });
      return true;
    } catch (error) {
      console.error("OTP verify error:", error);
      setOtpError("Could not verify OTP. Please try again.");
      setStatus({
        type: "error",
        title: "Verification failed",
        text: "Could not verify OTP. Please try again.",
      });
      return false;
    }
  };

  const closeOtpModal = () => {
    setOtpSent(false);
    setOtpVerified(false);
    setOtpValue("");
    setOtpError(null);
    setLockedPhone("");
    setResendCountdown(0);
    setSubmitting(false);
    setSendingOtp(false);
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstName = (formData.get("firstName") || "").toString().trim();
    const lastName = (formData.get("lastName") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const phone = (formData.get("phone") || "").toString().trim();
    const reason = (formData.get("reason") || "").toString().trim();
    const selectedCountry = (
      formData.get("country") ||
      country ||
      ""
    )
      .toString()
      .trim();
    const howHeard = (formData.get("howHeard") || "").toString().trim();
    const messageText = (formData.get("message") || "").toString().trim();

    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      setStatus({ type: "error", text: emailValidationError });
      return;
    }

    const phoneValidationError = validatePhoneForCountry(
      phone,
      selectedCountry,
    );
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      setStatus({ type: "error", text: phoneValidationError });
      return;
    }

    const normalizedPhone = normalizeLocalPhone(phone, selectedCountry);
    const message = [
      `Reason for Inquiry: ${reason || "N/A"}`,
      `Country: ${selectedCountry || "N/A"}`,
      `How did you hear about us: ${howHeard || "N/A"}`,
      "",
      `Message: ${messageText || "N/A"}`,
    ].join("\n");

    const data = {
      etype: "ContactUs",
      name: `${firstName} ${lastName}`.trim(),
      phone: normalizedPhone,
      email,
      message,
    };

    setSubmitting(true);
    setStatus(null);
    setPhoneError(null);
    setEmailError(null);
    setOtpError(null);

    if (!otpSent || !otpVerified) {
      if (!otpSent) {
        await sendOtp(normalizedPhone, selectedCountry);
        setSubmitting(false);
        return;
      }

      const enteredOtp = otpValue.trim();
      if (!/^\d{4}$/.test(enteredOtp)) {
        const message = "Enter the 4-digit OTP sent to your phone.";
        setOtpError(message);
        setStatus({
          type: "error",
          title: "Enter verification code",
          text: message,
        });
        setSubmitting(false);
        return;
      }

      const verified = await verifyOtp(normalizedPhone, selectedCountry, enteredOtp);
      if (!verified) {
        setSubmitting(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/system-settings/contact-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus({
          type: "success",
          title: "Enquiry submitted",
          text: result.message || "Query submitted successfully!",
        });
        form.reset();
        setCountry("");
        setPhoneError(null);
        setEmailError(null);
        setOtpSent(false);
        setOtpVerified(false);
        setOtpValue("");
        setOtpError(null);
        setLockedPhone("");
      } else {
        setStatus({
          type: "error",
          title: "Submission failed",
          text: result.message || "Submission failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({
        type: "error",
        title: "Server error",
        text: "Server error. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden   border border-[#ECECF2] bg-white ">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
       
        aria-hidden
      />

      <div className="relative px-5 pb-6 pt-6 sm:px-6 sm:pb-7 sm:pt-7">
        <div className="mb-6 border-b border-[#ECECF2] pb-5">
          <p
            className="m-0 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ fontFamily: bodyFont, color: '#D59E47' }}
          >
            Contact
          </p>
          <h3
            className="m-0 mt-1.5 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[26px]"
            style={{ fontFamily: fontFamily, color: NAVY }}
          >
            Get in Touch
          </h3>
          <p
            className="m-0 mt-2 max-w-[54ch] text-[14px] leading-[1.5] text-[#5A5D6B]"
            style={{ fontFamily: bodyFont }}
          >
            Share your brief and we will connect you with the right person.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <label className="block">
              <span
                className={labelClass}
                style={{ fontFamily: bodyFont, color: NAVY }}
              >
                First Name*
              </span>
              <input
                type="text"
                name="firstName"
                required
                placeholder="Name"
                readOnly={formLocked}
                className={inputClass + (formLocked ? lockedInputClass : "")}
                style={{ fontFamily: bodyFont }}
                onInput={handleNameInput}
                onFocus={(e) => setFieldFocus(e.currentTarget, true, false)}
                onBlur={(e) => setFieldFocus(e.currentTarget, false, false)}
              />
            </label>
            <label className="block">
              <span
                className={labelClass}
                style={{ fontFamily: bodyFont, color: NAVY }}
              >
                Last Name*
              </span>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Name"
                readOnly={formLocked}
                className={inputClass + (formLocked ? lockedInputClass : "")}
                style={{ fontFamily: bodyFont }}
                onInput={handleNameInput}
                onFocus={(e) => setFieldFocus(e.currentTarget, true, false)}
                onBlur={(e) => setFieldFocus(e.currentTarget, false, false)}
              />
            </label>
          </div>

          <div>
            <label className="block">
              <span
                className={labelClass}
                style={{ fontFamily: bodyFont, color: NAVY }}
              >
                Email Address*
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                readOnly={formLocked}
                className={
                  inputClass +
                  (emailError ? inputErrorClass : "") +
                  (formLocked ? lockedInputClass : "")
                }
                style={{ fontFamily: bodyFont }}
                onInput={handleEmailInput}
                aria-invalid={emailError ? "true" : undefined}
                onFocus={(e) => setFieldFocus(e.currentTarget, true, !!emailError)}
                onBlur={(e) => setFieldFocus(e.currentTarget, false, !!emailError)}
              />
            </label>
            {emailError ? (
              <p className={fieldErrorClass} style={{ fontFamily: bodyFont }}>
                {emailError}
              </p>
            ) : null}
          </div>

          <div>
            <label className="block">
              <span
                className={labelClass}
                style={{ fontFamily: bodyFont, color: NAVY }}
              >
                Phone Number*
              </span>
              <input
                type="tel"
                name="phone"
                required
                readOnly={formLocked}
                inputMode="numeric"
                maxLength={getPhoneMaxLength(country)}
                placeholder="Number"
                className={
                  inputClass +
                  (phoneError ? inputErrorClass : "") +
                  (formLocked ? lockedInputClass : "")
                }
                style={{ fontFamily: bodyFont }}
                onInput={handlePhoneInput}
                aria-invalid={phoneError ? "true" : undefined}
                onFocus={(e) => setFieldFocus(e.currentTarget, true, !!phoneError)}
                onBlur={(e) => setFieldFocus(e.currentTarget, false, !!phoneError)}
              />
            </label>
            {phoneError ? (
              <p className={fieldErrorClass} style={{ fontFamily: bodyFont }}>
                {phoneError}
              </p>
            ) : null}
          </div>

          <label className="block">
            <span
              className={labelClass}
              style={{ fontFamily: bodyFont, color: NAVY }}
            >
              Reason for Inquiry*
            </span>
            <div className="relative">
              <select
                name="reason"
                required
                disabled={formLocked}
                defaultValue=""
                className={selectClass + (formLocked ? ` ${lockedSelectClass}` : "")}
                style={{ fontFamily: bodyFont }}
                onFocus={(e) => setFieldFocus(e.currentTarget, true, false)}
                onBlur={(e) => setFieldFocus(e.currentTarget, false, false)}
              >
                <option value="">Select an option</option>
                {REASON_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <SelectChevron />
            </div>
          </label>

          <label className="block">
            <span
              className={labelClass}
              style={{ fontFamily: bodyFont, color: NAVY }}
            >
              Country*
            </span>
            <div className="relative">
              <select
                name="country"
                required
                disabled={formLocked}
                value={country}
                onChange={handleCountryChange}
                className={selectClass + (formLocked ? ` ${lockedSelectClass}` : "")}
                style={{ fontFamily: bodyFont }}
                onFocus={(e) => setFieldFocus(e.currentTarget, true, false)}
                onBlur={(e) => setFieldFocus(e.currentTarget, false, false)}
              >
                <option value="">Select your country</option>
                {COUNTRY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <SelectChevron />
            </div>
          </label>

          <label className="block">
            <span
              className={labelClass}
              style={{ fontFamily: bodyFont, color: NAVY }}
            >
              How did you hear about us?
            </span>
            <div className="relative">
              <select
                name="howHeard"
                disabled={formLocked}
                defaultValue=""
                className={selectClass + (formLocked ? ` ${lockedSelectClass}` : "")}
                style={{ fontFamily: bodyFont }}
                onFocus={(e) => setFieldFocus(e.currentTarget, true, false)}
                onBlur={(e) => setFieldFocus(e.currentTarget, false, false)}
              >
                <option value="">Select an option</option>
                {HOW_HEARD_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <SelectChevron />
            </div>
          </label>

          <label className="block">
            <span
              className={labelClass}
              style={{ fontFamily: bodyFont, color: NAVY }}
            >
              Message (Optional)
            </span>
            <textarea
              name="message"
              rows={3}
              placeholder="Message"
              readOnly={formLocked}
              className={
                inputClass +
                " min-h-[88px] resize-none" +
                (formLocked ? ` ${lockedInputClass}` : "")
              }
              style={{ fontFamily: bodyFont }}
              onFocus={(e) => setFieldFocus(e.currentTarget, true, false)}
              onBlur={(e) => setFieldFocus(e.currentTarget, false, false)}
            />
          </label>

          <div className="mt-1 flex justify-center">
            <button
              type="submit"
              disabled={submitting || sendingOtp}
              className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-white py-2 pl-5 pr-2 shadow-[0_6px_24px_rgba(0,0,0,0.22)] transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-60 md:gap-2.5 md:py-2 md:pl-6 md:pr-2"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 rounded-full bg-[#1D1D1B] transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-disabled:scale-x-0"
              />
              <span className="relative z-10 font-league-spartan text-[12px] font-medium uppercase tracking-[0.08em] text-[#1D1D1B] transition-colors duration-300 group-hover:text-white group-disabled:text-[#1D1D1B] md:text-[14px]">
                {sendingOtp
                  ? "Sending OTP..."
                  : submitting
                    ? formLocked
                      ? "Verifying..."
                      : "Submitting..."
                    : formLocked
                      ? "Verify & Submit"
                      : "Submit Enquiry"}
              </span>
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1D1B] text-white transition-[background-color,color,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 group-hover:bg-white group-hover:text-[#1D1D1B] group-disabled:rotate-0 group-disabled:bg-[#1D1D1B] group-disabled:text-white md:h-9 md:w-9">
                <i
                  className={
                    submitting || sendingOtp
                      ? "ri-loader-4-line animate-spin text-[14px] md:text-[16px]"
                      : "ri-arrow-right-up-line text-[14px] md:text-[16px]"
                  }
                  aria-hidden
                />
              </span>
            </button>
          </div>

        </form>

        {formLocked ? (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0D1334]/30 px-4 py-6 backdrop-blur-[3px]">
            <div className="relative w-full max-w-[560px] rounded-[28px] bg-white px-6 py-7 shadow-[0_30px_100px_rgba(13,19,52,0.22)] sm:px-8 sm:py-8">
              <button
                type="button"
                onClick={closeOtpModal}
                aria-label="Close OTP verification modal"
                className="absolute right-5 top-5 cursor-pointer rounded-full p-1 text-[#12141F33] transition-all duration-200 hover:bg-[#F5F5F7] hover:text-[#12141F99]"
              >
                <i className="ri-close-line text-[28px]" />
              </button>

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF4DD] text-[#D59E47]">
                <Smartphone className="h-[30px] w-[30px]" strokeWidth={1.9} />
              </div>

              <div className="mx-auto mt-5 max-w-[420px] text-center">
                <h4
                  className="text-[30px] font-semibold leading-tight text-[#12141F] sm:text-[34px]"
                  style={{ fontFamily: fontFamily }}
                >
                  Verify Your Number
                </h4>
                <p
                  className="mt-3 text-[14px] leading-6 text-[#5A5D6B]"
                  style={{ fontFamily: bodyFont }}
                >
                  Enter the 4-digit code sent to{" "}
                  <span className="font-medium text-[#12141F]">
                    {maskPhoneForDisplay(lockedPhone, country) || "your mobile number"}
                  </span>
                  .
                </p>
              </div>

              <div className="mx-auto mt-8 max-w-[430px]">
                <OtpInput
                  value={otpValue}
                  onChange={(next) => {
                    setOtpValue(next);
                    if (otpError) setOtpError(null);
                  }}
                  error={otpError}
                  disabled={submitting || sendingOtp}
                />
              </div>

              {otpError ? (
                <p
                  className="mx-auto mt-4 max-w-[430px] text-center text-[12px] leading-snug text-[#C23B3B]"
                  style={{ fontFamily: bodyFont }}
                >
                  {otpError}
                </p>
              ) : null}

              <div className="mx-auto mt-6 flex max-w-[430px] items-center justify-center gap-2 text-center">
                <p
                  className="text-[13px] leading-snug text-[#5A5D6B]"
                  style={{ fontFamily: bodyFont }}
                >
                  Didn&apos;t receive the code?
                </p>
                <button
                  type="button"
                  className="cursor-pointer text-[13px] font-medium text-[#12141F] underline underline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ fontFamily: bodyFont }}
                  disabled={sendingOtp || submitting || resendCountdown > 0}
                  onClick={() => {
                    const form = formRef.current;
                    if (!form) return;
                    const formData = new FormData(form);
                    const phone = (formData.get("phone") || "").toString().trim();
                    const selectedCountry = (formData.get("country") || country || "")
                      .toString()
                      .trim();
                    const normalizedPhone = normalizeLocalPhone(phone, selectedCountry);
                    sendOtp(normalizedPhone, selectedCountry);
                  }}
                >
                  {sendingOtp
                    ? "Sending..."
                    : resendCountdown > 0
                      ? `Resend in ${resendCountdown}s`
                      : "Resend Code"}
                </button>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => formRef.current?.requestSubmit()}
                  disabled={submitting || sendingOtp}
                  className="inline-flex min-w-[220px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[#D59E47] px-8 py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ fontFamily: fontFamily }}
                >
                  <span>{submitting ? "Verifying..." : "Verify OTP"}</span>
                  <i
                    className={
                      submitting
                        ? "ri-loader-4-line animate-spin text-[14px]"
                        : "ri-arrow-right-up-line text-[14px]"
                    }
                  />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <StatusAlert status={status} onDismiss={() => setStatus(null)} />
    </div>
  );
}
