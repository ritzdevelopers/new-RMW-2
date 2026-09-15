"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import {
  imgImage1019,
  imgImage1020,
  imgImage1022,
  imgImage1023,
  imgImage1025,
} from "./figmaAssets";

const slider = [
  {
    img: imgImage1023,
    content:
      "Today’s drinkers are more expressive, diverse – and female. Women now make up a third of whisky consumers, leaving the cigar lounges.Today’s drinkers are more expressive, diverse – and female. Women now make up a third of whisky consumers, leaving the cigar lounges.",
  },
  {
    img: imgImage1025,
    content:
      "Today’s drinkers are more expressive, diverse – and female. Women now make up a third of whisky consumers, leaving the cigar lounges.Today’s drinkers are more expressive, diverse – and female. Women now make up a third of whisky consumers, leaving the cigar lounges.",
  },
  {
    img: imgImage1022,
    content:
      "A launch campaign that fused product and lifestyle, sparked record-breaking fandom, and gave Blue Label a whole new kind of cultural relevance.",
  },
];

/** Slot model: center, left, right — offsets scale down on smaller screens */
const getSlotTransforms = (width) => {
  if (width < 640) {
    return [
      { x: "0%", z: 0, scale: 1, opacity: 1, zIndex: 3 },
      { x: "-38%", z: -30, scale: 0.7, opacity: 0.75, zIndex: 1 },
      { x: "38%", z: -30, scale: 0.7, opacity: 0.75, zIndex: 2 },
    ];
  }

  if (width < 1024) {
    return [
      { x: "0%", z: 0, scale: 1, opacity: 1, zIndex: 3 },
      { x: "-48%", z: -40, scale: 0.78, opacity: 0.8, zIndex: 1 },
      { x: "48%", z: -40, scale: 0.78, opacity: 0.8, zIndex: 2 },
    ];
  }

  if (width < 1265) {
    return [
      { x: "0%", z: 0, scale: 1, opacity: 1, zIndex: 3 },
      { x: "-52%", z: -50, scale: 0.8, opacity: 0.8, zIndex: 1 },
      { x: "52%", z: -50, scale: 0.8, opacity: 0.8, zIndex: 2 },
    ];
  }

  return [
    { x: "0%", z: 0, scale: 1, opacity: 1, zIndex: 3 },
    { x: "-55%", z: -50, scale: 0.8, opacity: 0.8, zIndex: 1 },
    { x: "55%", z: -50, scale: 0.8, opacity: 0.8, zIndex: 2 },
  ];
};

const getSlotType = (slot) => {
  if (slot.scale === 1) return "center";
  if (String(slot.x).trim().startsWith("-")) return "left";
  return "right";
};

const DURATION = 1;

