"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BRANDING_IMAGES = [
  "/work/creatives/s3/i11.jpg",
  "/work/creatives/s3/i22.jpg",
  "/work/creatives/s3/i33.jpg",
  "/work/creatives/s3/i44.jpg",
  "/work/creatives/s3/i11.jpg",
  "/work/creatives/s3/i22.jpg",
  "/work/creatives/s3/i33.jpg",
  "/work/creatives/s3/i44.jpg",
];

function Section3() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const headers = gsap.utils.toArray("[data-creatives-header]", section);
      const cards = gsap.utils.toArray("[data-creatives-card]", section);

      if (prefersReducedMotion) {
        gsap.set([...headers, ...cards], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      headers.forEach((header, index) => {
        gsap.set(header, { opacity: 0, y: 36 });

        gsap.to(header, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.08,
          scrollTrigger: {
            trigger: header,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });

      cards.forEach((card, index) => {
        const image = card.querySelector("[data-creatives-image]");

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
            delay: (index % 4) * 0.1,
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
    <section
      ref={sectionRef}
      className="w-full flex justify-center items-center py-[45px] max-xl:py-[36px] max-md:py-[28px]"
    >
      {/* Centered Align Container  */}
      <div className="w-full max-w-[1340px] flex flex-col gap-[60px] max-xl:px-6 max-md:px-4 max-md:gap-[40px]">
        <div data-creatives-header className="w-full">
          <p className="font-league-spartan font-[600] text-[36px] max-xl:text-[30px] max-lg:text-[26px] max-md:text-[22px] max-sm:text-[20px]">
            Branding Creatives
          </p>
        </div>
        {/* Main Body Container  */}
        <div className="w-full grid grid-cols-4 justify-between max-xl:gap-x-6 max-lg:grid-cols-2 max-lg:gap-x-4 max-md:grid-cols-1 max-md:gap-x-0">
          {BRANDING_IMAGES.map((img, idx) => {
            return (
              <div
                key={idx}
                data-creatives-card
                className="w-[319px] h-[227px] mb-[30px] relative overflow-hidden max-xl:w-full max-xl:h-auto max-xl:aspect-[319/227] max-md:mb-[24px] max-sm:mb-[20px]"
              >
                <img
                  data-creatives-image
                  src={img}
                  alt={`branding-creative-${idx}`}
                  className="w-full h-full object-cover will-change-transform"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Section3;
