"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const SLIDES = [
  { src: "/social-media/creative2.avif", label: "Condominium" },
  { src: "/social-media/creative2.avif", label: "Allied Health Clinic" },
  { src: "/social-media/creative2.avif", label: "Childcare Centre" },
  { src: "/social-media/creative2.avif", label: "Cosmetic Injector" },
  { src: "/social-media/creative2.avif", label: "Haircare Products" },
  { src: "/social-media/creative2.avif", label: "Beauty Studio" },
  { src: "/social-media/creative2.avif", label: "Dental Practice" },
  { src: "/social-media/creative2.avif", label: "Boutique Hotel" },
  { src: "/social-media/creative2.avif", label: "Fitness Brand" },
  { src: "/social-media/creative2.avif", label: "Fashion Label" },
];

const GAP_PX = 10;
const SPEED = 45; // px per second - continuous marquee speed
const SLIDE_STEP_DURATION = 0.4; // fast card snap on arrow click

const getVisibleCount = (width) => {
  if (width < 640) return 1;
  if (width < 900) return 2;
  if (width < 1200) return 3;
  if (width < 1600) return 4;
  return 5;
};

function Section2() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const loopWidthRef = useRef(0);
  const directionRef = useRef(-1); // -1 = left, 1 = right
  const cardWidthRef = useRef(0);
  const isHoveringRef = useRef(false);
  const isNudgingRef = useRef(false);

  const [metrics, setMetrics] = useState({ cardWidth: 0, visibleCount: 4 });
  const [direction, setDirection] = useState(-1);

  const loopSlides = [...SLIDES, ...SLIDES];

  const syncMetrics = useCallback(() => {
    const width = containerRef.current?.clientWidth || 0;
    const visibleCount = getVisibleCount(window.innerWidth);
    const cardWidth =
      visibleCount > 0
        ? Math.floor((width - GAP_PX * (visibleCount - 1)) / visibleCount)
        : Math.floor(width);
    cardWidthRef.current = cardWidth;
    setMetrics({ cardWidth, visibleCount });
    return { cardWidth, visibleCount };
  }, []);

  const startMarquee = useCallback(() => {
    const track = trackRef.current;
    const loopWidth = loopWidthRef.current;
    if (!track || loopWidth <= 0 || isHoveringRef.current) return;

    tweenRef.current?.kill();
    isNudgingRef.current = false;

    const wrap = gsap.utils.wrap(-loopWidth, 0);
    const currentX = Number(gsap.getProperty(track, "x")) || 0;
    gsap.set(track, { x: wrap(currentX) });

    const dir = directionRef.current;
    tweenRef.current = gsap.to(track, {
      x: dir < 0 ? `-=${loopWidth}` : `+=${loopWidth}`,
      duration: loopWidth / SPEED,
      ease: "none",
      repeat: -1,
      force3D: true,
      modifiers: {
        x: (v) => `${wrap(parseFloat(v))}px`,
      },
    });
  }, []);

  // Fast one-card slide on arrow click, then resume marquee
  const slideByCard = useCallback(
    (dir) => {
      const track = trackRef.current;
      const loopWidth = loopWidthRef.current;
      const step = cardWidthRef.current + GAP_PX;
      if (!track || loopWidth <= 0 || step <= 0) return;

      directionRef.current = dir;
      setDirection(dir);
      tweenRef.current?.kill();
      isNudgingRef.current = true;

      const wrap = gsap.utils.wrap(-loopWidth, 0);
      const currentX = wrap(Number(gsap.getProperty(track, "x")) || 0);
      const nextX = currentX + dir * step;

      tweenRef.current = gsap.to(track, {
        x: nextX,
        duration: SLIDE_STEP_DURATION,
        ease: "power2.out",
        force3D: true,
        overwrite: "auto",
        onComplete: () => {
          gsap.set(track, { x: wrap(nextX) });
          isNudgingRef.current = false;
          if (!isHoveringRef.current) startMarquee();
        },
      });
    },
    [startMarquee]
  );

  useLayoutEffect(() => {
    syncMetrics();
    const onResize = () => syncMetrics();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [syncMetrics]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || metrics.cardWidth <= 0) return;

    const loopWidth = SLIDES.length * (metrics.cardWidth + GAP_PX);
    loopWidthRef.current = loopWidth;

    gsap.set(track, { x: 0, force3D: true });
    startMarquee();

    return () => {
      tweenRef.current?.kill();
    };
  }, [metrics.cardWidth, startMarquee]);

  const pauseMarquee = () => {
    isHoveringRef.current = true;
    if (!isNudgingRef.current) tweenRef.current?.pause();
  };

  const resumeMarquee = () => {
    isHoveringRef.current = false;
    if (isNudgingRef.current) return;
    if (tweenRef.current?.paused()) tweenRef.current.resume();
    else startMarquee();
  };

  const cardHeight =
    metrics.cardWidth > 0 ? Math.round(metrics.cardWidth * (510 / 408)) : 510;

  return (
    <section className="relative w-full bg-[#ffffff] pb-4">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        onMouseEnter={pauseMarquee}
        onMouseLeave={resumeMarquee}
      >
        <div
          ref={trackRef}
          className="flex w-max will-change-transform [backface-visibility:hidden]"
          style={{ gap: `${GAP_PX}px` }}
        >
          {loopSlides.map((slide, index) => (
            <div
              key={`${slide.label}-${index}`}
              className="relative shrink-0 overflow-hidden bg-[#EFEDE8] [backface-visibility:hidden] [transform:translateZ(0)]"
              style={{
                width: metrics.cardWidth || "100%",
                height: cardHeight,
              }}
            >
              <img
                src={slide.src}
                alt={slide.label}
                className="pointer-events-none h-full w-full select-none"
                draggable={false}
                loading={index < 5 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Slide left"
          aria-pressed={direction === 1}
          onClick={() => slideByCard(1)}
          className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1a1a1a] shadow-sm backdrop-blur-sm transition hover:bg-white sm:left-3 sm:h-11 sm:w-11 md:left-4"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Slide right"
          aria-pressed={direction === -1}
          onClick={() => slideByCard(-1)}
          className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1a1a1a] shadow-sm backdrop-blur-sm transition hover:bg-white sm:right-3 sm:h-11 sm:w-11 md:right-4"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default Section2;
