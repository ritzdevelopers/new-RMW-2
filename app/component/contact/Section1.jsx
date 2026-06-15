"use client";

import React, { useLayoutEffect, useRef } from "react";
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
const inputClass =
  "w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40";
const inputLineClass =
  "pointer-events-none absolute bottom-0 left-0 block h-px w-full origin-left scale-x-0 bg-[#FFFFFF33]";
const selectClass = `${inputClass} appearance-none cursor-pointer`;

const Field = ({ label, children }) => (
  <div>
    <span style={labelStyle}>{label}</span>
    <div className="relative">
      {children}
      <span data-input-line className={inputLineClass} aria-hidden />
    </div>
  </div>
);

const SelectField = ({ label, placeholder, options }) => (
  <Field label={label}>
    <div className="relative">
      <select className={selectClass} defaultValue="">
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

    const ctx = gsap.context(() => {
      const whiteWords = gsap.utils.toArray("[data-hero-word]", wrap);
      const goldWords = gsap.utils.toArray("[data-hero-word]", gold);

      gsap.set([...whiteWords, ...goldWords], { yPercent: -110 });

      const startEntrance = () => {
        const entrance = gsap.timeline({
          onComplete: () => {
            spotlightTween = gsap.to(
              { x: -circleRadius },
              {
                x: () => wrap.offsetWidth + getCircleRadius(),
                duration: 15,
                repeat: -1,
                ease: "none",
                onUpdate: function () {
                  setMask(this.targets()[0].x);
                },
              }
            );
          },
        });

        whiteWords.forEach((word, index) => {
          entrance.to(
            [word, goldWords[index]],
            { yPercent: 0, duration: 2, ease: "power4.out" },
            index * 0.08
          );
        });
      };

      onHeaderComplete = () => {
        startEntrance();
      };

      window.addEventListener("header-reveal-complete", onHeaderComplete);
    }, wrap);

    return () => {
      spotlightTween?.kill();
      if (onHeaderComplete) {
        window.removeEventListener("header-reveal-complete", onHeaderComplete);
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

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray("[data-input-line]", form);
      if (!lines.length) return;

      gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(lines, {
        scaleX: 1,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: form,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, form);

    return () => ctx.revert();
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

        <div ref={formRef} className="mx-auto mt-7 w-full max-w-[765px] md:mt-7 lg:mt-16">
          <div className="grid grid-cols-1 xl:gap-5 gap-8 md:grid-cols-2 md:gap-x-10">
            <Field label="FIRST NAME*">
              <input type="text" className={inputClass} />
            </Field>
            <Field label="LAST NAME*">
              <input type="text" className={inputClass} />
            </Field>
          </div>

          <div className="mt-8 grid grid-cols-1 xl:gap-5 gap-8 md:mt-10 md:grid-cols-2 md:gap-x-10">
            <Field label="EMAIL ADDRESS*">
              <input type="text" className={inputClass} />
            </Field>
            <Field label="PHONE NUMBER">
              <input type="text" className={inputClass} />
            </Field>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-3 md:gap-x-10">
            <SelectField
              label="REASON FOR INQUIRY*"
              placeholder="Select an option"
              options={[
                "General Inquiry",
                "New Project",
                "RFP Submission",
                "Partnership",
              ]}
            />
            <SelectField
              label="REGION*"
              placeholder="Select your region"
              options={["North America", "Europe", "Asia Pacific", "Other"]}
            />
            <SelectField
              label="HOW DID YOU HEAR ABOUT US?"
              placeholder="Select an option"
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
              <textarea rows={4} className={`${inputClass} resize-none`} />
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

          <SubmitButton />
        </div>
      </div>
    </section>
  );
};

export default Section1;
