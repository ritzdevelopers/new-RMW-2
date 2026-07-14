"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import gsap from "gsap";

const BRAND_FILM_SLIDES = [
  {
    src: "https://otherassets.blob.core.windows.net/rmw/VVIP%20GROUP%20EK%20BAAR%20PHIR-1.mp4",
    alt: "Brand film 1",
    video:
      "https://otherassets.blob.core.windows.net/rmw/VVIP%20GROUP%20EK%20BAAR%20PHIR-1.mp4",
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

const AUTOPLAY_DELAY = 5000;
const ASPECT = 1920 / 1080;

const DESKTOP_METRICS = {
  CARD_W: 980,
  SIDE_X: 320,
  SIDE_Z: -160,
};

const getCarouselMetrics = (containerWidth) => {
  const available = Math.max(containerWidth || DESKTOP_METRICS.CARD_W, 280);
  const cardW = Math.min(DESKTOP_METRICS.CARD_W, available);
  const scale = cardW / DESKTOP_METRICS.CARD_W;

  return {
    CARD_W: cardW,
    CARD_H: Math.round(cardW / ASPECT),
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

const getCardState = (offset, metrics) => {
  if (offset === 0) {
    return {
      x: 0,
      z: 0,
      rotateY: 0,
      opacity: 1,
      zIndex: 30,
      filter: "brightness(1)",
    };
  }

  if (offset === -1) {
    return {
      x: -metrics.SIDE_X,
      z: metrics.SIDE_Z,
      rotateY: 22,
      opacity: 0.7,
      zIndex: 20,
      filter: "brightness(0.72)",
    };
  }

  if (offset === 1) {
    return {
      x: metrics.SIDE_X,
      z: metrics.SIDE_Z,
      rotateY: -22,
      opacity: 0.7,
      zIndex: 20,
      filter: "brightness(0.72)",
    };
  }

  return {
    x: offset < 0 ? -metrics.SIDE_X * 1.55 : metrics.SIDE_X * 1.55,
    z: metrics.SIDE_Z * 1.8,
    rotateY: offset < 0 ? 28 : -28,
    opacity: 0,
    zIndex: 10,
    filter: "brightness(0.5)",
  };
};

function PlayButton({ onClick, playBtnRef }) {
  return (
    <div
      ref={playBtnRef}
      className="pointer-events-none absolute inset-0 z-[35] flex items-center justify-center"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        aria-label="Play brand film"
        className="pointer-events-auto relative flex items-center justify-center"
        data-play-btn
      >
        <span
          data-play-pulse
          className="pointer-events-none absolute h-[100px] w-[100px] rounded-full border-2 border-[#0D6FAA]/50 max-md:h-[84px] max-md:w-[84px] max-sm:h-[72px] max-sm:w-[72px]"
          aria-hidden
        />
        <span
          data-play-pulse
          className="pointer-events-none absolute h-[82px] w-[82px] rounded-full border border-white/40 max-md:h-[68px] max-md:w-[68px] max-sm:h-[58px] max-sm:w-[58px]"
          aria-hidden
        />
        <span
          data-play-core
          className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#0D6FAA] text-white shadow-[0_12px_40px_rgba(13,111,170,0.45)] ring-4 ring-white/25 transition-transform hover:scale-105 max-md:h-[60px] max-md:w-[60px] max-sm:h-[52px] max-sm:w-[52px]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-1 h-8 w-8 max-md:h-7 max-md:w-7 max-sm:h-6 max-sm:w-6"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>
    </div>
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
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const previewVideoRefs = useRef([]);
  const progressRef = useRef(null);
  const progressTweenRef = useRef(null);
  const playBtnRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const videoRef = useRef(null);
  const closingRef = useRef(false);
  const animatingRef = useRef(false);
  const activeIndexRef = useRef(0);
  const metricsRef = useRef(getCarouselMetrics(DESKTOP_METRICS.CARD_W));
  const autoplayTimerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [stageHeight, setStageHeight] = useState(
    Math.round(DESKTOP_METRICS.CARD_W / ASPECT)
  );

  const slideCount = BRAND_FILM_SLIDES.length;

  const syncMetrics = useCallback(() => {
    const width = stageRef.current?.clientWidth || DESKTOP_METRICS.CARD_W;
    const metrics = getCarouselMetrics(width);
    metricsRef.current = metrics;
    setStageHeight(metrics.CARD_H);
    return metrics;
  }, []);

  const clearAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      window.clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const runProgress = useCallback(() => {
    progressTweenRef.current?.kill();
    if (!progressRef.current) return;
    gsap.set(progressRef.current, { scaleX: 0 });
    progressTweenRef.current = gsap.to(progressRef.current, {
      scaleX: 1,
      duration: AUTOPLAY_DELAY / 1000,
      ease: "none",
    });
  }, []);

  const applyLayout = useCallback(
    (nextIndex, immediate = false) => {
      const duration = immediate ? 0 : 0.95;
      const metrics = metricsRef.current;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const offset = getRelativeOffset(i, nextIndex, slideCount);
        const state = getCardState(offset, metrics);

        gsap.to(card, {
          x: state.x,
          z: state.z,
          rotateY: state.rotateY,
          opacity: state.opacity,
          zIndex: state.zIndex,
          filter: state.filter,
          width: metrics.CARD_W,
          height: metrics.CARD_H,
          duration,
          ease: "power4.inOut",
        });
      });

      if (!immediate) {
        gsap.delayedCall(duration, () => {
          animatingRef.current = false;
        });
      } else {
        animatingRef.current = false;
      }
    },
    [slideCount]
  );

  const scheduleAutoplay = useCallback(() => {
    clearAutoplay();
    if (modalIndex !== null) return;

    runProgress();
    autoplayTimerRef.current = window.setTimeout(() => {
      const next = (activeIndexRef.current + 1) % slideCount;
      animatingRef.current = true;
      activeIndexRef.current = next;
      setActiveIndex(next);
      applyLayout(next);
      scheduleAutoplay();
    }, AUTOPLAY_DELAY);
  }, [applyLayout, clearAutoplay, modalIndex, runProgress, slideCount]);

  const goTo = useCallback(
    (targetIndex, { immediate = false } = {}) => {
      if (!slideCount || animatingRef.current) return;

      const nextIndex = ((targetIndex % slideCount) + slideCount) % slideCount;
      if (nextIndex === activeIndexRef.current && !immediate) return;

      animatingRef.current = !immediate;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      applyLayout(nextIndex, immediate);
      if (!immediate) scheduleAutoplay();
    },
    [applyLayout, scheduleAutoplay, slideCount]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    previewVideoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (modalIndex !== null || index !== activeIndex) {
        video.pause();
        return;
      }
      video.play().catch(() => {});
    });
  }, [activeIndex, modalIndex]);

  useLayoutEffect(() => {
    const metrics = syncMetrics();

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const state = getCardState(
        getRelativeOffset(i, activeIndexRef.current, slideCount),
        metrics
      );
      gsap.set(card, {
        xPercent: -50,
        left: "50%",
        top: "50%",
        yPercent: -50,
        x: state.x,
        z: state.z,
        rotateY: state.rotateY,
        opacity: state.opacity,
        zIndex: state.zIndex,
        filter: state.filter,
        width: metrics.CARD_W,
        height: metrics.CARD_H,
        transformOrigin: "center center",
        transformPerspective: 1400,
      });
    });

    requestAnimationFrame(() => {
      goTo(activeIndexRef.current, { immediate: true });
      scheduleAutoplay();
    });

    const onResize = () => {
      syncMetrics();
      goTo(activeIndexRef.current, { immediate: true });
      scheduleAutoplay();
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearAutoplay();
      progressTweenRef.current?.kill();
    };
  }, [clearAutoplay, goTo, scheduleAutoplay, slideCount, syncMetrics]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

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
        scale: 0.97,
        duration: 1,
        delay: 0.12,
        ease: "power4.out",
      });

      const playRoot = playBtnRef.current;
      if (!prefersReducedMotion && playRoot) {
        gsap.to(playRoot.querySelectorAll("[data-play-pulse]"), {
          scale: 1.4,
          opacity: 0,
          duration: 1.4,
          repeat: -1,
          ease: "power2.out",
          stagger: 0.22,
        });
        const core = playRoot.querySelector("[data-play-core]");
        if (core) {
          gsap.to(core, {
            scale: 1.06,
            duration: 0.9,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openModal = useCallback(
    (index) => {
      clearAutoplay();
      progressTweenRef.current?.pause();
      setModalIndex(index);
    },
    [clearAutoplay]
  );

  const closeModal = useCallback(() => {
    if (modalIndex === null || closingRef.current) return;
    closingRef.current = true;

    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    const video = videoRef.current;

    video?.pause();

    gsap
      .timeline({
        onComplete: () => {
          closingRef.current = false;
          setModalIndex(null);
          document.body.style.overflow = "";
          if (video) video.currentTime = 0;
          scheduleAutoplay();
        },
      })
      .to(panel, {
        opacity: 0,
        y: 28,
        scale: 0.98,
        duration: 0.35,
        ease: "power2.in",
      })
      .to(backdrop, { opacity: 0, duration: 0.3, ease: "power2.in" }, "<");

    if (!panel || !backdrop) {
      closingRef.current = false;
      setModalIndex(null);
      document.body.style.overflow = "";
      scheduleAutoplay();
    }
  }, [modalIndex, scheduleAutoplay]);

  useEffect(() => {
    if (modalIndex === null) return;

    document.body.style.overflow = "hidden";

    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    const contentItems = panel?.querySelectorAll("[data-modal-reveal]");
    const video = videoRef.current;

    if (backdrop && panel) {
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(panel, { opacity: 0, y: 40, scale: 0.97 });
      gsap.set(contentItems, { opacity: 0, y: 18 });

      gsap
        .timeline()
        .to(backdrop, { opacity: 1, duration: 0.45, ease: "power2.out" })
        .to(
          panel,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.24"
        )
        .to(
          contentItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.07,
            ease: "power3.out",
          },
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
      x: relX * 0.35,
      y: relY * 0.35,
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

  const activeSlide =
    modalIndex !== null ? BRAND_FILM_SLIDES[modalIndex] : null;

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full flex justify-center items-center mb-[45px] max-xl:mb-[40px] max-md:mb-[36px] max-sm:mb-[28px]"
      >
        <div className="w-full max-w-[1340px] flex flex-col gap-[43px] max-xl:gap-[36px] max-md:gap-[28px] max-xl:px-6 max-md:px-4">
          <div
            data-creatives-header
            className="w-full pb-[33px] border-b-2 border-[#E8E8E8] max-md:pb-[28px] flex items-end justify-between gap-4"
          >
            <h2 className="font-league-spartan font-[700] text-[48px] capitalize max-xl:text-[40px] max-lg:text-[34px] max-md:text-[28px] max-sm:text-[24px]">
              Brand Films
            </h2>

            <div className="flex items-center gap-4 max-sm:hidden">
              <span className="font-league-spartan text-[14px] tracking-[0.25em] uppercase text-[#0D6FAA]/60">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(BRAND_FILM_SLIDES.length).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-2">
                {BRAND_FILM_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to brand film ${i + 1}`}
                    onClick={() => goTo(i)}
                    className="h-[6px] rounded-full transition-all duration-300 ease-out"
                    style={{
                      width: activeIndex === i ? 22 : 8,
                      backgroundColor:
                        activeIndex === i
                          ? "#0D6FAA"
                          : "rgba(13,111,170,0.25)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            data-brand-stage
            className="relative w-full group/brand-films"
          >
            <div
              ref={stageRef}
              className="relative w-full overflow-hidden md:overflow-visible"
              style={{
                perspective: "1400px",
                perspectiveOrigin: "50% 50%",
                height: stageHeight,
              }}
            >
              {BRAND_FILM_SLIDES.map((slide, index) => (
                <div
                  key={`${slide.src}-${index}`}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={slide.alt}
                  onClick={() => {
                    if (index === activeIndexRef.current) {
                      openModal(index);
                    } else {
                      goTo(index);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (index === activeIndexRef.current) openModal(index);
                      else goTo(index);
                    }
                  }}
                  className="absolute cursor-pointer overflow-hidden rounded-[6px] bg-[#0a0a0a] shadow-[0_35px_70px_-20px_rgba(13,111,170,0.45)] will-change-transform"
                  style={{
                    width: metricsRef.current.CARD_W,
                    height: metricsRef.current.CARD_H,
                    transformStyle: "preserve-3d",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden">
                    <video
                      ref={(el) => {
                        previewVideoRefs.current[index] = el;
                      }}
                      src={slide.src}
                      className="h-full w-full object-contain bg-black pointer-events-none"
                      muted
                      loop
                      playsInline
                      preload={index === 0 ? "auto" : "metadata"}
                      aria-label={slide.alt}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  </div>
                </div>
              ))}

              <PlayButton
                playBtnRef={playBtnRef}
                onClick={() => openModal(activeIndex)}
              />
            </div>

            <div className="pointer-events-none absolute -bottom-[16px] left-0 right-0 h-[3px] rounded-full bg-[#0D6FAA]/15 overflow-hidden max-md:-bottom-[12px]">
              <div
                ref={progressRef}
                className="h-full w-full origin-left bg-[#0D6FAA]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            <button
              ref={prevBtnRef}
              type="button"
              aria-label="Previous brand film"
              onClick={() => goTo(activeIndexRef.current - 1)}
              onMouseMove={(e) => magnetize(e, prevBtnRef)}
              onMouseLeave={() => resetMagnet(prevBtnRef)}
              className="absolute left-3 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 max-xl:left-2 max-xl:h-10 max-xl:w-10 max-md:left-2 max-md:h-9 max-md:w-9 max-sm:left-1.5 max-sm:h-8 max-sm:w-8"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 max-md:h-4 max-md:w-4"
                aria-hidden="true"
              >
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>

            <button
              ref={nextBtnRef}
              type="button"
              aria-label="Next brand film"
              onClick={() => goTo(activeIndexRef.current + 1)}
              onMouseMove={(e) => magnetize(e, nextBtnRef)}
              onMouseLeave={() => resetMagnet(nextBtnRef)}
              className="absolute right-3 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 max-xl:right-2 max-xl:h-10 max-xl:w-10 max-md:right-2 max-md:h-9 max-md:w-9 max-sm:right-1.5 max-sm:h-8 max-sm:w-8"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 max-md:h-4 max-md:w-4"
                aria-hidden="true"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
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
            videoRef={videoRef}
            index={modalIndex}
            total={BRAND_FILM_SLIDES.length}
          />,
          document.body
        )}
    </>
  );
}

export default NewSection2;
