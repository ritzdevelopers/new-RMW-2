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
  "text-[20px] leading-[32px] md:text-[40px] md:leading-[40px] lg:text-[52px] lg:leading-[48px] xl:text-[94px] xl:leading-[71px]";

const clipRevealClass = "overflow-hidden pb-[0.2em] -mb-[0.2em]";
const circleSpotlightDuration = 15;
const inputLineDuration = 0.9;
const inputClass =
  "w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40";
const fileInputClass =
  "w-full cursor-pointer bg-transparent py-2 text-sm text-white/70 outline-none file:mr-4 file:border-0 file:bg-transparent file:text-xs file:uppercase file:tracking-[1.2px] file:text-white/60";
const inputLineClass =
  "pointer-events-none absolute bottom-0 left-0 block h-px w-full origin-left scale-x-0 bg-[#FFFFFF33]";

const Field = ({ label, children }) => (
  <div>
    <span style={labelStyle}>{label}</span>
    <div className="relative">
      {children}
      <span data-input-line className={inputLineClass} aria-hidden />
    </div>
  </div>
);

const headingWords = ["YOUR", "NEXT", "BIG", "IDEA"];

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
            window.dispatchEvent(
              new CustomEvent("section1-heading-entrance-complete"),
            );
          },
        });

        whiteWords.forEach((word, index) => {
          entrance.to(
            word,
            { yPercent: 0, duration: 2, ease: "power4.out" },
            index * 0.08,
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
        window.removeEventListener(
          "section1-start-spotlight",
          onStartSpotlight,
        );
      }
      ctx.revert();
    };
  }, []);

  return (
    <h1
      style={headingStyle}
      className={`${headingSizeClass} m-0 w-full overflow-visible`}
    >
      <div ref={wrapRef} className="relative w-full overflow-visible">
        <div className="relative z-[1] flex w-full justify-between gap-2 md:justify-center md:gap-8 lg:gap-10 xl:gap-[150px]">
          {renderHeadingWord()}
        </div>
        <div
          ref={goldRef}
          className="pointer-events-none absolute inset-0 z-[2] flex w-full justify-between gap-2 overflow-visible md:justify-center md:gap-8 lg:gap-10 xl:gap-[150px]"
          style={{ ...headingStyle, color: "#FFD188" }}
          aria-hidden
        >
          {renderHeadingWord("#FFD188")}
        </div>
      </div>
    </h1>
  );
};

