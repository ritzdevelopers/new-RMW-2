"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const mixtaPro = "font-['MixtaPro']";
const sequelFontFamily = '"Sequel Sans"';
const goldColor = "#FFD188";

const headingStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 365,
  fontSize: "94px",
  lineHeight: "71px",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const disruptionStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 365,
  fontSize: "94px",
  lineHeight: "71px",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#1D1D1B",
};

const subHeadingStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 300,
  fontSize: "48px",
  // lineHeight: "34px",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#1D1D1B",
};

const Reveal = ({ children, className = "", clipYOnly = false }) => (
  <span
    className={`block ${clipYOnly ? "overflow-x-visible overflow-y-hidden" : "overflow-hidden"} ${className}`}
  >
    <span data-about-reveal className="block w-full">
      {children}
    </span>
  </span>
);

const Letter = ({ children }) => (
  <span className="inline-block shrink-0">{children}</span>
);

const Section1 = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const disruptionRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
    const disruption = disruptionRef.current;
    if (!hero) return;

    const fitHeadline = () => {
      const parent = headline?.parentElement;
      if (!headline || !parent) return;

      headline.style.transform = "none";
      const rows = headline.querySelectorAll("[data-headline-row]");
      let needed = 0;
      rows.forEach((row) => {
        needed = Math.max(needed, row.scrollWidth, row.getBoundingClientRect().width);
      });
      const buffer = 48;
      const available = parent.clientWidth - buffer;
      const scale = needed > 0 ? Math.min(1, available / needed) : 1;
      headline.style.transform = scale < 1 ? `scale(${scale})` : "none";
      headline.style.transformOrigin = "top center";
    };

    const fitDisruption = () => {
      const parent = disruption?.parentElement;
      if (!disruption || !parent) return;

      disruption.style.transform = "none";
      const rows = disruption.querySelectorAll("[data-headline-row]");
      let needed = 0;
      rows.forEach((row) => {
        needed = Math.max(needed, row.scrollWidth, row.getBoundingClientRect().width);
      });
      const buffer = 48;
      const available = parent.clientWidth - buffer;
      const scale = needed > 0 ? Math.min(1, available / needed) : 1;
      disruption.style.transform = scale < 1 ? `scale(${scale})` : "none";
      disruption.style.transformOrigin = "top center";
    };

    const fitAll = () => {
      fitHeadline();
      fitDisruption();
    };

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-about-reveal]", hero);
      if (!items.length) return;

      gsap.set(items, { yPercent: -110 });
      gsap.to(items, {
        yPercent: 0,
        duration: 1.05,
        ease: "power4.out",
        stagger: 0.1,
        delay: 0.15,
        onComplete: fitAll,
      });
    }, hero);

    fitAll();
    window.addEventListener("resize", fitAll);

    const resizeObserver =
      typeof ResizeObserver !== "undefined" &&
      new ResizeObserver(() => {
        fitAll();
      });

    if (headline?.parentElement && resizeObserver) {
      resizeObserver.observe(headline.parentElement);
    }
    if (disruption?.parentElement && resizeObserver) {
      resizeObserver.observe(disruption.parentElement);
    }

    return () => {
      window.removeEventListener("resize", fitAll);
      resizeObserver?.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <style>{`
        @font-face {
          font-family: "Sequel Sans";
          src: url("/fonts/Sequel-Sans-Font-Family/Sequel-Sans-Font-Family-DEMO/Sequel Sans OTF/Sequel Sans Medium Head.otf")
            format("opentype");
          font-weight: 365;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

      <div ref={heroRef}>
      <section className="overflow-x-hidden bg-[#0D1334] px-8 py-35px md:px-12 md:pt-[70px]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
          <div className="relative  w-screen ">
            <h1
              ref={headlineRef}
              style={headingStyle}
              className="m-0 mx-auto w-full text-center"
            >
              <Reveal clipYOnly className="w-full">
                <span className="flex w-full justify-center">
                  <span data-headline-row className="inline-flex items-center justify-center gap-[140px]">
                    <span>17</span>
                    <span>YEARS</span>
                    <span>
                      <span style={{ color: goldColor }}>O</span>F
                    </span>
                  </span>
                </span>
              </Reveal>
              <Reveal clipYOnly className="mt-1 w-full md:mt-8">
                <span className="flex w-full justify-center">
                  <span data-headline-row className="inline-flex items-center justify-center gap-[160px]">
                    <span>MAKING</span>
                    <span>BRANDS</span>
                  </span>
                </span>
              </Reveal>
              <Reveal clipYOnly className="mt-1 w-full overflow-x-visible md:mt-8">
                <span className="flex w-full justify-center overflow-x-visible">
                  <span data-headline-row className="inline-flex items-center justify-center gap-[120px]">
                    <span>
                      <span style={{ color: goldColor }}>IM</span>POSSIBLE
                    </span>
                    <span>TO</span>
                    <span className="pr-[6px]">IGNORE</span>
                  </span>
                </span>
              </Reveal>
            </h1>
          </div>

          <div className={`${mixtaPro} mt-8 max-w-[720px] md:mt-10 lg:mt-5`}>
            <Reveal>
              <p className="m-0 text-[14px] font-[300] italic leading-[20px] text-white md:text-[20px] md:leading-[28px] lg:text-[28px] lg:leading-[36px]">
                Fuelled by a magnetic culture of hustle and heart, backed
              </p>
            </Reveal>
            <Reveal className="mt-1">
              <p className="m-0 text-[14px] font-[300] italic leading-[20px] text-white md:text-[20px] md:leading-[28px] lg:text-[28px] lg:leading-[36px]">
                by the belief that great ideas change the world
              </p>
            </Reveal>
          </div>

          <div className="mt-14 overflow-hidden md:mt-20 lg:mt-0">
            <span data-about-reveal className="inline-block">
              <img
                src="/about/about-r-logo.png"
                alt=""
                className="h-[140px] w-auto object-contain md:h-[220px] lg:h-[300px]"
              />
            </span>
          </div>
        </div>
      </section>

      <section className="relative overflow-x-hidden bg-[#E8E8E8] px-8 py-10 md:px-12 md:py-14 lg:py-16">
        <div className="relative mx-auto w-full max-w-[1400px]">
          {/* <Reveal className="absolute left-0 top-0 z-10">
            <img
              src="/about/ritz-logo.png"
              alt="Ritz Media World"
              className="h-[72px] w-auto object-contain md:h-[96px] lg:h-[110px]"
            />
          </Reveal> */}

          <div className="flex flex-col items-center  text-center ">
            <div className={`${mixtaPro} max-w-[720px]`}>
              <Reveal>
                <p className="m-0 text-[16px] font-[300] italic leading-[22px] text-[#1D1D1B] md:text-[22px] md:leading-[30px] lg:text-[36px] lg:leading-[36px]">
                  The world&apos;s largest independent brand agency,
                </p>
              </Reveal>
              <Reveal className="mt-1">
                <p className="m-0 text-[16px] font-[300] italic leading-[22px] text-[#1D1D1B] md:text-[22px] md:leading-[30px] lg:text-[36px] lg:leading-[36px]">
                  17 years in the making.
                </p>
              </Reveal>
            </div>

            <Reveal className="mt-10 md:mt-12 lg:mt-14 xl:mt-5">
              <p style={subHeadingStyle} className="m-0 text-[18px] md:text-[24px] xl:text-[48px]">
                WE CREATE DESIRE THROUGH
              </p>
            </Reveal>
            

            <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 md:mt-10 lg:mt-12 xl:mt-5">
              <div
                ref={disruptionRef}
                style={disruptionStyle}
                className="mx-auto w-full text-center"
              >
                <Reveal clipYOnly className="w-full overflow-x-visible">
                  <span className="flex w-full justify-center overflow-x-visible">
                    <span
                      data-headline-row
                      className="inline-flex items-center justify-center gap-[20px] md:gap-[32px] lg:gap-[48px]"
                    >
                      <Letter>D</Letter>
                      <Letter>I</Letter>
                      <Letter>S</Letter>
                      <span className="mx-[8px] inline-flex shrink-0 items-center md:mx-[12px] lg:mx-[16px]">
                        <span className="block h-[120px] w-[200px] overflow-hidden rounded-[20px] bg-black md:h-[160px] md:w-[260px] lg:h-[200px] lg:w-[320px]">
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover"
                            src="/about/aboutsectionvideo.mp4"
                          />
                        </span>
                      </span>
                      <Letter>R</Letter>
                      <Letter>U</Letter>
                      <Letter>P</Letter>
                    </span>
                  </span>
                </Reveal>

                <Reveal clipYOnly className="mt-1 w-full overflow-x-visible md:mt-2">
                  <span className="flex w-full justify-center overflow-x-visible">
                    <span
                      data-headline-row
                      className="inline-flex items-center justify-center gap-[20px] md:gap-[32px] lg:gap-[48px]"
                    >
                      <Letter>T</Letter>
                      <Letter>I</Letter>
                      <Letter>O</Letter>
                      <Letter>N</Letter>
                    </span>
                  </span>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Section1;