const Section3 = () => {
  const cardRefs = useRef([]);
  const transformsRef = useRef(
    getSlotTransforms(
      typeof window !== "undefined" ? window.innerWidth : 1440,
    ).map((slot) => ({ ...slot })),
  );
  const animatingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlotIndex = (index, length) =>
    index >= length - 1 ? 0 : index + 1;

  const prevSlotIndex = (index, length) =>
    index <= 0 ? length - 1 : index - 1;

  const syncActiveFromTransforms = () => {
    const centerIndex = transformsRef.current.findIndex(
      (slot) => slot.scale === 1,
    );
    if (centerIndex >= 0) setActiveIndex(centerIndex);
  };

  const applyCardSlot = (card, slot, animate = false) => {
    const face = card.querySelector("[data-card-face]");
    const content = card.querySelector("[data-card-content]");
    if (!face) return;

    gsap.set(card, { zIndex: slot.zIndex });

    const faceProps = {
      x: slot.x,
      z: slot.z,
      scale: slot.scale,
      opacity: slot.opacity,
      force3D: true,
      transformOrigin: "50% 50%",
    };

    const contentProps = {
      opacity: slot.scale === 1 ? 1 : 0,
      y: slot.scale === 1 ? 0 : 16,
    };

    if (animate) {
      gsap.to(face, { ...faceProps, duration: DURATION, ease: "power2.inOut" });
      if (content) {
        gsap.to(content, {
          ...contentProps,
          duration: DURATION,
          ease: "power2.inOut",
        });
      }
    } else {
      gsap.set(face, faceProps);
      if (content) gsap.set(content, contentProps);
    }
  };

  const refreshSlotsForViewport = () => {
    if (animatingRef.current) return;

    const templates = getSlotTransforms(window.innerWidth);
    const byType = {
      center: templates[0],
      left: templates[1],
      right: templates[2],
    };

    transformsRef.current = transformsRef.current.map((slot) => ({
      ...byType[getSlotType(slot)],
    }));

    cardRefs.current.filter(Boolean).forEach((card, index) => {
      applyCardSlot(card, transformsRef.current[index], false);
    });
  };

  const animateToSlots = (getTargetIndex, rotateTransforms) => {
    if (animatingRef.current) return;

    const cards = cardRefs.current.filter(Boolean);
    const transforms = transformsRef.current;
    if (!cards.length) return;

    animatingRef.current = true;

    const tl = gsap.timeline({
      defaults: {
        duration: DURATION,
        ease: "power2.inOut",
      },
      onComplete: () => {
        rotateTransforms();
        syncActiveFromTransforms();
        animatingRef.current = false;
      },
    });

    cards.forEach((card, index) => {
      const target = transforms[getTargetIndex(index, cards.length)];
      const face = card.querySelector("[data-card-face]");
      const content = card.querySelector("[data-card-content]");

      tl.set(card, { zIndex: target.zIndex }, 0);

      tl.to(
        face,
        {
          x: target.x,
          z: target.z,
          scale: target.scale,
          opacity: target.opacity,
          force3D: true,
        },
        0,
      );

      if (content) {
        tl.to(
          content,
          {
            opacity: target.scale === 1 ? 1 : 0,
            y: target.scale === 1 ? 0 : 16,
          },
          0,
        );
      }
    });
  };

  useEffect(() => {
    refreshSlotsForViewport();

    const onResize = () => {
      refreshSlotsForViewport();
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goNext = () => {
    animateToSlots(nextSlotIndex, () => {
      transformsRef.current.push(transformsRef.current.shift());
    });
  };

  const goPrev = () => {
    animateToSlots(prevSlotIndex, () => {
      transformsRef.current.unshift(transformsRef.current.pop());
    });
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      data-node-id="1:153"
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage: `url("${imgImage1019}")`,
          maskImage: `url("${imgImage1019}")`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        <img
          src={imgImage1020}
          alt=""
          className="absolute inset-0 h-full w-full max-w-none object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.74)]" />
      </div>

      <div
        className="relative mx-auto flex w-full max-w-[1154px] flex-col items-center px-4 py-10 sm:px-6 sm:py-14 md:py-16 lg:px-6 lg:py-16 xl:py-20"
        data-node-id="1:158"
      >
        <div
          id="carousel"
          className="relative h-[360px] w-full max-w-[780px] sm:h-[440px] md:h-[520px] lg:h-[560px] min-[1265px]:h-[621px]"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          {slider.map((slide, index) => (
            <div
              key={slide.img}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="absolute inset-0 flex items-start justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <article
                data-card-face
                className="card relative h-full w-[min(100%,280px)] cursor-pointer overflow-hidden rounded-[16px] will-change-transform sm:w-[min(100%,380px)] sm:rounded-[18px] md:w-[min(100%,460px)] lg:w-[min(100%,520px)] min-[1265px]:w-[min(100%,587px)] min-[1265px]:rounded-[20px]"
                style={{ transformStyle: "preserve-3d" }}
                onClick={goNext}
              >
                <img
                  src={slide.img}
                  alt=""
                  className="absolute inset-0 h-full w-full max-w-none rounded-[inherit] object-cover"
                />

                <div
                  data-card-content
                  className="absolute inset-x-0 bottom-0 overflow-hidden rounded-b-[inherit] px-4 pb-5 pt-6 sm:px-5 sm:pb-6 sm:pt-7 md:px-6 md:pb-8 md:pt-9"
                  style={{
                    background: "rgba(0, 0, 0, 0.18)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(3.1px)",
                    WebkitBackdropFilter: "blur(3.1px)",
                    border: "1px solid rgba(255, 255, 255, 0.45)",
                    borderBottom: "none",
                  }}
                >
                  <p
                    className="relative z-10 m-0 mx-auto max-w-[509px] text-center text-[13px] font-normal leading-[18px] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)] sm:text-[15px] sm:leading-[22px] md:text-[17px] md:leading-[24px] lg:text-[18px] lg:leading-[26px] min-[1265px]:text-[20px] min-[1265px]:leading-[28px]"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {slide.content}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* ARROWS */}
        <div className="mt-6 flex items-center gap-2 sm:mt-8 sm:gap-[11px] md:mt-9">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goPrev}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-transparent text-white transition-transform duration-300 ease-out hover:scale-105 active:scale-95 sm:h-16 sm:w-16 md:h-[83px] md:w-[83px]"
          >
            <FaArrowLeft className="text-[18px] sm:text-[22px] md:text-[28px]" />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={goNext}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-transparent text-white transition-transform duration-300 ease-out hover:scale-105 active:scale-95 sm:h-16 sm:w-16 md:h-[83px] md:w-[83px]"
          >
            <FaArrowRight className="text-[18px] sm:text-[22px] md:text-[28px]" />
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          {slider[activeIndex]?.content}
        </p>
      </div>
    </section>
  );
};

export default Section3;
