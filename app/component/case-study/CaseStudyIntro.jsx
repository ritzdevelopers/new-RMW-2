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

const Reveal = ({ children, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <span data-cs-intro-reveal className="block w-full">
      {children}
    </span>
  </span>
);

const CaseStudyIntro = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-cs-intro-reveal]", section);
      gsap.set(items, { yPercent: 110 });

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }).to(items, {
        yPercent: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
      });

      if (section.getBoundingClientRect().top < window.innerHeight * 0.85) {
        gsap.set(items, { yPercent: 0 });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-8 py-[50px] md:px-12 md:py-[80px] lg:py-[100px]"
    >
      <div className="mx-auto max-w-[900px] text-center">
        <div className={montserrat.className}>
          <Reveal>
            <p className="m-0 text-[18px] font-[300] italic leading-[28px] text-[#1D1D1B] md:text-[24px] md:leading-[36px] lg:text-[36px] lg:leading-[44px]">
              Thought-provoking ideas, industry insights, and fresh perspectives
            </p>
          </Reveal>
          <Reveal className="mt-1">
            <p className="m-0 text-[18px] font-[300] italic leading-[28px] text-[#1D1D1B] md:text-[24px] md:leading-[36px] lg:text-[36px] lg:leading-[44px]">
              from the world of creativity and communication.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyIntro;
