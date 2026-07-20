"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import gsap from "gsap";

const BRAND_FILM_SLIDES = [
  {
    src: "https://otherassets.blob.core.windows.net/rmw/VVIP%20GROUP%20EK%20BAAR%20PHIR-1.mp4",
    alt: "Brand film 1",
    video:"https://otherassets.blob.core.windows.net/rmw/VVIP%20GROUP%20EK%20BAAR%20PHIR-1.mp4",
    title: "REFINED ELEGANCE",
    description:
      "Crafted with a luxurious visual language, this brand film celebrates elegance as an attitude rather than a moment. Through cinematic storytelling and refined aesthetics, it captures the spirit of those who lead with confidence.",
    cta: { label: "Get In Touch", href: "/contact" },
  },
  {
    src: "https://otherassets.blob.core.windows.net/rmw/VVIP_Music%20option%202.mp4",
    alt: "Brand film 2",
    video: "https://otherassets.blob.core.windows.net/rmw/VVIP_Music%20option%202.mp4",
    title: "ARTFUL ASPIRATIONS",
    description:
      "A visually poetic brand film that transforms art into aspiration through symbolic storytelling and seamless visual transitions. Every frame is crafted to evoke wonder while reflecting the timeless elegance of the VVIP brand.",
    cta: { label: "Start A Project", href: "/contact" },
  },
  {
    src: "https://otherassets.blob.core.windows.net/rmw/document_6152301752554102660.mp4",
    alt: "Brand film 3",
    video:
      "https://otherassets.blob.core.windows.net/rmw/document_6152301752554102660.mp4",
    title: "CREATIVE ECOSYSTEM",
    description:
      "A visually compelling brand film that showcases the creative thinking, strategic expertise, and integrated services that define Ritz Media World. Every frame reflects our commitment to crafting extraordinary brand experiences.",
    cta: { label: "View Our Work", href: "/case-study" },
  },
  {
    src: "https://otherassets.blob.core.windows.net/rmw/document_6260379940223459024.mp4",
    alt: "Brand film 4",
    video:
      "https://otherassets.blob.core.windows.net/rmw/document_6260379940223459024.mp4",
    title: "NEW BEGINNINGS",
    description:
      "A cinematic brand film crafted to capture the emotion of new beginnings. Through compelling storytelling, refined visuals and authentic performances, the film brings the VVIP brand to life with elegance and emotional depth.",
    cta: { label: "Get In Touch", href: "/contact" },
  },
  {
    src: "https://otherassets.blob.core.windows.net/rmw/IMG_1242.MP4",
    alt: "Brand film 5",
    video: "https://otherassets.blob.core.windows.net/rmw/IMG_1242.MP4",
    title: "SUSTAINABLE LIVING",
    description:
      "A cinematic brand film that captures the harmony between nature, mindful living, and modern aspirations. Through evocative storytelling and immersive visuals, the film presents a vision of the future where life unfolds in perfect balance.",
    cta: { label: "Start A Project", href: "/contact" },
  },
  {
    src: "https://otherassets.blob.core.windows.net/rmw/Northwind_4.mp4",
    alt: "Brand film 6",
    video: "https://otherassets.blob.core.windows.net/rmw/Northwind_4.mp4",
    title: "WHERE TWO WORLDS MEET",
    description:
      "A cinematic brand film that brings the timeless essence of Switzerland closer through evocative storytelling and breathtaking visuals. Blending culture, craftsmanship and nature, the film creates an immersive narrative that celebrates a shared spirit beyond borders.",
    cta: { label: "View Our Work", href: "/case-study" },
  },
];

const AUTOPLAY_DELAY = 5200;
const SLIDE_DURATION = 1.2;
const SLIDE_EASE = "sine.inOut";
const GAP_PX = 24;

// How many cards are visible at once, per breakpoint
const getVisibleCount = (width) => {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
};

