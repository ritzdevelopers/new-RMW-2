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
      if (logoRef.current) gsap.set(logoRef.current, { opacity: 0, scale: 0.92 });

      const playEntrance = () => {
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
          tl.to(logoRef.current, { opacity: 0.35, scale: 1, duration: 2, ease: "power3.out" }, 0);
        }
      };

      const onHeaderComplete = () => playEntrance();
      window.addEventListener("header-reveal-complete", onHeaderComplete);

      if (logoRef.current) {
        gsap.to(logoRef.current, {
          y: 40,
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
      <div
        ref={logoRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <img
          src="/logo/r-rmw-transparent.png"
          alt=""
          className="h-[55vh] w-auto max-w-[90%] object-contain opacity-0"
          style={{ filter: "brightness(3.2) contrast(1.05)" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
        <div className="relative w-full">
          <h1 ref={headlineRef} style={headingStyle} className="m-0 mx-auto w-full text-center">
            <Reveal className="w-full">
              <span className="flex w-full justify-center">
                <span data-headline-row className="inline-flex flex-wrap items-center justify-center gap-x-[24px] gap-y-1 md:gap-x-[80px] lg:gap-x-[120px]">
                  <span>RITZ</span>
                  <span>MEDIA</span>
                  <span>
                    <span style={{ color: goldColor }}>I</span>S
                  </span>
                </span>
              </span>
            </Reveal>
            <Reveal className="mt-1 w-full md:mt-4">
              <span className="flex w-full justify-center">
                <span data-headline-row className="inline-flex flex-wrap items-center justify-center gap-x-[24px] gap-y-1 md:gap-x-[60px] lg:gap-x-[100px]">
                  <span>HOME</span>
                  <span>TO</span>
                  <span>THOSE</span>
                </span>
              </span>
            </Reveal>
            <Reveal className="mt-1 w-full md:mt-4">
              <span className="flex w-full justify-center">
                <span data-headline-row className="inline-flex flex-wrap items-center justify-center gap-x-[24px] gap-y-1 md:gap-x-[60px] lg:gap-x-[100px]">
                  <span>WHO</span>
                  <span>DARE</span>
                  <span>TO</span>
                </span>
              </span>
            </Reveal>
            <Reveal className="mt-1 w-full overflow-x-visible md:mt-4">
              <span className="flex w-full justify-center overflow-x-visible">
                <span data-headline-row className="inline-flex flex-wrap items-center justify-center gap-x-[24px] gap-y-1 md:gap-x-[80px] lg:gap-x-[140px]">
                  <span>DEFY</span>
                  <span>CONVENTION</span>
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
