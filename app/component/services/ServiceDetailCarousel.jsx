"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Montserrat } from "next/font/google";
import { getSubServiceHref } from "../../../data/sub-services";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const contentStyle = {
  color: "#FFFFFF",
  textAlign: "center",
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
};

const DESKTOP_METRICS = {
  ACTIVE_W: 509,
  ACTIVE_H: 500,
  SIDE_W: 300,
  SIDE_H: 380,
  SIDE_X: 370,
  SIDE_Z: -140,
};

const getCarouselMetrics = () => {
  if (typeof window === "undefined") return DESKTOP_METRICS;

  if (window.innerWidth >= 768) return DESKTOP_METRICS;

  const activeW = Math.min(window.innerWidth - 32, DESKTOP_METRICS.ACTIVE_W);
  const scale = activeW / DESKTOP_METRICS.ACTIVE_W;

  return {
    ACTIVE_W: activeW,
    ACTIVE_H: Math.round(DESKTOP_METRICS.ACTIVE_H * scale),
    SIDE_W: Math.round(DESKTOP_METRICS.SIDE_W * scale),
    SIDE_H: Math.round(DESKTOP_METRICS.SIDE_H * scale),
    SIDE_X: Math.round(DESKTOP_METRICS.SIDE_X * scale),
    SIDE_Z: DESKTOP_METRICS.SIDE_Z,
  };
};

const getRelativeOffset = (index, active, count) => {
  let diff = index - active;
  if (diff > count / 2) diff -= count;
  if (diff < -count / 2) diff += count;
  return diff;
};

const getCardState = (offset, metrics = DESKTOP_METRICS) => {
  if (offset === 0) {
    return {
      x: 0,
      z: 0,
      rotateY: 0,
      width: metrics.ACTIVE_W,
      height: metrics.ACTIVE_H,
      opacity: 1,
      zIndex: 30,
    };
  }

  if (offset === -1) {
    return {
      x: -metrics.SIDE_X,
      z: metrics.SIDE_Z,
      rotateY: 24,
      width: metrics.SIDE_W,
      height: metrics.SIDE_H,
      opacity: 0.92,
      zIndex: 20,
    };
  }

  if (offset === 1) {
    return {
      x: metrics.SIDE_X,
      z: metrics.SIDE_Z,
      rotateY: -24,
      width: metrics.SIDE_W,
      height: metrics.SIDE_H,
      opacity: 0.92,
      zIndex: 20,
    };
  }

  return {
    x: offset < 0 ? -metrics.SIDE_X * 1.6 : metrics.SIDE_X * 1.6,
    z: metrics.SIDE_Z * 2,
    rotateY: offset < 0 ? 30 : -30,
    width: metrics.SIDE_W,
    height: metrics.SIDE_H,
    opacity: 0,
    zIndex: 10,
  };
};

const ServiceDetailCarousel = ({ carousel, serviceSlug }) => {
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const textRefs = useRef([]);
  const copyRefs = useRef([]);
  const activeIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const metricsRef = useRef(DESKTOP_METRICS);
  const [stageHeight, setStageHeight] = useState(DESKTOP_METRICS.ACTIVE_H + 32);

  const syncMetrics = useCallback(() => {
    const metrics = getCarouselMetrics();
    metricsRef.current = metrics;
    setStageHeight(metrics.ACTIVE_H + 32);
  }, []);

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
        const state = getCardState(offset, metricsRef.current);

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
    syncMetrics();

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const state = getCardState(
        getRelativeOffset(i, initialIndex, slideCount),
        metricsRef.current,
      );
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

    const onResize = () => {
      syncMetrics();
      goTo(activeIndexRef.current, { immediate: true });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [slideCount, initialIndex, goTo, syncMetrics]);

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
          className="relative w-full overflow-hidden md:overflow-visible"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 65%",
            height: stageHeight,
          }}
        >
          {slides.map((slide, index) => {
            const href =
              serviceSlug && slide.subSlug
                ? getSubServiceHref(serviceSlug, slide.subSlug)
                : null;

            const cardClassName =
              "carousel-card group absolute block cursor-pointer overflow-hidden rounded-[18px] bg-[#111] no-underline shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-shadow duration-300 ease-out will-change-transform hover:shadow-[0_0_0_2px_rgba(255,255,255,0.32),0_28px_64px_rgba(0,0,0,0.55)]";
            const cardStyle = {
              width: metricsRef.current.SIDE_W,
              height: metricsRef.current.SIDE_H,
              transformStyle: "preserve-3d",
              borderRadius: 18,
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
            };
            const cardContent = (
              <>
                <div className="absolute inset-0 overflow-hidden rounded-[18px]">
                  <img
                    src={slide.src}
                    alt=""
                    className="absolute inset-0 h-full w-full rounded-[18px] object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-black/15 transition-colors duration-300 group-hover:bg-black/5" />
                  <div className="pointer-events-none absolute inset-0 rounded-[18px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.14)_48%,transparent_92%)]" />
                </div>

                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden rounded-[18px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex translate-y-3 items-center gap-2 rounded-full border border-white/40 bg-black/55 px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.12em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0 md:text-sm">
                    View
                    <i className="ri-arrow-right-up-line text-[16px]" aria-hidden />
                  </span>
                </div>

                <div
                  ref={(el) => {
                    textRefs.current[index] = el;
                  }}
                  className="absolute inset-x-0 bottom-0 z-20 overflow-hidden rounded-b-[18px] bg-gradient-to-t from-[rgba(0,0,0,0.92)] via-[rgba(0,0,0,0.5)] to-transparent px-3 pb-5 pt-10 md:px-5 md:pb-6 md:pt-14"
                >
                  <div className="mx-auto w-full max-w-full overflow-hidden">
                    <p
                      ref={(el) => {
                        copyRefs.current[index] = el;
                      }}
                      data-carousel-copy
                      className="m-0 w-full max-w-full text-center text-[15px] leading-[22px] md:max-w-[509px] md:text-[20px] md:leading-7"
                      style={contentStyle}
                    >
                      {slide.content ?? carousel.content}
                    </p>
                  </div>
                </div>
              </>
            );

            if (href) {
              return (
                <Link
                  key={slide.src}
                  href={href}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={cardClassName}
                  style={cardStyle}
                  aria-label={`View ${slide.content ?? "service"} details`}
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div
                key={slide.src}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={cardClassName}
                style={cardStyle}
                role="button"
                tabIndex={0}
                aria-label={`Show ${slide.content ?? "slide"}`}
                onClick={() => goTo(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goTo(index);
                  }
                }}
              >
                {cardContent}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 md:mt-8">
          <button
            type="button"
            onClick={() => goTo(activeIndexRef.current - 1)}
            aria-label="Previous slide"
            className="flex cursor-pointer h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[rgba(0,0,0,0.45)] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-[rgba(0,0,0,0.65)] md:h-14 md:w-14"
          >
            <i className="ri-arrow-left-line text-[20px] md:text-[22px]" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndexRef.current + 1)}
            aria-label="Next slide"
            className="flex cursor-pointer h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[rgba(0,0,0,0.45)] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-[rgba(0,0,0,0.65)] md:h-14 md:w-14"
          >
            <i className="ri-arrow-right-line text-[20px] md:text-[22px]" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailCarousel;
