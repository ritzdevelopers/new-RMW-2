"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300"],
  style: ["italic"],
  display: "swap",
});

const goldColor = "#FFD188";

const headingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  fontSize: "94px",
  lineHeight: "85px",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const Reveal = ({ children, className = "", group = "headline", clipYOnly = false }) => (
  <span
    className={`block ${clipYOnly ? "overflow-x-visible overflow-y-hidden" : "overflow-hidden"} ${className}`}
  >
    <span data-cs-reveal={group} className="block w-full will-change-transform">
      {children}
    </span>
  </span>
);

const headlineRowClass =
  "inline-flex max-w-full flex-wrap items-center justify-center gap-x-[clamp(20px,6vw,140px)] gap-y-2";
const headlineRowClassWide =
  "inline-flex max-w-full flex-wrap items-center justify-center gap-x-[clamp(18px,5.5vw,180px)] gap-y-2";

const subtextRowClass =
  "inline-flex max-w-full flex-wrap items-center justify-center gap-x-[clamp(12px,2.5vw,48px)] gap-y-2";

const subtextLines = [
  ["Fuelled by a magnetic culture of hustle and heart,", "backed by the belief that"],
  ["great ideas change the world."],
];

const CaseStudyHero = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const headlineWrapRef = useRef(null);
  const logoRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
    const headlineWrap = headlineWrapRef.current;
    if (!hero) return;

    const fitHeadline = () => {
      if (!headline || !headlineWrap) return;

      headline.style.transform = "none";
      const rows = headline.querySelectorAll("[data-headline-row]");
      let needed = 0;
      rows.forEach((row) => {
        needed = Math.max(needed, row.scrollWidth, row.getBoundingClientRect().width);
      });

      const sectionStyles = window.getComputedStyle(hero);
      const horizontalPadding =
        parseFloat(sectionStyles.paddingLeft) + parseFloat(sectionStyles.paddingRight);
      const available = Math.min(window.innerWidth, headlineWrap.clientWidth) - horizontalPadding - 16;
      const scale = needed > 0 && available > 0 ? Math.min(1, available / needed) : 1;
      headline.style.transform = scale < 1 ? `scale(${scale})` : "none";
      headline.style.transformOrigin = "top center";
    };

    const ctx = gsap.context(() => {
      const headlineItems = gsap.utils.toArray("[data-cs-reveal='headline']", hero);
      const subItems = gsap.utils.toArray("[data-cs-reveal='sub']", hero);
      const fallItems = [...headlineItems, ...subItems];

      const getFallDistance = () => -(window.innerHeight * 0.72);
      const fallFrom = getFallDistance();

      gsap.set(fallItems, {
        y: fallFrom,
        opacity: 0,
        force3D: true,
      });

      if (logoRef.current) {
        gsap.set(logoRef.current, {
          opacity: 0,
          scale: 0.9,
          y: fallFrom,
          rotation: -12.441,
          transformOrigin: "50% 50%",
          force3D: true,
        });
      }

      let entrancePlayed = false;

      const playEntrance = () => {
        if (entrancePlayed) return;
        entrancePlayed = true;

        const tl = gsap.timeline({ onComplete: fitHeadline });

        if (logoRef.current) {
          tl.to(
            logoRef.current,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: -12.441,
              duration: 1.65,
              ease: "power4.out",
              force3D: true,
            },
            0,
          );
        }

        headlineItems.forEach((item, index) => {
          tl.to(
            item,
            {
              y: 0,
              opacity: 1,
              duration: 1.35,
              ease: "power4.out",
              force3D: true,
            },
            index === 0 ? 0.08 : "-=1.05",
          );
        });

        subItems.forEach((item, index) => {
          tl.to(
            item,
            {
              y: 0,
              opacity: 1,
              duration: 1.15,
              ease: "power4.out",
              force3D: true,
            },
            index === 0 ? "-=0.85" : "-=0.95",
          );
        });
      };

      const onHeaderComplete = () => playEntrance();
      window.addEventListener("header-reveal-complete", onHeaderComplete);

      requestAnimationFrame(() => {
        const headerItems = document.querySelectorAll("[data-header-reveal]");
        const headerDone = headerItems.length
          ? Array.from(headerItems).every((el) => gsap.getProperty(el, "yPercent") === 0)
          : true;
        if (headerDone) playEntrance();
      });

      fitHeadline();
      window.addEventListener("resize", fitHeadline);
      window.addEventListener("load", fitHeadline);
      document.fonts?.ready?.then(() => requestAnimationFrame(fitHeadline));

      const resizeObserver =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(() => fitHeadline())
          : null;
      if (headlineWrap) resizeObserver?.observe(headlineWrap);

      return () => {
        window.removeEventListener("header-reveal-complete", onHeaderComplete);
        window.removeEventListener("resize", fitHeadline);
        window.removeEventListener("load", fitHeadline);
        resizeObserver?.disconnect();
      };
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col overflow-hidden overflow-x-hidden bg-[#0D1334] px-8 pb-[60px] pt-[35px] md:px-12 md:pb-[80px] md:pt-[70px]"
    >
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-[1] -translate-x-1/2 md:bottom-10 lg:bottom-12">
        <div
          ref={logoRef}
          aria-hidden
          style={{
            width: 282.186,
            height: 339,
            background: "rgba(255, 255, 255, 0.20)",
            WebkitMaskImage: "url(/logo/r-logo-new.png)",
            maskImage: "url(/logo/r-logo-new.png)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            transform: "rotate(-12.441deg)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center text-center">
        <div ref={headlineWrapRef} className="relative w-full overflow-x-visible px-1">
          <h1 ref={headlineRef} style={headingStyle} className="m-0 mx-auto w-full max-w-full text-center">
            <Reveal clipYOnly className="w-full">
              <span className="flex w-full justify-center overflow-x-visible">
                <span data-headline-row className={headlineRowClass}>
                  <span>A</span>
                  <span>HOME</span>
                  <span>FOR</span>
                </span>
              </span>
            </Reveal>
            <Reveal clipYOnly className="mt-1 w-full md:mt-8">
              <span className="flex w-full justify-center overflow-x-visible">
                <span data-headline-row className={headlineRowClassWide}>
                  <span>
                    <span style={{ color: goldColor }}>CURIOUS</span>
                  </span>
                  <span>MINDS</span>
                </span>
              </span>
            </Reveal>
          </h1>
        </div>

        <div className={`${montserrat.className} relative z-40 mt-8 max-w-[1000px] md:mt-0 lg:mt-0 xl:mt-5`}>
          {subtextLines.map((phrases, index) => (
            <Reveal key={phrases.join("-")} group="sub" clipYOnly className={index > 0 ? "mt-1" : ""}>
              <p className="m-0 text-[14px] font-[300] italic leading-[20px] text-white md:text-[20px] md:leading-[28px] lg:text-[28px] lg:leading-[36px]">
                <span className="flex w-full justify-center overflow-x-visible">
                  <span className={subtextRowClass}>
                    {phrases.map((phrase) => (
                      <span key={phrase}>{phrase}</span>
                    ))}
                  </span>
                </span>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
