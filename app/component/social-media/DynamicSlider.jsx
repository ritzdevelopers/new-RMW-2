"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
const SPEED = 45;
const SLIDE_STEP_DURATION = 0.4;

const getVisibleCount = (width) => {
  if (width < 640) return 1;
  if (width < 900) return 2;
  if (width < 1200) return 3;
  if (width < 1600) return 4;
  return 5;
};

const normalizeSlides = (images) => {
  if (!Array.isArray(images) || images.length === 0) return SLIDES;

  return images.map((item, index) => {
    if (typeof item === "string") {
      return {
        src: item,
        fullSrc: item,
        label: SLIDES[index]?.label ?? `Slide ${index + 1}`,
      };
    }

    return {
      src: item.src,
      fullSrc: item.fullSrc || item.src,
      label: item.label ?? SLIDES[index]?.label ?? `Slide ${index + 1}`,
    };
  });
};

function ScrollableImageLightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-black/80"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.label || "Full image preview"}
    >
      <button
        type="button"
        onClick={onClose}
        className="fixed right-4 top-4 z-[101] flex h-10 w-10 items-center justify-center border-0 bg-black/40 text-3xl leading-none text-white backdrop-blur-sm"
        aria-label="Close"
      >
        ×
      </button>

      <div
        className="mx-auto flex min-h-full w-full max-w-[920px] items-start justify-center px-3 py-10 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.fullSrc || image.src}
          alt={image.label || ""}
          className="block h-auto w-full shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          draggable={false}
        />
      </div>
    </div>
  );
}

function DynamicSlider({ heading, images }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const loopWidthRef = useRef(0);
  const directionRef = useRef(-1);
  const cardWidthRef = useRef(0);
  const isHoveringRef = useRef(false);
  const isNudgingRef = useRef(false);

  const [metrics, setMetrics] = useState({ cardWidth: 0, visibleCount: 4 });
  const [direction, setDirection] = useState(-1);
  const [lightboxImage, setLightboxImage] = useState(null);

  const baseSlides = normalizeSlides(images);
  const loopSlides = [...baseSlides, ...baseSlides];

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

    const loopWidth = baseSlides.length * (metrics.cardWidth + GAP_PX);
    loopWidthRef.current = loopWidth;

    gsap.set(track, { x: 0, force3D: true });
    startMarquee();

    return () => {
      tweenRef.current?.kill();
    };
  }, [metrics.cardWidth, baseSlides.length, startMarquee]);

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

  const openLightbox = (slide) => {
    if (!slide?.fullSrc && !slide?.src) return;
    setLightboxImage(slide);
    pauseMarquee();
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    resumeMarquee();
  };

  const cardHeight =
    metrics.cardWidth > 0 ? Math.round(metrics.cardWidth * (510 / 408)) : 510;

  return (
    <section className="relative flex w-full flex-col gap-8 bg-[#ffffff] py-12 pb-4">
      <div className="flex w-full items-center justify-center text-center">
        <h3 className="text-[25px] font-[500]">{heading}</h3>
      </div>

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
            <button
              key={`${slide.label}-${index}`}
              type="button"
              onClick={() => openLightbox(slide)}
              className="relative shrink-0 cursor-pointer overflow-hidden border-0 bg-[#EFEDE8] p-0 text-left [backface-visibility:hidden] [transform:translateZ(0)]"
              style={{
                width: metrics.cardWidth || "100%",
                height: cardHeight,
              }}
              aria-label={`View ${slide.label}`}
            >
              <img
                src={slide.src}
                alt={slide.label}
                className="pointer-events-none h-full w-full select-none object-cover"
                draggable={false}
                loading={index < 5 ? "eager" : "lazy"}
              />
            </button>
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

      <ScrollableImageLightbox image={lightboxImage} onClose={closeLightbox} />
    </section>
  );
}

export default DynamicSlider;