function PlayGlyph({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function BrandFilmModal({
  slide,
  onClose,
  backdropRef,
  panelRef,
  videoRef,
  index = 0,
  total = 1,
}) {
  if (!slide) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-4 md:p-6 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brand-film-modal-title"
    >
      <div
        ref={backdropRef}
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(13,111,170,0.18)_0%,_rgba(5,20,32,0.88)_55%,_rgba(3,10,16,0.94)_100%)] backdrop-blur-[10px]"
      />

      <div
        ref={panelRef}
        className="relative z-10 flex w-full max-w-[1180px] max-h-[94vh] flex-col overflow-hidden rounded-t-[22px] border border-white/10 bg-[#071018] shadow-[0_40px_100px_-24px_rgba(0,0,0,0.7),0_0_0_1px_rgba(13,111,170,0.12)] sm:rounded-[22px] lg:max-h-[min(90vh,760px)] lg:flex-row"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#0D6FAA]/20 blur-[90px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-[#0D6FAA]/12 blur-[80px]"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/85 backdrop-blur-md transition hover:border-white/35 hover:bg-black/65 hover:text-white sm:right-4 sm:top-4 sm:h-11 sm:w-11"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="relative flex w-full shrink-0 items-center justify-center bg-[#03080d] lg:w-[62%] lg:min-h-0">
          <div className="pointer-events-none absolute inset-0 z-[1] ring-1 ring-inset ring-white/10" />
          <div className="relative w-full aspect-[1920/1080]">
            <video
              ref={videoRef}
              src={slide.video}
              className="h-full w-full object-contain bg-black"
              playsInline
              controls
              controlsList="nodownload"
            />
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-center gap-5 overflow-y-auto px-6 pb-7 pt-6 sm:px-8 sm:pb-9 sm:pt-8 lg:px-10 lg:py-12">
          <div data-modal-reveal className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-[#0D6FAA]/35 bg-[#0D6FAA]/12 px-3 py-1 font-league-spartan text-[11px] font-[600] uppercase tracking-[0.22em] text-[#7ec4e8]">
              Brand Film
            </span>
            <span className="font-league-spartan text-[12px] tracking-[0.2em] text-white/35">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <div data-modal-reveal>
            <h3
              id="brand-film-modal-title"
              className="pr-10 font-league-spartan text-[32px] font-[700] capitalize leading-[1.1] text-white max-md:text-[26px] max-sm:text-[22px]"
            >
              {slide.title}
            </h3>
            <span
              aria-hidden
              className="mt-4 block h-[2px] w-12 origin-left bg-gradient-to-r from-[#0D6FAA] to-[#0D6FAA]/20"
            />
          </div>

          <p
            data-modal-reveal
            className="max-w-[38ch] font-montserrat text-[15px] leading-[1.75] text-white/65 max-sm:text-[14px]"
          >
            {slide.description}
          </p>

          <div data-modal-reveal className="pt-1">
            <Link
              href={slide.cta.href}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#0D6FAA] py-2.5 pl-6 pr-2.5 shadow-[0_10px_30px_rgba(13,111,170,0.4)] transition-shadow hover:shadow-[0_14px_36px_rgba(13,111,170,0.55)] max-sm:py-2 max-sm:pl-5"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 rounded-full bg-[#1490d4] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />
              <span className="relative z-10 font-league-spartan text-[13px] font-medium uppercase tracking-[0.08em] text-white max-sm:text-[12px]">
                {slide.cta.label}
              </span>
              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0D6FAA] transition-transform duration-300 group-hover:rotate-45 max-sm:h-8 max-sm:w-8">
                <i
                  className="ri-arrow-right-up-line text-[15px] max-sm:text-[14px]"
                  aria-hidden
                />
              </span>
            </Link>
          </div>

          <p
            data-modal-reveal
            className="mt-auto hidden pt-6 font-league-spartan text-[11px] uppercase tracking-[0.18em] text-white/25 lg:block"
          >
            Press Esc to close
          </p>
        </div>
      </div>
    </div>
  );
}

