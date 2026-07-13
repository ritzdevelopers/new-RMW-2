"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectCube, Navigation } from "swiper/modules";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/navigation";

const PLACEHOLDER_VIDEO =
  "https://otherassets.blob.core.windows.net/rmw/home-website.mp4";

const BRAND_FILM_SLIDES = [
  {
    src: "/work/creatives/s2/video.jpg",
    alt: "Brand film 1",
    video: PLACEHOLDER_VIDEO,
    title: "Architectural Storytelling",
    description:
      "A cinematic brand film that transforms real estate vision into emotion — blending aerial perspectives, lifestyle narratives, and premium finishing for maximum impact.",
    cta: { label: "Get In Touch", href: "/contact" },
  },
  {
    src: "/work/creatives/s2/i1.jpg",
    alt: "Brand film 2",
    video: PLACEHOLDER_VIDEO,
    title: "Luxury Living Experience",
    description:
      "Showcase aspirational living through motion, light, and detail. We craft films that help audiences feel the space before they step inside.",
    cta: { label: "Start A Project", href: "/contact" },
  },
  {
    src: "/work/creatives/s2/i2.jpg",
    alt: "Brand film 3",
    video: PLACEHOLDER_VIDEO,
    title: "Urban Development Story",
    description:
      "From blueprint to skyline — dynamic storytelling for large-scale developments that communicates scale, trust, and long-term value.",
    cta: { label: "View Our Work", href: "/case-study" },
  },
  {
    src: "/work/creatives/s2/i3.jpg",
    alt: "Brand film 4",
    video: PLACEHOLDER_VIDEO,
    title: "Heritage Reimagined",
    description:
      "Heritage properties deserve films with soul. We balance tradition and modernity in every frame to elevate brand perception.",
    cta: { label: "Get In Touch", href: "/contact" },
  },
];

const AUTOPLAY_DELAY = 5000;

