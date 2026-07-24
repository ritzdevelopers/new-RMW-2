"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SubmitButton from "../button/submitnew";

gsap.registerPlugin(ScrollTrigger);

const mixtaPro = "font-['MixtaPro']";

const sequelFontFamily = '"Sequel Sans"';

const labelStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "16px",
  letterSpacing: "1.2px",
  textTransform: "uppercase",
  color: "#FFFFFF99",
  verticalAlign: "middle",
  display: "block",
  marginBottom: "8px",
};

const headingStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 500,
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const headingSizeClass =
  "text-[20px] leading-[32px] md:text-[48px] md:leading-[44px] lg:text-[75px] lg:leading-[56px] xl:text-[94px] xl:leading-[71px]";

const clipRevealClass = "overflow-hidden pb-[0.2em] -mb-[0.2em]";
const circleSpotlightDuration = 15;
const inputLineDuration = 0.9;
const inputClass =
  "w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40";
const inputLineClass =
  "pointer-events-none absolute bottom-0 left-0 block h-px w-full origin-left scale-x-0 bg-[#FFFFFF33]";
const selectClass = `${inputClass} appearance-none cursor-pointer`;

const COUNTRY_OPTIONS = ["India", "UAE", "UK", "Singapore", "USA"];

/** Local mobile rules per country (digits only, no country code). */
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

function hasInvalidRepeatedPattern(digits) {
  if (!digits) return false;
  // All same digit: 0000000000, 9999999999, 8888888888
  if (/^(\d)\1+$/.test(digits)) return true;
  // Alternating pair: 9898989898, 1212121212
  if (digits.length >= 4 && /^(\d)(\d)(?:\1\2)+$/.test(digits)) return true;
  // Two-digit block repeat: 989898989898-style when length allows
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

  // Strip leading country code when pasted with it
  const codes = [...(rule.countryCodes || [])].sort((a, b) => b.length - a.length);
  for (const code of codes) {
    if (digits.startsWith(code) && digits.length > maxLen) {
      digits = digits.slice(code.length);
      break;
    }
  }

  // Strip leading trunk 0 (e.g. 09876543210 → 9876543210)
  if (digits.startsWith("0") && digits.length > maxLen) {
    digits = digits.slice(1);
  }

  return digits;
}

function validatePhoneForCountry(phone, country) {
  if (!country) {
    return "Please select a country.";
  }

  const rule = COUNTRY_PHONE_RULES[country];
  if (!rule) {
    return "Please select a valid country.";
  }

  const local = normalizeLocalPhone(phone, country);
  if (!local) {
    return "Please enter your phone number.";
  }

  const lengths = Array.isArray(rule.length) ? rule.length : [rule.length];
  if (!lengths.includes(local.length) || !rule.regex.test(local)) {
    return rule.message;
  }

  if (hasInvalidRepeatedPattern(local)) {
    return REPEATED_PATTERN_MESSAGE;
  }

  return null;
}

const EMAIL_INVALID_MESSAGE =
  "Please enter a valid email address (e.g. name@example.com).";

/** local-part@domain.tld with the rules described in the product form. */
function validateEmail(email) {
  const value = String(email || "").trim();
  if (!value) {
    return "Please enter your email address.";
  }

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

  // A-Z a-z 0-9 and ! # $ % & ' * + - / = ? ^ _ ` { | } ~ plus single dots
  if (!/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(local)) {
    return EMAIL_INVALID_MESSAGE;
  }

  if (!domain || !domain.includes(".")) {
    return EMAIL_INVALID_MESSAGE;
  }

  const labels = domain.split(".");
  if (labels.length < 2) {
    return EMAIL_INVALID_MESSAGE;
  }

  const tld = labels[labels.length - 1];
  if (!/^[A-Za-z]{2,}$/.test(tld)) {
    return EMAIL_INVALID_MESSAGE;
  }

  for (const label of labels) {
    if (!label || label.startsWith("-") || label.endsWith("-")) {
      return EMAIL_INVALID_MESSAGE;
    }
    if (!/^[A-Za-z0-9-]+$/.test(label)) {
      return EMAIL_INVALID_MESSAGE;
    }
  }

  return null;
}

