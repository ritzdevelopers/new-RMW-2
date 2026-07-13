"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AI_VIDEO_IMAGES = [
  "/work/creatives/s2/i1.jpg",
  "/work/creatives/s2/i2.jpg",
  "/work/creatives/s2/i3.jpg",
  "/work/creatives/s2/i1.jpg",
  "/work/creatives/s2/i2.jpg",
  "/work/creatives/s2/i3.jpg",
];

// splits a header's text into word spans wrapped in overflow-hidden masks
function splitIntoWords(el) {
  const text = el.textContent.trim();
  el.innerHTML = text
    .split(/\s+/)
    .map(
      (word) =>
        `<span class="inline-block overflow-hidden pb-[4px] align-top"><span class="inline-block will-change-transform" data-word>${word}</span></span>`
    )
    .join(" ");
  return el.querySelectorAll("[data-word]");
}

function Section32() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const pointerCleanups = [];

    const ctx = gsap.context(() => {
      const headers = gsap.utils.toArray("[data-creatives-header]", section);
      const cards = gsap.utils.toArray("[data-creatives-card]", section);

      if (prefersReducedMotion) {
        gsap.set([...headers, ...cards], {
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
      headers.forEach((header) => {
        const words = splitIntoWords(header);

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
      });

      // ---------- CARDS: 3D fan reveal + continuous parallax + pointer tilt ----------
      const columns = 3;

      cards.forEach((card, index) => {
        const image = card.querySelector("[data-creatives-image]");
        const col = index % columns;
        // fan direction: left column tilts from left, right column from right
        const rotateYFrom = col === 0 ? -22 : col === columns - 1 ? 22 : 0;
        const rotateXFrom = 18;

        gsap.set(card, {
          opacity: 0,
          y: 100,
          scale: 0.88,
          rotateX: rotateXFrom,
          rotateY: rotateYFrom,
          transformPerspective: 1200,
          transformOrigin: "center bottom",
        });

        gsap.set(image, {
          scale: 1.25,
          yPercent: -8,
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
            delay: (index % columns) * 0.12,
          })
          .to(
            image,
            {
              scale: 1.05,
              filter: "blur(0px)",
              duration: 1.4,
              ease: "power3.out",
            },
            "<0.05"
          );

        // continuous scroll-linked parallax on the image (separate from entrance)
        gsap.to(image, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // interactive pointer tilt for a premium hover feel
        const quickRotX = gsap.quickTo(card, "rotateX", {
          duration: 0.6,
          ease: "power3.out",
        });
        const quickRotY = gsap.quickTo(card, "rotateY", {
          duration: 0.6,
          ease: "power3.out",
        });
        const quickScale = gsap.quickTo(card, "scale", {
          duration: 0.6,
          ease: "power3.out",
        });

        const handlePointerMove = (e) => {
          const rect = card.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          quickRotY(relX * 12);
          quickRotX(-relY * 12);
          quickScale(1.02);
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
      pointerCleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex justify-center items-center"
      style={{ perspective: "1500px" }}
    >
      {/* Centered Align Container  */}
      <div className="w-full max-w-[1340px] flex flex-col gap-[60px] max-xl:px-6 max-md:px-4 max-md:gap-[40px]">
        {/* Row 2  */}
        <div className="w-full flex flex-col gap-[50px] max-xl:gap-[40px] max-md:gap-[28px]">
          <div>
            <p
              data-creatives-header
              className="font-league-spartan font-[600] text-[36px] max-xl:text-[30px] max-lg:text-[26px] max-md:text-[22px] max-sm:text-[20px]"
            >
              OOH Creatives
            </p>
          </div>

          {/* Main Body Container  */}
          <div className="w-full grid grid-cols-3 justify-between max-xl:gap-x-6 max-lg:grid-cols-2 max-lg:gap-x-4 max-md:grid-cols-1 max-md:gap-x-0">
            {AI_VIDEO_IMAGES.map((img, idx) => (
              <div
                key={idx}
                data-creatives-card
                className="w-[430px] h-[670px] mb-[30px] relative overflow-hidden max-xl:w-full max-xl:h-auto max-xl:aspect-[430/670] max-md:mb-[24px] max-sm:mb-[20px]"
              >
                <img
                  data-creatives-image
                  src={img}
                  alt={`ai-video-${idx}`}
                  className="w-full h-full object-cover will-change-transform scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section32;