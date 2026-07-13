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

// splits a header's text into word spans wrapped in overflow-hidden masks
function splitIntoWords(el) {
  const text = el.textContent;
  el.innerHTML = text
    .split(" ")
    .map(
      (word) =>
        `<span class="inline-block overflow-hidden pb-[4px] align-top"><span class="inline-block will-change-transform" data-word>${word}</span></span>`
    )
    .join(" ");
  return el.querySelectorAll("[data-word]");
}

const Section2 = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const pointerCleanups = [];

    const ctx = gsap.context(() => {
      const header = section.querySelector("[data-portfolio-header]");
      const cards = gsap.utils.toArray("[data-portfolio-card]", section);

      if (prefersReducedMotion) {
        gsap.set([header, ...cards], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
        });
        return;
      }

      // ---------- HEADER: masked word reveal with 3D flip ----------
      if (header) {
        const heading = header.querySelector("h3");
        const words = heading ? splitIntoWords(heading) : [header];

        gsap.set(words, { yPercent: 120, rotateX: -60, opacity: 0 });

        gsap.to(words, {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.05,
          transformOrigin: "50% 100%",
          scrollTrigger: {
            trigger: header,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        // subtle border-line draw under the heading
        gsap.fromTo(
          header,
          { "--line-scale": 0 },
          {
            "--line-scale": 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ---------- CARDS: 3D fan reveal + continuous parallax + pointer tilt ----------
      const columns = 2;

      cards.forEach((card, index) => {
        const image = card.querySelector("[data-portfolio-image]");
        const col = index % columns;
        // fan direction: left column tilts in from the left, right column from the right
        const rotateYFrom = col === 0 ? -16 : 16;

        gsap.set(card, {
          opacity: 0,
          y: 120,
          scale: 0.92,
          rotateX: 10,
          rotateY: rotateYFrom,
          transformPerspective: 1400,
          transformOrigin: "center bottom",
        });

        gsap.set(image, {
          scale: 1.18,
          yPercent: -6,
          filter: "blur(6px)",
        });

        // entrance timeline
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
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            duration: 1.3,
            ease: "expo.out",
            delay: col * 0.12,
          })
          .to(
            image,
            {
              scale: 1.03,
              filter: "blur(0px)",
              duration: 1.4,
              ease: "power3.out",
            },
            "<0.05"
          );

        // continuous scroll-linked parallax on the image
        gsap.to(image, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // interactive pointer tilt — kept gentle since these cards are very tall
        const quickRotX = gsap.quickTo(card, "rotateX", {
          duration: 0.7,
          ease: "power3.out",
        });
        const quickRotY = gsap.quickTo(card, "rotateY", {
          duration: 0.7,
          ease: "power3.out",
        });
        const quickScale = gsap.quickTo(card, "scale", {
          duration: 0.7,
          ease: "power3.out",
        });

        const handlePointerMove = (e) => {
          const rect = card.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          quickRotY(relX * 6);
          quickRotX(-relY * 4);
          quickScale(1.01);
        };

        const handlePointerLeave = () => {
          quickRotX(0);
          quickRotY(0);
          quickScale(1);
        };

        card.style.transformStyle = "preserve-3d";
        card.style.willChange = "transform";
        card.addEventListener("pointermove", handlePointerMove);
        card.addEventListener("pointerleave", handlePointerLeave);

        pointerCleanups.push(() => {
          card.removeEventListener("pointermove", handlePointerMove);
          card.removeEventListener("pointerleave", handlePointerLeave);
        });
      });
    }, section);

    return () => {
      pointerCleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex justify-center items-center"
      style={{ perspective: "1600px" }}
    >
      {/* Centered Align Container  */}
      <div className="w-full max-w-[1340px] flex flex-col gap-[40px] max-xl:px-6 max-md:px-4 max-md:gap-[28px]">
        {/* Top Row  */}
        <div
          data-portfolio-header
          className="w-full pb-[45px] border-b-2 border-[#E8E8E8] max-md:pb-[28px] relative"
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
                className="w-[650px] h-[1699px] mb-[40px] relative overflow-hidden max-xl:w-full max-xl:h-auto max-xl:aspect-[650/1699] max-md:mb-[24px] max-sm:mb-[20px]"
              >
                <img
                  data-portfolio-image
                  src={img}
                  alt="portfolio"
                  className="w-full h-full object-cover z-0 will-change-transform scale-105"
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