function getPhoneMaxLength(country) {
  const rule = COUNTRY_PHONE_RULES[country];
  if (!rule) return 15;
  const lengths = Array.isArray(rule.length) ? rule.length : [rule.length];
  // Allow room for + / country code while typing
  return Math.max(...lengths) + 4;
}

const Field = ({ label, children }) => (
  <div>
    <span style={labelStyle}>{label}</span>
    <div className="relative">
      {children}
      <span data-input-line className={inputLineClass} aria-hidden />
    </div>
  </div>
);

const SelectField = ({
  label,
  placeholder,
  options,
  name,
  required,
  value,
  onChange,
}) => (
  <Field label={label}>
    <div className="relative">
      <select
        className={selectClass}
        name={name}
        required={required}
        {...(value !== undefined
          ? { value, onChange }
          : { defaultValue: "" })}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#0D1334] text-white">
            {option}
          </option>
        ))}
      </select>
      <i className="ri-arrow-down-s-line pointer-events-none absolute right-0 bottom-2 text-lg text-white/60" />
    </div>
  </Field>
);

const headingWords = ["WE", "WOULD", "BE", "HAPPY", "TO"];

const renderHeadingWord = (color) =>
  headingWords.map((item) => (
    <span key={item} className={`inline-block align-top ${clipRevealClass}`}>
      <span
        data-hero-word
        className="inline-block"
        style={color ? { color } : undefined}
      >
        {item}
      </span>
    </span>
  ));

const AnimatedHeadingLine = () => {
  const wrapRef = useRef(null);
  const goldRef = useRef(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const gold = goldRef.current;
    if (!wrap || !gold) return;

    const getCircleRadius = () => {
      const width = window.innerWidth;
      if (width >= 768) return 65;
      return 22;
    };

    let circleRadius = getCircleRadius();

    const setMask = (x) => {
      circleRadius = getCircleRadius();
      const mask = `radial-gradient(circle ${circleRadius}px at ${x}px 50%, #000 98%, transparent 100%)`;
      gold.style.maskImage = mask;
      gold.style.webkitMaskImage = mask;
    };

    setMask(-circleRadius);

    let spotlightTween = null;

    let onHeaderComplete = null;
    let onStartSpotlight = null;

    const ctx = gsap.context(() => {
      const whiteWords = gsap.utils.toArray("[data-hero-word]", wrap);
      const goldWords = gsap.utils.toArray("[data-hero-word]", gold);

      gsap.set(whiteWords, { yPercent: -110 });
      gsap.set(goldWords, { yPercent: 0 });

      const startSpotlight = () => {
        spotlightTween?.kill();
        spotlightTween = null;

        const proxy = { x: circleRadius };
        setMask(circleRadius);

        spotlightTween = gsap.to(proxy, {
          x: () => wrap.offsetWidth + getCircleRadius(),
          duration: circleSpotlightDuration,
          repeat: -1,
          ease: "none",
          onUpdate: function () {
            setMask(proxy.x);
          },
        });
      };

      const startEntrance = () => {
        const entrance = gsap.timeline({
          onComplete: () => {
            window.dispatchEvent(new CustomEvent("section1-heading-entrance-complete"));
          },
        });

        whiteWords.forEach((word, index) => {
          entrance.to(
            word,
            { yPercent: 0, duration: 2, ease: "power4.out" },
            index * 0.08
          );
        });
      };

      onHeaderComplete = () => {
        startEntrance();
      };

      onStartSpotlight = () => {
        startSpotlight();
      };

      window.addEventListener("header-reveal-complete", onHeaderComplete);
      window.addEventListener("section1-start-spotlight", onStartSpotlight);
    }, wrap);

    return () => {
      spotlightTween?.kill();
      if (onHeaderComplete) {
        window.removeEventListener("header-reveal-complete", onHeaderComplete);
      }
      if (onStartSpotlight) {
        window.removeEventListener("section1-start-spotlight", onStartSpotlight);
      }
      ctx.revert();
    };
  }, []);

  return (
    <h1 style={headingStyle} className={`${headingSizeClass} m-0 w-full`}>
      <div ref={wrapRef} className="relative w-full">
        <div className="relative z-[1] flex w-full justify-between">
          {renderHeadingWord()}
        </div>
        <div
          ref={goldRef}
          className="pointer-events-none absolute inset-0 z-[2] flex w-full justify-between"
          style={{ ...headingStyle, color: "#FFD188" }}
          aria-hidden
        >
          {renderHeadingWord("#FFD188")}
        </div>
      </div>
    </h1>
  );
};

