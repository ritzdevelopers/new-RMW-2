"use client";

import React, { useState } from "react";

const fontFamily = '"League Spartan", sans-serif';

const NAVY = "#0D1334";
const ORANGE = "#E8542A";

const COUNTRY_OPTIONS = ["India", "UAE", "UK", "Singapore"];

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
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em]";
const inputClass =
  "w-full rounded-[10px] border border-transparent bg-[#F4F5F8] px-3.5 py-3 text-[14px] leading-snug text-[#12141F] outline-none transition-all duration-200 placeholder:text-[#12141F66] hover:bg-[#EEEFF4] focus:bg-white";
const selectClass = inputClass + " appearance-none cursor-pointer pr-10";
const fieldErrorClass = "mt-1.5 text-[12px] leading-snug text-[#C23B3B]";

function SelectChevron() {
  return (
    <i
      className="ri-arrow-down-s-line pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl"
      style={{ color: NAVY }}
      aria-hidden
    />
  );
}

export default function DetailContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [country, setCountry] = useState("");
  const [phoneError, setPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const handlePhoneInput = (e) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9+]/g, "");
    if (phoneError) setPhoneError(null);
  };

  const handleEmailInput = () => {
    if (emailError) setEmailError(null);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setPhoneError(null);
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
          text: result.message || "Query submitted successfully!",
        });
        form.reset();
        setCountry("");
        setPhoneError(null);
        setEmailError(null);
      } else {
        setStatus({
          type: "error",
          text: result.message || "Submission failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({
        type: "error",
        text: "Server error. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const focusRing = {
    boxShadow: "0 0 0 3px rgba(13, 19, 52, 0.08)",
    borderColor: NAVY,
  };

  return (
    <div className="relative w-full overflow-hidden rounded-[14px] border border-[#E7E8EE] bg-white shadow-[0_12px_40px_rgba(13,19,52,0.08)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, " +
            ORANGE +
            " 0%, " +
            NAVY +
            " 55%, " +
            ORANGE +
            " 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, " + NAVY + " 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative p-5 sm:p-6">
        <div className="mb-5">
          <p
            className="m-0 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ fontFamily: fontFamily, color: ORANGE }}
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
            className="m-0 mt-2 text-[13px] leading-[1.45] text-[#5A5D6B]"
            style={{ fontFamily: fontFamily }}
          >
            Share your brief and we will connect you with the right person.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <label className="block">
              <span
                className={labelClass}
                style={{ fontFamily: fontFamily, color: NAVY }}
              >
                First Name*
              </span>
              <input
                type="text"
                name="firstName"
                required
                placeholder="Name"
                className={inputClass}
                style={{ fontFamily: fontFamily }}
                onFocus={(e) => Object.assign(e.currentTarget.style, focusRing)}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              />
            </label>
            <label className="block">
              <span
                className={labelClass}
                style={{ fontFamily: fontFamily, color: NAVY }}
              >
                Last Name*
              </span>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Name"
                className={inputClass}
                style={{ fontFamily: fontFamily }}
                onFocus={(e) => Object.assign(e.currentTarget.style, focusRing)}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              />
            </label>
          </div>

          <div>
            <label className="block">
              <span
                className={labelClass}
                style={{ fontFamily: fontFamily, color: NAVY }}
              >
                Email Address*
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className={
                  inputClass +
                  (emailError ? " border-[#E8A0A0] bg-[#FFF7F7]" : "")
                }
                style={{ fontFamily: fontFamily }}
                onInput={handleEmailInput}
                aria-invalid={emailError ? "true" : undefined}
                onFocus={(e) => Object.assign(e.currentTarget.style, focusRing)}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.borderColor = emailError
                    ? "#E8A0A0"
                    : "transparent";
                }}
              />
            </label>
            {emailError ? (
              <p className={fieldErrorClass} style={{ fontFamily: fontFamily }}>
                {emailError}
              </p>
            ) : null}
          </div>

          <div>
            <label className="block">
              <span
                className={labelClass}
                style={{ fontFamily: fontFamily, color: NAVY }}
              >
                Phone Number*
              </span>
              <input
                type="tel"
                name="phone"
                required
                inputMode="numeric"
                maxLength={getPhoneMaxLength(country)}
                placeholder="Number"
                className={
                  inputClass +
                  (phoneError ? " border-[#E8A0A0] bg-[#FFF7F7]" : "")
                }
                style={{ fontFamily: fontFamily }}
                onInput={handlePhoneInput}
                aria-invalid={phoneError ? "true" : undefined}
                onFocus={(e) => Object.assign(e.currentTarget.style, focusRing)}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.borderColor = phoneError
                    ? "#E8A0A0"
                    : "transparent";
                }}
              />
            </label>
            {phoneError ? (
              <p className={fieldErrorClass} style={{ fontFamily: fontFamily }}>
                {phoneError}
              </p>
            ) : null}
          </div>

          <label className="block">
            <span
              className={labelClass}
              style={{ fontFamily: fontFamily, color: NAVY }}
            >
              Reason for Inquiry*
            </span>
            <div className="relative">
              <select
                name="reason"
                required
                defaultValue=""
                className={selectClass}
                style={{ fontFamily: fontFamily }}
                onFocus={(e) => Object.assign(e.currentTarget.style, focusRing)}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.borderColor = "transparent";
                }}
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
              style={{ fontFamily: fontFamily, color: NAVY }}
            >
              Country*
            </span>
            <div className="relative">
              <select
                name="country"
                required
                value={country}
                onChange={handleCountryChange}
                className={selectClass}
                style={{ fontFamily: fontFamily }}
                onFocus={(e) => Object.assign(e.currentTarget.style, focusRing)}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.borderColor = "transparent";
                }}
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
              style={{ fontFamily: fontFamily, color: NAVY }}
            >
              How did you hear about us?
            </span>
            <div className="relative">
              <select
                name="howHeard"
                defaultValue=""
                className={selectClass}
                style={{ fontFamily: fontFamily }}
                onFocus={(e) => Object.assign(e.currentTarget.style, focusRing)}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.borderColor = "transparent";
                }}
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
              style={{ fontFamily: fontFamily, color: NAVY }}
            >
              Message (Optional)
            </span>
            <textarea
              name="message"
              rows={3}
              placeholder="Message"
              className={inputClass + " min-h-[96px] resize-none"}
              style={{ fontFamily: fontFamily }}
              onFocus={(e) => Object.assign(e.currentTarget.style, focusRing)}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.borderColor = "transparent";
              }}
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="group relative mt-1 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[10px] px-4 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-transform duration-200 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            style={{ fontFamily: fontFamily, backgroundColor: NAVY }}
          >
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"
              style={{ backgroundColor: ORANGE }}
              aria-hidden
            />
            <span className="relative z-[1]">
              {submitting ? "Submitting..." : "Submit Enquiry"}
            </span>
            {!submitting ? (
              <i className="ri-arrow-right-line relative z-[1] text-lg transition-transform duration-200 group-hover:translate-x-0.5" />
            ) : null}
          </button>

          {status ? (
            <p
              role="status"
              aria-live="polite"
              className={
                "m-0 rounded-[10px] px-3 py-2.5 text-[13px] leading-snug " +
                (status.type === "success"
                  ? "bg-[#EEF9F2] text-[#1F8A4C]"
                  : "bg-[#FFF4F4] text-[#C23B3B]")
              }
              style={{ fontFamily: fontFamily }}
            >
              {status.text}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
