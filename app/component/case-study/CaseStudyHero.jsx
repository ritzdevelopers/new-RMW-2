"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Montserrat } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

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

const Reveal = ({ children, className = "", group = "headline" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <span data-cs-reveal={group} className="block w-full">
      {children}
    </span>
  </span>
);

const CaseStudyHero = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const logoRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
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
      const available = parent.clientWidth - 48;
      const scale = needed > 0 ? Math.min(1, available / needed) : 1;
      headline.style.transform = scale < 1 ? `scale(${scale})` : "none";
      headline.style.transformOrigin = "top center";
    };

    const ctx = gsap.context(() => {
      const headlineItems = gsap.utils.toArray("[data-cs-reveal='headline']", hero);
      const subItems = gsap.utils.toArray("[data-cs-reveal='sub']", hero);

      gsap.set(headlineItems, { yPercent: -110 });
      gsap.set(subItems, { yPercent: -110, opacity: 0 });
      if (logoRef.current) {
        gsap.set(logoRef.current, {
          opacity: 0,
          scale: 0.94,
          y: 24,
          rotation: -12.441,
          transformOrigin: "50% 50%",
        });
      }

      let entrancePlayed = false;

      const playEntrance = () => {
        if (entrancePlayed) return;
        entrancePlayed = true;

        const tl = gsap.timeline({ onComplete: fitHeadline });

        headlineItems.forEach((item, index) => {
          tl.to(
            item,
            { yPercent: 0, duration: 1.8, ease: "power4.out" },
            index === 0 ? 0 : "-=1.55",
          );
        });

        subItems.forEach((item, index) => {
          tl.to(
            item,
            { yPercent: 0, opacity: 1, duration: 1.3, ease: "power4.out" },
            index === 0 ? "-=1" : "-=1.1",
          );
        });

        if (logoRef.current) {
          tl.to(
            logoRef.current,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              rotation: -12.441,
              duration: 2,
              ease: "power3.out",
            },
            0,
          );
        }
      };

      const onHeaderComplete = () => playEntrance();
      window.addEventListener("header-reveal-complete", onHeaderComplete);

      // Fallback if header animation already finished before this effect ran
      requestAnimationFrame(() => {
        if (logoRef.current && gsap.getProperty(logoRef.current, "opacity") === 0) {
          const headerItems = document.querySelectorAll("[data-header-reveal]");
          const headerDone = headerItems.length
            ? Array.from(headerItems).every((el) => gsap.getProperty(el, "yPercent") === 0)
            : true;
          if (headerDone) playEntrance();
        }
      });

      if (logoRef.current) {
        gsap.to(logoRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      fitHeadline();
      window.addEventListener("resize", fitHeadline);

      return () => {
        window.removeEventListener("header-reveal-complete", onHeaderComplete);
        window.removeEventListener("resize", fitHeadline);
      };
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#0D1334] px-8 pb-[60px] pt-[35px] md:px-12 md:pb-[80px] md:pt-[70px]"
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
        <div className="relative w-full">
          <h1 ref={headlineRef} style={headingStyle} className="m-0 mx-auto w-full text-center">
            <Reveal className="w-full">
              <span className="flex w-full justify-center">
                <span data-headline-row className="inline-flex flex-wrap items-center justify-center gap-x-[24px] gap-y-1 md:gap-x-[60px] lg:gap-x-[100px]">
                  <span>A Home for</span>
                </span>
              </span>
            </Reveal>
            <Reveal className="mt-1 w-full md:mt-4">
              <span className="flex w-full justify-center">
                <span data-headline-row className="inline-flex flex-wrap items-center justify-center gap-x-[24px] gap-y-1 md:gap-x-[60px] lg:gap-x-[100px]">
                  <span>
                    <span style={{ color: goldColor }}>Curious</span> Minds
                  </span>
                </span>
              </span>
            </Reveal>
          </h1>
        </div>

        <div className={`${montserrat.className} relative mt-8 max-w-[900px] md:mt-10`}>
          <Reveal group="sub">
            <p className="m-0 text-[14px] font-[300] italic leading-[22px] text-white md:text-[20px] md:leading-[30px] lg:text-[28px] lg:leading-[38px]">
              Fuelled by a magnetic culture of hustle and heart, backed by the belief that
            </p>
          </Reveal>
          <Reveal group="sub" className="mt-1">
            <p className="m-0 text-[14px] font-[300] italic leading-[22px] text-white md:text-[20px] md:leading-[30px] lg:text-[28px] lg:leading-[38px]">
              great ideas change the world.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
