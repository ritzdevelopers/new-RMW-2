"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PORTFOLIO_IMAGES = [
  "/work/portfolio/s1/saya.jpg",
  "/work/portfolio/s1/ashtech.jpg",
  "/work/portfolio/s1/saya.jpg",
  "/work/portfolio/s1/ashtech.jpg",
  "/work/portfolio/s1/saya.jpg",
  "/work/portfolio/s1/ashtech.jpg",
];

const Section2 = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const header = section.querySelector("[data-portfolio-header]");
      const cards = gsap.utils.toArray("[data-portfolio-card]", section);

      if (prefersReducedMotion) {
        gsap.set([header, ...cards], { clearProps: "all", opacity: 1, y: 0, scale: 1 });
        return;
      }

      if (header) {
        gsap.set(header, { opacity: 0, y: 36 });

        gsap.to(header, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }

      cards.forEach((card, index) => {
        const image = card.querySelector("[data-portfolio-image]");

        gsap.set(card, { opacity: 0, y: 72 });
        gsap.set(image, { scale: 1.06 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          })
          .to(card, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: (index % 2) * 0.1,
          })
          .to(
            image,
            {
              scale: 1,
              duration: 1.1,
              ease: "power2.out",
            },
            "<"
          );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full  flex justify-center items-center">
      {/* Centered Align Container  */}
      <div className="w-full max-w-[1340px] flex flex-col gap-[40px] max-xl:px-6 max-md:px-4 max-md:gap-[28px]">
        {/* Top Row  */}
        <div
          data-portfolio-header
          className="w-full pb-[45px] border-b-2 border-[#E8E8E8] max-md:pb-[28px]"
        >
          <h3 className="font-league-spartan font-[700] text-[38px] uppercase max-xl:text-[32px] max-lg:text-[28px] max-md:text-[24px] max-sm:text-[20px]">
            Websites
          </h3>
        </div>

        {/* Main Body Row  */}
        <div className="w-full grid grid-cols-2 justify-between max-xl:gap-x-6 max-lg:gap-x-4 max-md:grid-cols-1 max-md:gap-x-0">
          {PORTFOLIO_IMAGES.map((img, idx) => {
            return (
              <div
                key={idx}
                data-portfolio-card
                className="w-[650px] h-[1699px]  mb-[40px] relative overflow-hidden max-xl:w-full max-xl:h-auto max-xl:aspect-[650/1699] max-md:mb-[24px] max-sm:mb-[20px]"
              >
                <img
                  data-portfolio-image
                  src={img}
                  alt="portfolio"
                  className="w-full h-full object-cover z-0 will-change-transform"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Section2;
