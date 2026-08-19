import { NextResponse } from "next/server";
import {
  assertCanResend,
  createOtpCookieValue,
  generateOtp,
  getOtpCookieName,
  getOtpCookieOptions,
  getSmsNumber,
  sendOtpSms,
  validatePhoneForCountry,
  normalizeLocalPhone,
} from "../../../lib/contactOtp";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const country = String(body.country || "").trim();
    const phone = String(body.phone || "").trim();

    const phoneError = validatePhoneForCountry(phone, country);
    if (phoneError) {
      return NextResponse.json({ message: phoneError }, { status: 400 });
    }

    const localPhone = normalizeLocalPhone(phone, country);
    const waitSeconds = assertCanResend(
      request.cookies.get(getOtpCookieName())?.value,
    );
    if (waitSeconds) {
      return NextResponse.json(
        { message: `Please wait ${waitSeconds}s before requesting another OTP.` },
        { status: 429 },
      );
    }

    const otp = generateOtp();
    const smsNumber = getSmsNumber(localPhone, country);
    await sendOtpSms(smsNumber, otp);

    const response = NextResponse.json({
      ok: true,
      message: "OTP sent to your phone number.",
    });
    response.cookies.set(
      getOtpCookieName(),
      createOtpCookieValue(localPhone, otp),
      getOtpCookieOptions(),
    );
    return response;
  } catch (error) {
    console.error("OTP send failed:", error?.message || error);
    return NextResponse.json(
      { message: "Could not send OTP. Please try again." },
      { status: 500 },
    );
  }
}