const Section1 = () => {
  const heroRef = useRef(null);
  const formRef = useRef(null);

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [country, setCountry] = useState("");
  const [phoneError, setPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const handlePhoneInput = (e) => {
    const cleaned = e.currentTarget.value.replace(/[^0-9+]/g, "");
    e.currentTarget.value = cleaned;
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
    const selectedCountry = (formData.get("country") || country || "").toString().trim();
    const howHeard = (formData.get("howHeard") || "").toString().trim();
    const messageText = (formData.get("message") || "").toString().trim();

    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      setStatus({ type: "error", text: emailValidationError });
      return;
    }

    const phoneValidationError = validatePhoneForCountry(phone, selectedCountry);
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

  useLayoutEffect(() => {
    let headingDone = false;
    let heroDone = false;

    const onAllTextDone = () => {
      if (headingDone && heroDone) {
        window.dispatchEvent(new CustomEvent("section1-start-spotlight"));
        window.dispatchEvent(new CustomEvent("section1-start-input-lines"));
      }
    };

    const onHeadingDone = () => {
      headingDone = true;
      onAllTextDone();
    };

    const onHeroDone = () => {
      heroDone = true;
      onAllTextDone();
    };

    window.addEventListener("section1-heading-entrance-complete", onHeadingDone);
    window.addEventListener("section1-hero-reveal-complete", onHeroDone);

    return () => {
      window.removeEventListener("section1-heading-entrance-complete", onHeadingDone);
      window.removeEventListener("section1-hero-reveal-complete", onHeroDone);
    };
  }, []);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let onHeaderComplete = null;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-hero-reveal]", hero);
      if (!items.length) return;

      gsap.set(items, { yPercent: -110 });

      const startReveal = () => {
        gsap.to(items, {
          yPercent: 0,
          duration: 2,
          ease: "power4.out",
          stagger: 0.08,
          onComplete: () => {
            window.dispatchEvent(new CustomEvent("section1-hero-reveal-complete"));
          },
        });
      };

      onHeaderComplete = () => {
        startReveal();
      };

      window.addEventListener("header-reveal-complete", onHeaderComplete);
    }, hero);

    return () => {
      if (onHeaderComplete) {
        window.removeEventListener("header-reveal-complete", onHeaderComplete);
      }
      ctx.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const form = formRef.current;
    if (!form) return;

    let onStartInputLines = null;
    let inputLinesStarted = false;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray("[data-input-line]", form);
      if (!lines.length) return;

      gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });

      const startInputLines = () => {
        if (inputLinesStarted) return;
        inputLinesStarted = true;

        gsap.to(lines, {
          scaleX: 1,
          duration: inputLineDuration,
          ease: "power2.out",
          stagger: 0.1,
        });
      };

      onStartInputLines = () => {
        startInputLines();
      };

      window.addEventListener("section1-start-input-lines", onStartInputLines);
    }, form);

    return () => {
      if (onStartInputLines) {
        window.removeEventListener("section1-start-input-lines", onStartInputLines);
      }
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-[#0D1334] px-8 py-[0px] pb-[35px] md:px-12 md:pt-[20px] md:pb-[70px] ">
      <div className="mx-auto max-w-8xl mx-auto max-w-[1500px]">
        <div ref={heroRef}>
          <AnimatedHeadingLine />

          <div className="-mt-3 flex flex-col md:gap-6 gap-1 lg:-mt-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="mb-0 flex w-full justify-between md:mt-5 lg:mb-0 lg:contents">
              <span
                style={headingStyle}
                className={`${headingSizeClass} shrink-0 self-start ${clipRevealClass} lg:order-1 lg:mt-[30px] xl:mt-[40px]`}
              >
                <span data-hero-reveal className="inline-block">
                  ASSIST
                </span>
              </span>
              <span
                style={headingStyle}
                className={`${headingSizeClass} shrink-0 self-start ${clipRevealClass} text-right lg:order-3 lg:mt-[30px] lg:text-right xl:mt-[40px]`}
              >
                <span data-hero-reveal className="inline-block">
                  YOU
                </span>
              </span>
            </div>

            <p
              className={`${mixtaPro} order-2 mt-[0px] max-w-[700px] self-start overflow-hidden text-[16px] md:text-[28px] leading-[20px] md:leading-[32px] font-[300] italic md:leading-snug text-white normal-case md:mt-0 lg:mt-[60px] lg:text-[20px] lg:self-center lg:text-center xl:mt-[90px] xl:-translate-x-[40px] xl:text-[28px] `}
            >
              <span data-hero-reveal className="block">
                Got a project brewing, an RFP to share or something you want to
                ask? Drop your details and we&apos;ll get you to the right person
              </span>
            </p>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mx-auto mt-7 w-full max-w-[765px] md:mt-7 lg:mt-16"
        >
          <div className="grid grid-cols-1 xl:gap-5 gap-8 md:grid-cols-2 md:gap-x-10">
            <Field label="FIRST NAME*">
              <input type="text" name="firstName" required className={inputClass} />
            </Field>
            <Field label="LAST NAME*">
              <input type="text" name="lastName" required className={inputClass} />
            </Field>
          </div>

          <div className="mt-8 grid grid-cols-1 xl:gap-5 gap-8 md:mt-10 md:grid-cols-2 md:gap-x-10">
            <div>
              <Field label="EMAIL ADDRESS*">
                <input
                  type="email"
                  name="email"
                  required
                  className={inputClass}
                  onInput={handleEmailInput}
                  aria-invalid={emailError ? "true" : undefined}
                />
              </Field>
              {emailError ? (
                <p
                  className="mt-2 text-xs"
                  style={{
                    fontFamily: sequelFontFamily,
                    color: "#FF8A8A",
                  }}
                >
                  {emailError}
                </p>
              ) : null}
            </div>
            <div>
              <Field label="PHONE NUMBER*">
                <input
                  type="tel"
                  name="phone"
                  required
                  inputMode="numeric"
                  maxLength={getPhoneMaxLength(country)}
                  className={inputClass}
                  onInput={handlePhoneInput}
                  aria-invalid={phoneError ? "true" : undefined}
                />
              </Field>
              {phoneError ? (
                <p
                  className="mt-2 text-xs"
                  style={{
                    fontFamily: sequelFontFamily,
                    color: "#FF8A8A",
                  }}
                >
                  {phoneError}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-3 md:gap-x-10">
            <SelectField
              label="REASON FOR INQUIRY*"
              placeholder="Select an option"
              name="reason"
              required
              options={[
                "General Inquiry",
                "New Project",
                "RFP Submission",
                "Partnership",
              ]}
            />
            <SelectField
              label="COUNTRY*"
              placeholder="Select your country"
              name="country"
              required
              value={country}
              onChange={handleCountryChange}
              options={COUNTRY_OPTIONS}
            />
            <SelectField
              label="HOW DID YOU HEAR ABOUT US?"
              placeholder="Select an option"
              name="howHeard"
              options={[
                "Search Engine",
                "Social Media",
                "Referral",
                "Advertisement",
                "Other",
              ]}
            />
          </div>

          <div className="mt-8 md:mt-10">
            <Field label="MESSAGE (OPTIONAL)">
              <textarea rows={4} name="message" className={`${inputClass} resize-none`} />
            </Field>
          </div>

         

          <SubmitButton
            disabled={submitting}
            label={submitting ? "SUBMITTING..." : "SUBMIT"}
          />

          {status && (
            <p
              role="status"
              aria-live="polite"
              className="mt-4 text-sm"
              style={{
                fontFamily: sequelFontFamily,
                color: status.type === "success" ? "#7CFFB2" : "#FF8A8A",
              }}
            >
              {status.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Section1;
