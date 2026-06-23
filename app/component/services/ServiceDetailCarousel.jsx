"use client";

import React, { useCallback, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const contentStyle = {
  width: "100%",
  maxWidth: "509px",
  flexShrink: 0,
  color: "#FFFFFF",
  textAlign: "center",
  fontFamily: "Montserrat, sans-serif",
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "28px",
};

const ACTIVE_W = 509;
const ACTIVE_H = 500;
const SIDE_W = 300;
const SIDE_H = 380;
const SIDE_X = 370;
const SIDE_Z = -140;

const getRelativeOffset = (index, active, count) => {
  let diff = index - active;
  if (diff > count / 2) diff -= count;
  if (diff < -count / 2) diff += count;
  return diff;
};

const getCardState = (offset) => {
  if (offset === 0) {
    return {
      x: 0,
      z: 0,
      rotateY: 0,
      width: ACTIVE_W,
      height: ACTIVE_H,
      opacity: 1,
      zIndex: 30,
    };
  }

  if (offset === -1) {
    return {
      x: -SIDE_X,
      z: SIDE_Z,
      rotateY: 24,
      width: SIDE_W,
      height: SIDE_H,
      opacity: 0.92,
      zIndex: 20,
    };
  }

  if (offset === 1) {
    return {
      x: SIDE_X,
      z: SIDE_Z,
      rotateY: -24,
      width: SIDE_W,
      height: SIDE_H,
      opacity: 0.92,
      zIndex: 20,
    };
  }

  return {
    x: offset < 0 ? -SIDE_X * 1.6 : SIDE_X * 1.6,
    z: SIDE_Z * 2,
    rotateY: offset < 0 ? 30 : -30,
    width: SIDE_W,
    height: SIDE_H,
    opacity: 0,
    zIndex: 10,
  };
};

const ServiceDetailCarousel = ({ carousel }) => {
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const textRefs = useRef([]);
  const copyRefs = useRef([]);
  const activeIndexRef = useRef(0);
  const animatingRef = useRef(false);

  const slides = carousel?.slides ?? [];
  const slideCount = slides.length;
  const initialIndex = slideCount > 1 ? 1 : 0;

  const revealActiveText = useCallback((index, immediate = false) => {
    copyRefs.current.forEach((copy, i) => {
      if (!copy) return;
      if (i === index) {
        if (immediate) {
          gsap.set(copy, { yPercent: 0 });
        } else {
          gsap.fromTo(
            copy,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.85, ease: "power4.out", delay: 0.18 }
          );
        }
      } else {
        gsap.set(copy, { yPercent: 110 });
      }
    });

    textRefs.current.forEach((wrap, i) => {
      if (!wrap) return;
      gsap.to(wrap, {
        autoAlpha: i === index ? 1 : 0,
        duration: immediate ? 0 : 0.3,
        ease: "power2.out",
      });
    });
  }, []);

  const applyLayout = useCallback(
    (activeIndex, immediate = false) => {
      const duration = immediate ? 0 : 0.95;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const offset = getRelativeOffset(i, activeIndex, slideCount);
        const state = getCardState(offset);

        gsap.to(card, {
          x: state.x,
          z: state.z,
          rotateY: state.rotateY,
          width: state.width,
          height: state.height,
          opacity: state.opacity,
          zIndex: state.zIndex,
          duration,
          ease: "power4.inOut",
        });
      });

      revealActiveText(activeIndex, immediate);

      if (!immediate) {
        gsap.delayedCall(duration, () => {
          animatingRef.current = false;
        });
      }
    },
    [slideCount, revealActiveText]
  );

  const goTo = useCallback(
    (targetIndex, { immediate = false } = {}) => {
      if (!slideCount || animatingRef.current) return;

      const nextIndex = ((targetIndex % slideCount) + slideCount) % slideCount;
      if (nextIndex === activeIndexRef.current && !immediate) return;

      animatingRef.current = !immediate;
      activeIndexRef.current = nextIndex;
      applyLayout(nextIndex, immediate);
    },
    [slideCount, applyLayout]
  );

  useLayoutEffect(() => {
    if (!slideCount) return;

    activeIndexRef.current = initialIndex;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const state = getCardState(getRelativeOffset(i, initialIndex, slideCount));
      gsap.set(card, {
        xPercent: -50,
        left: "50%",
        bottom: 0,
        x: state.x,
        z: state.z,
        rotateY: state.rotateY,
        width: state.width,
        height: state.height,
        opacity: state.opacity,
        zIndex: state.zIndex,
        transformOrigin: "center bottom",
        transformPerspective: 1200,
      });
    });

    requestAnimationFrame(() => {
      goTo(initialIndex, { immediate: true });
    });

    const onResize = () => goTo(activeIndexRef.current, { immediate: true });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [slideCount, initialIndex, goTo]);

  if (!carousel?.slides?.length) return null;

  return (
    <section
      className={`${montserrat.className} relative min-h-[100dvh] overflow-hidden bg-[#1a1a1a]`}
    >
      <img
        src={carousel.background}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1440px] flex-col items-center justify-center px-4 py-10 sm:px-6 md:py-12">
        <div
          ref={stageRef}
          className="relative w-full overflow-visible"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 65%",
            height: ACTIVE_H + 32,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="absolute cursor-pointer overflow-hidden rounded-[18px] bg-[#111] shadow-[0_20px_50px_rgba(0,0,0,0.4)] will-change-transform"
              style={{
                width: SIDE_W,
                height: SIDE_H,
                transformStyle: "preserve-3d",
              }}
              onClick={() => goTo(index)}
            >
              <img
                src={slide.src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div
                ref={(el) => {
                  textRefs.current[index] = el;
                }}
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.92)] via-[rgba(0,0,0,0.5)] to-transparent px-5 pb-6 pt-14"
              >
                <div className="mx-auto overflow-hidden px-2">
                  <p
                    ref={(el) => {
                      copyRefs.current[index] = el;
                    }}
                    data-carousel-copy
                    className="m-0"
                    style={contentStyle}
                  >
                    {slide.content ?? carousel.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 md:mt-8">
          <button
            type="button"
            onClick={() => goTo(activeIndexRef.current - 1)}
            aria-label="Previous slide"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[rgba(0,0,0,0.45)] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-[rgba(0,0,0,0.65)] md:h-14 md:w-14"
          >
            <i className="ri-arrow-left-line text-[20px] md:text-[22px]" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndexRef.current + 1)}
            aria-label="Next slide"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[rgba(0,0,0,0.45)] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-[rgba(0,0,0,0.65)] md:h-14 md:w-14"
          >
            <i className="ri-arrow-right-line text-[20px] md:text-[22px]" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailCarousel;