function PlayButton({ onClick, playBtnRef }) {
  return (
    <div
      ref={playBtnRef}
      className="pointer-events-none absolute inset-0 z-[25] flex items-center justify-center"
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

function BrandFilmModal({ slide, onClose, backdropRef, panelRef, videoRef }) {
  if (!slide) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brand-film-modal-title"
    >
      <div
        ref={backdropRef}
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-[#0b1520]/75 backdrop-blur-[6px]"
      />

      <div
        ref={panelRef}
        className="relative z-10 flex w-full max-w-[1120px] max-h-[94vh] flex-col overflow-hidden rounded-t-[18px] bg-white shadow-[0_32px_80px_-20px_rgba(0,0,0,0.45)] sm:rounded-[18px] lg:max-h-[min(88vh,720px)] lg:flex-row"
      >
        <div className="relative w-full shrink-0 bg-[#0a1620] lg:w-[58%]">
          <div className="aspect-[1920/1080] w-full lg:absolute lg:inset-0 lg:aspect-auto">
            <video
              ref={videoRef}
              src={slide.video}
              className="h-full w-full object-cover"
              playsInline
              controls
            />
          </div>
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent to-[#0a1620]/20 lg:block" />
        </div>

        <div className="relative flex flex-1 flex-col justify-center gap-5 overflow-y-auto p-6 sm:p-8 lg:p-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-[#333] transition hover:border-[#0D6FAA] hover:text-[#0D6FAA] sm:right-5 sm:top-5"
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

          <div data-modal-reveal>
            <p className="font-league-spartan text-[12px] font-[600] uppercase tracking-[0.28em] text-[#0D6FAA]">
              Brand Film
            </p>
          </div>

          <h3
            id="brand-film-modal-title"
            data-modal-reveal
            className="pr-10 font-league-spartan text-[30px] font-[700] capitalize leading-[1.12] text-[#111111] max-md:text-[26px] max-sm:text-[22px]"
          >
            {slide.title}
          </h3>

          <p
            data-modal-reveal
            className="font-montserrat text-[15px] leading-[1.7] text-[#555555] max-sm:text-[14px]"
          >
            {slide.description}
          </p>

          <div data-modal-reveal className="pt-2">
            <Link
              href={slide.cta.href}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#0D6FAA] py-2.5 pl-6 pr-2.5 shadow-[0_8px_24px_rgba(13,111,170,0.32)] transition-shadow hover:shadow-[0_12px_28px_rgba(13,111,170,0.42)] max-sm:py-2 max-sm:pl-5"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 rounded-full bg-[#052C44] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
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
        </div>
      </div>
    </div>
  );
}

function Section4() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const progressRef = useRef(null);
  const sectionRef = useRef(null);
  const playBtnRef = useRef(null);
  const progressTweenRef = useRef(null);
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const videoRef = useRef(null);
  const closingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      gsap.from("[data-cube-stage]", {
        opacity: 0,
        y: 40,
        rotateY: 12,
        scale: 0.94,
        duration: 1.1,
        delay: 0.15,
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

  const openModal = useCallback((index) => {
    swiperRef.current?.autoplay?.stop();
    progressTweenRef.current?.pause();
    setModalIndex(index);
  }, []);

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
          swiperRef.current?.autoplay?.start();
          runProgress();
        },
      })
      .to(panel, {
        opacity: 0,
        y: 24,
        duration: 0.35,
        ease: "power2.in",
      })
      .to(backdrop, { opacity: 0, duration: 0.3, ease: "power2.in" }, "<");

    if (!panel || !backdrop) {
      closingRef.current = false;
      setModalIndex(null);
      document.body.style.overflow = "";
      swiperRef.current?.autoplay?.start();
      runProgress();
    }
  }, [modalIndex, runProgress]);

  useEffect(() => {
    if (modalIndex === null) return;

    document.body.style.overflow = "hidden";

    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    const contentItems = panel?.querySelectorAll("[data-modal-reveal]");
    const video = videoRef.current;

    if (backdrop && panel) {
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(panel, { opacity: 0, y: 32 });
      gsap.set(contentItems, { opacity: 0, y: 16 });

      gsap
        .timeline()
        .to(backdrop, { opacity: 1, duration: 0.4, ease: "power2.out" })
        .to(panel, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.22")
        .to(
          contentItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
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

  const goTo = (i) => swiperRef.current?.slideTo(i);

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
             3D Walkthroughs
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
            data-cube-stage
            className="relative w-full group/brand-films [perspective:1800px]"
          >
            <Swiper
              modules={[EffectCube, Navigation, Autoplay, A11y]}
              effect="cube"
              grabCursor
              rewind
              speed={900}
              cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 30,
                shadowScale: 0.92,
              }}
              autoplay={{
                delay: AUTOPLAY_DELAY,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
                if (!swiper.params.navigation) return;
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              onInit={(swiper) => {
                if (swiper.params.navigation) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
                runProgress();
              }}
              onSlideChangeTransitionStart={(swiper) => {
                setActiveIndex(swiper.realIndex);
                runProgress();
              }}
              onAutoplayPause={() => progressTweenRef.current?.pause()}
              onAutoplayResume={() => progressTweenRef.current?.resume()}
              className="brand-films-swiper w-full aspect-[1920/1080] overflow-visible"
            >
              {BRAND_FILM_SLIDES.map((slide, index) => (
                <SwiperSlide
                  key={`${slide.src}-${index}`}
                  className="!bg-[#0a0a0a] overflow-hidden rounded-[6px] shadow-[0_35px_70px_-20px_rgba(13,111,170,0.45)]"
                >
                  <div className="relative h-full w-full overflow-hidden">
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="h-full w-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <PlayButton
              playBtnRef={playBtnRef}
              onClick={() => openModal(activeIndex)}
            />

            <div className="pointer-events-none absolute -bottom-[16px] left-0 right-0 h-[3px] rounded-full bg-[#0D6FAA]/15 overflow-hidden max-md:-bottom-[12px]">
              <div
                ref={progressRef}
                className="h-full w-full origin-left bg-[#0D6FAA]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            <button
              ref={prevRef}
              type="button"
              aria-label="Previous brand film"
              onMouseMove={(e) => magnetize(e, prevRef)}
              onMouseLeave={() => resetMagnet(prevRef)}
              className="absolute left-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 max-xl:left-2 max-xl:h-10 max-xl:w-10 max-md:left-2 max-md:h-9 max-md:w-9 max-sm:left-1.5 max-sm:h-8 max-sm:w-8"
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
              ref={nextRef}
              type="button"
              aria-label="Next brand film"
              onMouseMove={(e) => magnetize(e, nextRef)}
              onMouseLeave={() => resetMagnet(nextRef)}
              className="absolute right-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 max-xl:right-2 max-xl:h-10 max-xl:w-10 max-md:right-2 max-md:h-9 max-md:w-9 max-sm:right-1.5 max-sm:h-8 max-sm:w-8"
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
          />,
          document.body
        )}
    </>
  );
}

export default Section4;
