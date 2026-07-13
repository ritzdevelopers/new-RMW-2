"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LOGO_IMAGES = [
  "/work/logo-design/logo1.png",
  "/work/logo-design/logo2.png",
  "/work/logo-design/logo3.png",
  "/work/logo-design/logo4.png",
  "/work/logo-design/logo1.png",
  "/work/logo-design/logo2.png",
  "/work/logo-design/logo3.png",
  "/work/logo-design/logo4.png",
  "/work/logo-design/logo1.png",
  "/work/logo-design/logo2.png",
  "/work/logo-design/logo3.png",
  "/work/logo-design/logo4.png",
];

function Section2() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const header = section.querySelector("[data-logo-header]");
      const underline = section.querySelector("[data-logo-underline]");
      const cards = gsap.utils.toArray("[data-logo-card]", section);

      if (prefersReducedMotion) {
        gsap.set([header, underline, ...cards], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          scale: 1,
          x: 0,
        });
        cards.forEach((card) => {
          const image = card.querySelector("[data-logo-image]");
          if (image) gsap.set(image, { clearProps: "all", opacity: 1, scale: 1 });
        });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop, isTablet, isMobile } = context.conditions;

          const columns = isDesktop ? 4 : isTablet ? 2 : 1;
          const cardY = isMobile ? 40 : isTablet ? 56 : 72;
          const cardDuration = isMobile ? 0.7 : 0.9;
          const staggerStep = isMobile ? 0.06 : 0.1;
          const start = isMobile ? "top 96%" : "top 92%";

          if (header) {
            gsap.set(header, { opacity: 0, y: isMobile ? 20 : 36 });

            gsap.to(header, {
              opacity: 1,
              y: 0,
              duration: isMobile ? 0.65 : 0.8,
              ease: "power3.out",
              force3D: true,
              scrollTrigger: {
                trigger: header,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            });
          }

          if (underline) {
            gsap.set(underline, { scaleX: 0, transformOrigin: "left center" });

            gsap.to(underline, {
              scaleX: 1,
              duration: isMobile ? 0.7 : 0.95,
              ease: "power3.inOut",
              force3D: true,
              scrollTrigger: {
                trigger: header || underline,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            });
          }

          cards.forEach((card, index) => {
            const image = card.querySelector("[data-logo-image]");
            const col = index % columns;

            gsap.set(card, {
              opacity: 0,
              y: cardY,
              scale: isMobile ? 0.96 : 0.92,
            });

            if (image) {
              gsap.set(image, {
                opacity: 0,
                scale: isMobile ? 0.88 : 0.78,
              });
            }

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start,
                toggleActions: "play none none reverse",
              },
            });

            tl.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: cardDuration,
              ease: "power3.out",
              delay: col * staggerStep,
              force3D: true,
            });

            if (image) {
              tl.to(
                image,
                {
                  opacity: 1,
                  scale: 1,
                  duration: isMobile ? 0.55 : 0.75,
                  ease: isMobile ? "power2.out" : "back.out(1.35)",
                  force3D: true,
                },
                isMobile ? "-=0.35" : "-=0.5"
              );
            }
          });
        }
      );
    }, section);

    // Recalc after layout settles (Lenis + responsive grid)
    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex justify-center items-center mb-[40px] max-md:mb-[32px]"
    >
      {/* Centered Align Container  */}
      <div className="w-full max-w-[1340px] flex flex-col gap-[45px] max-xl:px-6 max-md:px-4 max-md:gap-[32px]">
        {/* Row 1  */}
        <div
          data-logo-header
          className="w-full pb-[45px] relative max-md:pb-[28px]"
        >
          <h1 className="font-[700] text-[48px] max-xl:text-[40px] max-lg:text-[34px] max-md:text-[28px] max-sm:text-[24px]">
            RMW Creatives
          </h1>
          <span
            data-logo-underline
            aria-hidden="true"
            className="absolute left-0 bottom-0 block h-[2px] w-full bg-[#E8E8E8] origin-left will-change-transform"
          />
        </div>

        {/* Row 2  */}
        <div className="w-full grid grid-cols-4 justify-between max-xl:gap-x-6 max-lg:grid-cols-2 max-lg:gap-x-4 max-md:grid-cols-1 max-md:gap-x-0">
          {LOGO_IMAGES.map((item, idx) => {
            return (
              <div
                className="w-[319px] h-[227px] border-[1px] mb-[20px] border-[#CCCCCC] flex justify-center items-center max-xl:w-full max-xl:h-auto max-xl:aspect-[319/227] max-md:mb-[24px] max-sm:mb-[20px] will-change-transform"
                data-logo-card
                key={idx}
              >
                <div className="w-[221px] h-[157px] max-xl:w-[69%] max-xl:h-auto max-xl:aspect-[221/157] overflow-hidden">
                  <img
                    data-logo-image
                    src={item}
                    alt=""
                    className="w-full h-full object-contain will-change-transform"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Section2;