function NewSection2() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const previewVideoRefs = useRef([]);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const modalVideoRef = useRef(null);
  const closingRef = useRef(false);
  const activeIndexRef = useRef(0);
  const autoplayTimerRef = useRef(null);
  const loaderFillRef = useRef(null);
  const prevCardWidthRef = useRef(0);

  const slideCount = BRAND_FILM_SLIDES.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [metrics, setMetrics] = useState({ cardWidth: 0, visibleCount: 3 });

  const maxIndex = Math.max(0, slideCount - metrics.visibleCount);

  const clearAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      window.clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const syncMetrics = useCallback(() => {

    const width = containerRef.current?.clientWidth || 0;
    const visibleCount = getVisibleCount(window.innerWidth);
    // Floor widths so card steps land on whole pixels (kills subpixel shimmer)
    const cardWidth =
      visibleCount > 0
        ? Math.floor((width - GAP_PX * (visibleCount - 1)) / visibleCount)
        : Math.floor(width);
    setMetrics({ cardWidth, visibleCount });
    return { cardWidth, visibleCount };
  }, []);

  const pauseAllPreviews = useCallback(() => {
    previewVideoRefs.current.forEach((video) => {
      if (!video) return;
      video.pause();
    });
  }, []);

  const syncPreviewPlayback = useCallback(
    (index = activeIndexRef.current) => {
      if (modalIndex !== null) {
        pauseAllPreviews();
        return;
      }

      previewVideoRefs.current.forEach((video, i) => {
        if (!video) return;
        const inView =
          i >= index && i < index + metrics.visibleCount;
        if (inView) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    [metrics.visibleCount, modalIndex, pauseAllPreviews]
  );

  const goTo = useCallback(
    (targetIndex) => {
      const clamped = Math.min(Math.max(targetIndex, 0), maxIndex);
      activeIndexRef.current = clamped;
      setActiveIndex(clamped);
    },
    [maxIndex]
  );

  const scheduleAutoplay = useCallback(() => {
    clearAutoplay();
    if (modalIndex !== null) return;

    autoplayTimerRef.current = window.setTimeout(() => {
      const current = activeIndexRef.current;
      const next = current >= maxIndex ? 0 : current + 1;
      goTo(next);
    }, AUTOPLAY_DELAY);
  }, [clearAutoplay, goTo, maxIndex, modalIndex]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    syncMetrics();
    const onResize = () => {
      syncMetrics();
      goTo(activeIndexRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncMetrics]);

  useEffect(() => {
    scheduleAutoplay();
    return () => clearAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, modalIndex, maxIndex]);

  // Smooth GSAP track slide - pause videos while moving to avoid decode jank
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || metrics.cardWidth <= 0) return;

    const step = metrics.cardWidth + GAP_PX;
    const x = -Math.round(activeIndex * step);
    const widthChanged = prevCardWidthRef.current !== metrics.cardWidth;
    prevCardWidthRef.current = metrics.cardWidth;

    if (widthChanged) {
      gsap.killTweensOf(track);
      gsap.set(track, { x, force3D: true });
      syncPreviewPlayback(activeIndex);
      return;
    }

    pauseAllPreviews();

    gsap.to(track, {
      x,
      duration: SLIDE_DURATION,
      ease: SLIDE_EASE,
      overwrite: "auto",
      force3D: true,
      // Keep transforms on integer pixels every frame
      modifiers: {
        x: (v) => `${Math.round(parseFloat(v))}px`,
      },
      onComplete: () => {
        syncPreviewPlayback(activeIndex);
      },
    });
  }, [
    activeIndex,
    metrics.cardWidth,
    pauseAllPreviews,
    syncPreviewPlayback,
  ]);

  // Bottle-fill loader tracks carousel progress
  useEffect(() => {
    const fill = loaderFillRef.current;
    if (!fill) return;

    const progress = maxIndex <= 0 ? 1 : activeIndex / maxIndex;
    gsap.to(fill, {
      scaleX: progress,
      duration: SLIDE_DURATION,
      ease: SLIDE_EASE,
      overwrite: "auto",
    });
  }, [activeIndex, maxIndex]);

  // Pause all previews while the modal is open; resume when it closes
  useEffect(() => {
    if (modalIndex !== null) {
      pauseAllPreviews();
      return;
    }
    syncPreviewPlayback(activeIndexRef.current);
  }, [modalIndex, pauseAllPreviews, syncPreviewPlayback]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-creatives-header]", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from("[data-brand-stage]", {
        opacity: 0,
        y: 36,
        duration: 1,
        delay: 0.12,
        ease: "power4.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openModal = useCallback(
    (index) => {
      clearAutoplay();
      setModalIndex(index);
    },
    [clearAutoplay]
  );

  const closeModal = useCallback(() => {
    if (modalIndex === null || closingRef.current) return;
    closingRef.current = true;

    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    const video = modalVideoRef.current;

    video?.pause();

    const finish = () => {
      closingRef.current = false;
      setModalIndex(null);
      document.body.style.overflow = "";
      if (video) video.currentTime = 0;
    };

    if (!panel || !backdrop) {
      finish();
      return;
    }

    gsap
      .timeline({ onComplete: finish })
      .to(panel, {
        opacity: 0,
        y: 28,
        scale: 0.98,
        duration: 0.35,
        ease: "power2.in",
      })
      .to(backdrop, { opacity: 0, duration: 0.3, ease: "power2.in" }, "<");
  }, [modalIndex]);

  useEffect(() => {
    if (modalIndex === null) return;

    document.body.style.overflow = "hidden";

    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    const contentItems = panel?.querySelectorAll("[data-modal-reveal]");
    const video = modalVideoRef.current;

    if (backdrop && panel) {
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(panel, { opacity: 0, y: 40, scale: 0.97 });
      gsap.set(contentItems, { opacity: 0, y: 18 });

      gsap
        .timeline()
        .to(backdrop, { opacity: 1, duration: 0.45, ease: "power2.out" })
        .to(
          panel,
          { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" },
          "-=0.24"
        )
        .to(
          contentItems,
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power3.out" },
          "-=0.28"
        );
    }

    if (video) {
      video.src = BRAND_FILM_SLIDES[modalIndex].video;
      video.load();
      video.play().catch(() => {});
    }

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [modalIndex, closeModal]);

  const magnetize = (e, ref) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: relX * 0.3,
      y: relY * 0.3,
      scale: 1.08,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const resetMagnet = (ref) => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.45)",
    });
  };

  const activeSlide = modalIndex !== null ? BRAND_FILM_SLIDES[modalIndex] : null;
  const isAtStart = activeIndex <= 0;
  const isAtEnd = activeIndex >= maxIndex;

  // Bottle fill: empty at start → full black at the last slide position
  const loaderProgress =
    maxIndex <= 0 ? 100 : (activeIndex / maxIndex) * 100;

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full flex justify-center items-center mb-[45px] max-xl:mb-[40px] max-md:mb-[36px] max-sm:mb-[28px]"
      >
        <div className="w-full max-w-[1340px] flex flex-col  gap-[36px] max-md:gap-[28px] max-xl:px-6 max-md:px-4">
          <div
            data-creatives-header
            className="w-full  border-b-2 border-[#E8E8E8] pb-[18px]"
          >
            <h2 className="font-league-spartan font-[700] text-[48px] capitalize max-xl:text-[40px] max-lg:text-[34px] max-md:text-[28px] max-sm:text-[24px]">
              Brand Films
            </h2>
          </div>

          <div data-brand-stage className="relative w-full">
            <div
              ref={containerRef}
              className="relative w-full overflow-hidden [transform:translateZ(0)]"
            >
              <div
                ref={trackRef}
                className="flex will-change-transform [backface-visibility:hidden]"
                style={{ gap: `${GAP_PX}px` }}
              >
                {BRAND_FILM_SLIDES.map((slide, index) => (
                  <div
                    key={`${slide.src}-${index}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${slide.title}`}
                    onClick={() => openModal(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openModal(index);
                      }
                    }}
                    className="group relative shrink-0 cursor-pointer overflow-hidden rounded-[6px] bg-[#0a0a0a] [backface-visibility:hidden] [transform:translateZ(0)]"
                    style={{
                      width: metrics.cardWidth || "100%",
                      aspectRatio: "11 / 10",
                    }}
                  >
                    <video
                      ref={(el) => {
                        previewVideoRefs.current[index] = el;
                      }}
                      src={slide.src}
                      className="pointer-events-none h-full w-full object-cover [transform:translateZ(0)]"
                      muted
                      loop
                      playsInline
                      preload={index < 3 ? "auto" : "metadata"}
                      aria-label={slide.alt}
                    />

                    <div
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25"
                    >
                      <span className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-white/90 text-[#0D6FAA] opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                        <PlayGlyph className="ml-0.5 h-5 w-5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottle-fill loader - fills as the strip advances, solid black at 100% */}
            <div
              className="relative mt-8 h-[2px] w-full overflow-hidden rounded-full bg-[#E8E8E8] max-md:mt-6"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(loaderProgress)}
              aria-label="Carousel progress"
            >
              <div
                ref={loaderFillRef}
                aria-hidden
                className="absolute inset-y-0 left-0 h-full w-full origin-left rounded-full bg-black"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            {/* Controls row */}
            <div className="mt-5 flex items-center justify-between max-md:mt-4">
              <div className="flex items-center gap-3">
                <button
                  ref={prevBtnRef}
                  type="button"
                  aria-label="Previous brand films"
                  disabled={isAtStart}
                  onClick={() => goTo(activeIndex - 1)}
                  onMouseMove={(e) => !isAtStart && magnetize(e, prevBtnRef)}
                  onMouseLeave={() => resetMagnet(prevBtnRef)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D9D9D9] text-[#111] transition-colors hover:bg-[#111] hover:text-white disabled:pointer-events-none disabled:opacity-30 max-md:h-9 max-md:w-9"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    className="h-5 w-5 max-md:h-4 max-md:w-4"
                    aria-hidden="true"
                  >
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <button
                  ref={nextBtnRef}
                  type="button"
                  aria-label="Next brand films"
                  disabled={isAtEnd}
                  onClick={() => goTo(activeIndex + 1)}
                  onMouseMove={(e) => !isAtEnd && magnetize(e, nextBtnRef)}
                  onMouseLeave={() => resetMagnet(nextBtnRef)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D9D9D9] text-[#111] transition-colors hover:bg-[#111] hover:text-white disabled:pointer-events-none disabled:opacity-30 max-md:h-9 max-md:w-9"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    className="h-5 w-5 max-md:h-4 max-md:w-4"
                    aria-hidden="true"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>

              <Link
                href="/case-study"
                className="flex cursor-pointer items-center gap-2 rounded-full bg-white py-2.5 pl-5 pr-2 shadow-[0_6px_24px_rgba(0,0,0,0.22)] md:gap-2.5 md:py-2 md:pl-6 md:pr-2"
              >
                <span className="font-league-spartan text-[12px] font-medium uppercase tracking-[0.08em] text-[#1D1D1B] md:text-[14px]">
                  Discover All
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1D1B] text-white md:h-9 md:w-9">
                  <i className="ri-arrow-right-up-line text-[14px] md:text-[16px]" aria-hidden />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {mounted &&
        modalIndex !== null &&
        createPortal(
          <BrandFilmModal
            slide={activeSlide}
            onClose={closeModal}
            backdropRef={backdropRef}
            panelRef={panelRef}
            videoRef={modalVideoRef}
            index={modalIndex}
            total={BRAND_FILM_SLIDES.length}
          />,
          document.body
        )}
    </>
  );
}

export default NewSection2;