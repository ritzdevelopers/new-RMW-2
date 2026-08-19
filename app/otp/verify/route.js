import { NextResponse } from "next/server";
import {
  getOtpCookieName,
  getOtpCookieOptions,
  normalizeLocalPhone,
  validatePhoneForCountry,
  verifyOtpFromCookie,
} from "../../../lib/contactOtp";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const country = String(body.country || "").trim();
    const phone = String(body.phone || "").trim();
    const otp = String(body.otp || "").trim();

    const phoneError = validatePhoneForCountry(phone, country);
    if (phoneError) {
      return NextResponse.json({ message: phoneError }, { status: 400 });
    }

    const localPhone = normalizeLocalPhone(phone, country);
    const cookieValue = request.cookies.get(getOtpCookieName())?.value;
    const otpError = verifyOtpFromCookie(cookieValue, localPhone, otp);

    if (otpError) {
      return NextResponse.json({ message: otpError }, { status: 400 });
    }

    const response = NextResponse.json({
      ok: true,
      message: "Phone number verified.",
    });
    response.cookies.set(getOtpCookieName(), "", {
      ...getOtpCookieOptions(),
      maxAge: 0,
    });
    return response;
  } catch (error) {
    console.error("OTP verify failed:", error?.message || error);
    return NextResponse.json(
      { message: "Could not verify OTP. Please try again." },
      { status: 500 },
    );
  }
}