const section1 = () => {
  const heroRef = useRef(null);
  const formRef = useRef(null);

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const uploadResume = async (resumeFile) => {
    try {
      const uploadData = new FormData();
      uploadData.append("resume", resumeFile);

      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: uploadData,
      });
      return await response.json();
    } catch (error) {
      console.error("Error uploading resume:", error);
      return { success: false, error: "Failed to upload resume" };
    }
  };

  const submitFormFields = async (formData) => {
    try {
      formData.append("etype", "career");
      const response = await fetch("/api/system-settings/contact-enquiry", {
        method: "POST",
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error("Error submitting form fields:", error);
      return { success: false, error: "Failed to submit form fields" };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const resumeFile = formData.get("resume");

    if (!resumeFile || (resumeFile instanceof File && resumeFile.size === 0)) {
      setStatus({ type: "error", text: "Please upload your resume." });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const resumeUploaded = await uploadResume(resumeFile);
      if (!resumeUploaded.success) {
        setStatus({
          type: "error",
          text:
            "Resume upload failed: " +
            (resumeUploaded.error || "Unknown error"),
        });
        return;
      }

      formData.append("resumePath", resumeUploaded.filePath);
      formData.delete("resume");

      const formSubmitted = await submitFormFields(formData);
      if (!formSubmitted.success) {
        setStatus({
          type: "error",
          text:
            "Form submission failed: " +
            (formSubmitted.error || "Please try again."),
        });
        return;
      }

      setStatus({
        type: "success",
        text: formSubmitted.message || "Application submitted successfully!",
      });
      form.reset();
    } catch (error) {
      console.error("Error during submission:", error);
      setStatus({
        type: "error",
        text: "An unexpected error occurred. Please try again later.",
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

    window.addEventListener(
      "section1-heading-entrance-complete",
      onHeadingDone,
    );
    window.addEventListener("section1-hero-reveal-complete", onHeroDone);

    return () => {
      window.removeEventListener(
        "section1-heading-entrance-complete",
        onHeadingDone,
      );
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
            window.dispatchEvent(
              new CustomEvent("section1-hero-reveal-complete"),
            );
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
        window.removeEventListener(
          "section1-start-input-lines",
          onStartInputLines,
        );
      }
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-[#0D1334] px-5 py-[0px] pb-[35px] sm:px-8 md:px-12 md:pt-[20px] md:pb-[70px]">
      <div className="mx-auto w-full max-w-[1500px]">
        <div ref={heroRef} className="w-full overflow-x-clip">
          <AnimatedHeadingLine />

          {/* Mobile/tablet: STARTS — HERE on one row, copy below.
              lg+: 3-column grid so copy sits in the middle without overlapping. */}
          <div className="mt-2 grid w-full grid-cols-2 items-start gap-x-3 gap-y-3 md:mt-4 md:gap-y-4 lg:mt-3 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] lg:items-center lg:gap-x-4 xl:mt-4 xl:gap-x-8">
            <span
              style={headingStyle}
              className={`${headingSizeClass} col-start-1 row-start-1 justify-self-start ${clipRevealClass}`}
            >
              <span data-hero-reveal className="inline-block">
                STARTS
              </span>
            </span>

            <span
              style={headingStyle}
              className={`${headingSizeClass} col-start-2 row-start-1 justify-self-end text-right lg:col-start-3 ${clipRevealClass}`}
            >
              <span data-hero-reveal className="inline-block">
                HERE.
              </span>
            </span>

            <p
              className={`${mixtaPro} col-span-2 row-start-2 mx-auto w-full max-w-[640px] px-1 text-center text-[15px] font-[300] italic leading-[20px] text-white normal-case sm:text-[16px] md:text-[22px] md:leading-[28px] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:max-w-none lg:px-3 lg:text-[18px] lg:leading-snug xl:px-6 xl:text-[26px] xl:leading-[32px]`}
            >
              <span data-hero-reveal className="block text-center">
                Passionate about media, storytelling or strategy? We'd love to
                hear from you.
              </span>
            </p>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mx-auto mt-7 w-full max-w-[765px] md:mt-8 lg:mt-14"
        >
          <div className="grid grid-cols-1 xl:gap-5 gap-8 md:grid-cols-2 md:gap-x-10">
            <Field label="FIRST NAME*">
              <input type="text" name="name" required className={inputClass} />
            </Field>
            <Field label=" EMAIL ADDRESS*">
              <input
                type="email"
                name="email"
                required
                className={inputClass}
              />
            </Field>
          </div>

          <div className="mt-8 grid grid-cols-1 xl:gap-5 gap-8 md:mt-10 md:grid-cols-2 md:gap-x-10">
            <Field label="PHONE NUMBER*">
              <input
                type="tel"
                name="phone"
                required
                inputMode="numeric"
                className={inputClass}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /[^0-9+]/g,
                    "",
                  );
                }}
              />
            </Field>
            <Field label="Apply For*">
              <input
                type="text"
                name="category"
                required
                className={inputClass}
              />
            </Field>
          </div>

          <div className="mt-8 md:mt-10 ">
            <Field label="UPLOAD RESUME*">
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                required
                className={fileInputClass}
              />
            </Field>
          </div>

          <div className="mt-8 md:mt-10">
            <Field label="MESSAGE (OPTIONAL)">
              <textarea
                rows={4}
                name="message"
                className={`${inputClass} resize-none`}
              />
            </Field>
          </div>

          <div className="mt-8 md:mt-20">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 shrink-0 border border-white/60" />
              <span
                style={{
                  fontFamily: sequelFontFamily,
                  fontWeight: 310,
                  fontSize: "12px",
                  lineHeight: "16px",
                  letterSpacing: "0",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                }}
              >
                SIGN UP TO RECEIVE OUR LATEST NEWS &amp; VIEWS
              </span>
            </div>
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

export default section1;
