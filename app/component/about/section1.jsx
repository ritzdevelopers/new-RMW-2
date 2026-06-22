"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Montserrat } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300"],
  style: ["italic"],
  display: "swap",
});

const mixtaPro = "font-['MixtaPro']";
const sequelFontFamily = '"Sequel Sans"';
const goldColor = "#FFD188";
const circleSpotlightDuration = 15;

const headingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const disruptionStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 365,
  fontSize: "94px",
  lineHeight: "71px",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#1D1D1B",
};

const disruptionWordStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  fontSize: "180px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#333333",
};

const mobileDisruptionWordStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  fontSize: "72px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#333333",
};

const subHeadingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#333333",
};

const Reveal = ({ children, className = "", clipYOnly = false, group = "headline" }) => (
  <span
    className={`block ${clipYOnly ? "overflow-x-visible overflow-y-hidden" : "overflow-hidden"} ${className}`}
  >
    <span data-about-reveal={group} className="block w-full">
      {children}
    </span>
  </span>
);

const Letter = ({ children, from }) => (
  <span className="inline-block shrink-0 overflow-hidden align-bottom">
    <span data-letter-reveal={from} className="inline-block">
      {children}
    </span>
  </span>
);

const VIDEO_SRC = "/about/video-about.mp4";

const VideoFullscreenModal = ({ open, onClose }) => {
  const videoRef = useRef(null);
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    if (!open) {
      setIsEntered(false);
      return;
    }

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsEntered(true));
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      if (video) video.pause();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`video-modal-backdrop fixed inset-0 z-[200] flex cursor-pointer items-center justify-center bg-black/92 p-4 md:p-8 ${isEntered ? "is-visible" : ""}`}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`video-modal-panel relative w-full max-w-[1200px] ${isEntered ? "is-visible" : ""}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Watch video"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-10 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-opacity hover:opacity-80 md:-top-12"
        >
          <i className="ri-close-line text-[22px]" aria-hidden />
        </button>
        <video
          ref={videoRef}
          controls
          playsInline
          className="block max-h-[85vh] w-full rounded-[12px] bg-black object-contain"
          src={VIDEO_SRC}
        />
      </div>
    </div>
  );
};

const WatchNowOverlay = ({ className = "", onWatch }) => {
  const overlayRef = useRef(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isTracking, setIsTracking] = useState(false);

  const handleMouseMove = (event) => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const rect = overlay.getBoundingClientRect();
    setPosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
    setIsTracking(true);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 50, y: 50 });
    setIsTracking(false);
  };

  return (
    <div
      ref={overlayRef}
      className={`pointer-events-auto absolute inset-0 z-20 cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onWatch}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onWatch?.();
      }}
      role="button"
      tabIndex={0}
      aria-label="Watch now"
    >
      <button
        type="button"
        aria-label="Watch now"
        className="watch-now-btn pointer-events-none absolute flex items-center gap-1.5 rounded-full bg-white py-1.5 pl-3.5 pr-1.5 shadow-[0_6px_24px_rgba(0,0,0,0.22)] md:gap-2 md:py-2 md:pl-4 md:pr-1.5"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: "translate(-50%, -50%)",
          transition: isTracking
            ? "left 0.14s ease-out, top 0.14s ease-out, transform 0.25s ease"
            : "left 0.5s cubic-bezier(0.22, 1, 0.36, 1), top 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.25s ease",
        }}
      >
        <span className="font-league-spartan text-[10px] font-medium uppercase tracking-[0.08em] text-[#1D1D1B] md:text-[11px]">
          Watch Now
        </span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1D1D1B] text-white md:h-7 md:w-7">
          <i className="ri-play-fill text-[11px] md:text-[12px]" aria-hidden />
        </span>
      </button>
    </div>
  );
};

const Section1 = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const headlineSpotlightWrapRef = useRef(null);
  const headlineGoldRef = useRef(null);
  const disruptionRef = useRef(null);
  const filmRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroTextRef = useRef(null);
  const videoFloatRef = useRef(null);
  const videoSlotRef = useRef(null);
  const logoFloatRef = useRef(null);
  const videoEntranceRef = useRef(0);
  const videoRevealStartedRef = useRef(false);
  const videoBoundsRef = useRef(null);

  const isMobileViewport = () =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

  const getStartSize = () => {
    const video = videoFloatRef.current?.querySelector("video");
    const width = Math.min(1044, window.innerWidth - 32);
    let height = width * (9 / 16);

    if (video?.videoWidth && video?.videoHeight) {
      height = width * (video.videoHeight / video.videoWidth);
    }

    return { width, height };
  };

  const measureFinalSlotEnd = () => {
    const container = heroRef.current;
    const slot = videoSlotRef.current;
    if (!container || !slot) return null;

    const wordEls = container.querySelectorAll("[data-about-reveal='disruption-word']");
    const saved = [...wordEls].map((el) => gsap.getProperty(el, "yPercent"));
    wordEls.forEach((el) => gsap.set(el, { yPercent: 0 }));

    const cRect = container.getBoundingClientRect();
    const sRect = slot.getBoundingClientRect();
    const end = {
      x: sRect.left + sRect.width / 2 - cRect.left,
      y: sRect.top + sRect.height / 2 - cRect.top,
      width: sRect.width,
      height: sRect.height,
      clipTop: 0,
    };

    wordEls.forEach((el, i) => gsap.set(el, { yPercent: saved[i] ?? -110 }));
    return end;
  };

  const getVideoStartYOffset = () => {
    const w = window.innerWidth;
    if (w >= 1280 && w < 1536) return 480;
    if (w >= 1024 && w < 1280) return 390;
    if (w >= 768 && w < 1024) return 150;
    return 350;
  };

  const syncVideoBounds = (lockStart = false) => {
    const container = heroRef.current;
    const heroSection = heroSectionRef.current;
    if (!container || !heroSection) return null;

    const startSize = getStartSize();
    const sectionBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const end = measureFinalSlotEnd();
    if (!end) return null;

    const nextStart =
      lockStart && videoBoundsRef.current?.start
        ? videoBoundsRef.current.start
        : {
            x: container.offsetWidth / 2,
            y: sectionBottom - startSize.height / 2 + getVideoStartYOffset(),
            width: startSize.width,
            height: startSize.height,
            clipTop: 0,
          };

    videoBoundsRef.current = {
      start: nextStart,
      end,
    };

    return videoBoundsRef.current;
  };

  const getVideoBounds = () => videoBoundsRef.current ?? syncVideoBounds();

  const computeVideoBounds = () => getVideoBounds();

  const applyLogoPosition = (entranceProgress, scrollProgress = 0) => {
    if (isMobileViewport()) return;

    const logoFloat = logoFloatRef.current;
    const heroSection = heroSectionRef.current;
    const container = heroRef.current;
    if (!logoFloat || !heroSection || !container) return;

    const entrance = gsap.utils.clamp(0, 1, entranceProgress ?? videoEntranceRef.current);
    const scrollT = gsap.utils.clamp(0, 1, scrollProgress);
    const logoHeight = 200;
    const sectionBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const logoInner = logoFloat.querySelector("[data-logo-inner]");

    gsap.set(logoFloat, {
      position: "absolute",
      left: container.offsetWidth / 2,
      right: "auto",
      top: sectionBottom,
      xPercent: -50,
      yPercent: -100,
      width: container.offsetWidth,
      height: logoHeight,
      zIndex: scrollT > 0 ? 55 : 35,
      borderRadius: 0,
      visibility: videoRevealStartedRef.current ? "visible" : "hidden",
      opacity: entrance,
    });

    if (logoInner) {
      gsap.set(logoInner, {
        top: "auto",
        bottom: 0,
        left: 0,
        right: 0,
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "center",
      });
    }

    const logoImg = logoFloat.querySelector("[data-logo-inner] img");
    if (logoImg) {
      gsap.set(logoImg, {
        clearProps: "width,height,maxWidth,objectPosition",
        objectPosition: "bottom",
      });
    }
  };

  const applyHeroTextScroll = (scrollProgress) => {
    if (isMobileViewport()) return;

    const heroText = heroTextRef.current;
    const heroSection = heroSectionRef.current;
    if (!heroText || !heroSection) return;

    const t = gsap.utils.clamp(0, 1, scrollProgress);
    gsap.set(heroText, {
      y: -t * heroSection.offsetHeight * 0.38,
      opacity: gsap.utils.interpolate(1, 0.15, t),
    });
  };

  const syncLogoWithScroll = (scrollProgress = 0) => {
    applyLogoPosition(
      videoEntranceRef.current >= 1 ? 1 : videoEntranceRef.current,
      scrollProgress
    );
  };

  const applyVideoProgress = (progress, entranceProgress) => {
    if (isMobileViewport()) return;

    const floater = videoFloatRef.current;
    const bounds = computeVideoBounds();
    if (!floater || !bounds) return;

    const t = gsap.utils.clamp(0, 1, progress);
    const entrance = gsap.utils.clamp(0, 1, entranceProgress ?? videoEntranceRef.current);
    const { start, end } = bounds;
    const clipTop = gsap.utils.interpolate(start.clipTop, end.clipTop, t);

    const targetWidth = gsap.utils.interpolate(start.width, end.width, t);
    const targetHeight = gsap.utils.interpolate(start.height, end.height, t);
    const minScale = 0.18;
    const width =
      t > 0 || entrance >= 1
        ? targetWidth
        : gsap.utils.interpolate(start.width * minScale, start.width, entrance);
    const height =
      t > 0 || entrance >= 1
        ? targetHeight
        : gsap.utils.interpolate(start.height * minScale, start.height, entrance);

    gsap.set(floater, {
      visibility: videoRevealStartedRef.current ? "visible" : "hidden",
      left: gsap.utils.interpolate(start.x, end.x, t),
      top: gsap.utils.interpolate(start.y, end.y, t),
      width,
      height,
      zIndex: t > 0 ? 50 : 30,
      clipPath: clipTop > 0 ? `inset(${clipTop}% 0% 0% 0%)` : "none",
      borderRadius: t > 0 ? gsap.utils.interpolate(24, 20, t) : gsap.utils.interpolate(0, 10, entrance),
    });

    const video = floater.querySelector("video");
    if (video) {
      gsap.set(video, { clearProps: "scale,height" });
    }
  };

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
    const disruption = disruptionRef.current;
    const film = filmRef.current;
    if (!hero) return;

    const fitHeadline = () => {
      const parent = headline?.parentElement;
      if (!headline || !parent) return;

      headline.style.transform = "none";
      const rows = headline.querySelectorAll("[data-headline-row]");
      let needed = 0;
      rows.forEach((row) => {
        needed = Math.max(needed, row.scrollWidth, row.getBoundingClientRect().width);
      });
      const buffer = 48;
      const available = parent.clientWidth - buffer;
      const scale = needed > 0 ? Math.min(1, available / needed) : 1;
      headline.style.transform = scale < 1 ? `scale(${scale})` : "none";
      headline.style.transformOrigin = "top center";
    };

    const fitDisruption = () => {
      if (!disruption || isMobileViewport()) return;

      const parent = disruption.parentElement;
      disruption.style.transform = "none";
      const rows = disruption.querySelectorAll("[data-headline-row]");
      let needed = 0;
      rows.forEach((row) => {
        needed = Math.max(needed, row.scrollWidth, row.getBoundingClientRect().width);
      });
      const buffer = 48;
      const available = (parent?.clientWidth ?? window.innerWidth) - buffer;
      const scale = needed > 0 ? Math.min(1, available / needed) : 1;
      disruption.style.transform = scale < 1 ? `scale(${scale})` : "none";
      disruption.style.transformOrigin = "center top";
    };

    const fitAll = () => {
      fitHeadline();
      fitDisruption();
    };

    let onHeaderComplete = null;
    let metadataVideo = null;
    let onVideoMetadata = null;
    let introHandoffDone = false;
    let heroVideoST = null;
    const videoScroll = { p: 0 };

    const getFilmSnapY = () => {
      if (!film) return 0;
      return Math.round(window.scrollY + film.getBoundingClientRect().top);
    };

    const isFilmEntering = () => {
      if (!film) return false;
      const filmTop = film.getBoundingClientRect().top;
      return filmTop > 0 && filmTop < window.innerHeight * 0.92;
    };

    const runIntroReveal = () => {
      if (introHandoffDone || isMobileViewport() || !film || !isFilmEntering()) return;

      introHandoffDone = true;
      window.scrollTo({ top: getFilmSnapY(), behavior: "smooth" });
    };

    const resetIntroReveal = () => {
      introHandoffDone = false;
    };

    let spotlightTween = null;
    let spotlightStarted = false;

    const getCircleRadius = () => {
      const width = window.innerWidth;
      if (width >= 768) return 65;
      return 22;
    };

    const getSpotlightWaypoints = () => {
      const wrap = headlineSpotlightWrapRef.current;
      if (!wrap) return null;

      const words = wrap.querySelectorAll("[data-headline-word]");
      if (!words.length) return null;

      const wrapRect = wrap.getBoundingClientRect();
      return [...words].map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left - wrapRect.left + rect.width * 0.5,
          y: rect.top - wrapRect.top + rect.height * 0.5,
        };
      });
    };

    const hideHeadlineGold = () => {
      const gold = headlineGoldRef.current;
      if (!gold) return;

      const mask = "radial-gradient(circle 0px at -9999px -9999px, transparent 100%, transparent 100%)";
      gold.style.maskImage = mask;
      gold.style.webkitMaskImage = mask;
    };

    const startHeadlineSpotlight = () => {
      const wrap = headlineSpotlightWrapRef.current;
      const gold = headlineGoldRef.current;
      if (!wrap || !gold) return;

      const waypoints = getSpotlightWaypoints();
      if (!waypoints?.length) return;

      spotlightTween?.kill();
      spotlightTween = null;

      const circleRadius = getCircleRadius();
      const points = [
        { x: waypoints[0].x - circleRadius, y: waypoints[0].y },
        ...waypoints,
        {
          x: waypoints[waypoints.length - 1].x + circleRadius,
          y: waypoints[waypoints.length - 1].y,
        },
      ];

      const setMaskAt = (x, y) => {
        const radius = getCircleRadius();
        const mask = `radial-gradient(circle ${radius}px at ${x}px ${y}px, #000 98%, transparent 100%)`;
        gold.style.maskImage = mask;
        gold.style.webkitMaskImage = mask;
      };

      const speed = wrap.offsetWidth / circleSpotlightDuration;
      const proxy = { x: points[0].x, y: points[0].y };
      setMaskAt(proxy.x, proxy.y);

      const tl = gsap.timeline({
        repeat: -1,
        onUpdate: () => setMaskAt(proxy.x, proxy.y),
      });

      for (let i = 1; i < points.length; i += 1) {
        const from = points[i - 1];
        const to = points[i];
        const dist = Math.hypot(to.x - from.x, to.y - from.y);
        if (!dist) continue;

        tl.to(proxy, {
          x: to.x,
          y: to.y,
          duration: dist / speed,
          ease: "none",
        });
      }

      spotlightTween = tl;
      spotlightStarted = true;
    };

    const ctx = gsap.context(() => {
      const headlineItems = gsap.utils.toArray("[data-about-reveal='headline']", hero);
      const subItems = gsap.utils.toArray("[data-about-reveal='sub']", hero);
      const logoEl = hero.querySelector("[data-about-hero-logo]");
      const introItems = gsap.utils.toArray("[data-about-reveal='intro']", hero);
      const disruptionItems = gsap.utils.toArray("[data-about-reveal='disruption']", hero);
      const disruptionWordItems = gsap.utils.toArray("[data-about-reveal='disruption-word']", hero);

      gsap.set(headlineItems, { yPercent: -110 });
      gsap.set(subItems, { yPercent: -110, opacity: 0 });
      if (logoEl) gsap.set(logoEl, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(introItems, { yPercent: 110 });
      gsap.set(disruptionItems, { yPercent: 110 });
      gsap.set(disruptionWordItems, { yPercent: 0, opacity: 0 });

      const leftLetters = gsap.utils.toArray("[data-letter-reveal='left']", hero);
      const rightLetters = gsap.utils.toArray("[data-letter-reveal='right']", hero);
      const allLetters = gsap.utils.toArray("[data-letter-reveal]", hero);
      gsap.set(leftLetters, { x: "105%" });
      gsap.set(rightLetters, { x: "-105%" });

      const playHeroEntrance = () => {
        const entrance = { value: 0 };
        const mobile = isMobileViewport();

        if (!mobile) {
          videoEntranceRef.current = 0;
          videoRevealStartedRef.current = true;
          applyVideoProgress(0, 0);
        }

        const tl = gsap.timeline({
          onComplete: () => {
            if (!mobile) {
              videoEntranceRef.current = 1;
              syncVideoBounds(true);
              applyVideoProgress(0, 1);
              applyLogoPosition(1);
            }
            fitAll();
          },
        });

        headlineItems.forEach((item, index) => {
          tl.to(
            item,
            {
              yPercent: 0,
              duration: 2,
              ease: "power4.out",
              onComplete:
                index === headlineItems.length - 1
                  ? () => {
                      fitAll();
                      startHeadlineSpotlight();
                    }
                  : undefined,
            },
            index === 0 ? 0 : "-=1.65"
          );
        });

        subItems.forEach((item, index) => {
          tl.to(
            item,
            { yPercent: 0, opacity: 1, duration: 1.4, ease: "power4.out" },
            index === 0 ? "-=1.1" : "-=1.15"
          );
        });

        if (!mobile && logoEl) {
          tl.set(logoEl, { visibility: "visible" }, 0);
        }

        if (!mobile) {
          tl.to(
            entrance,
            {
              value: 1,
              duration: 2,
              ease: "power4.out",
              onUpdate: () => {
                videoEntranceRef.current = entrance.value;
                applyVideoProgress(0, entrance.value);
                applyLogoPosition(entrance.value);
              },
            },
            0
          );
        }
      };

      onHeaderComplete = () => playHeroEntrance();
      window.addEventListener("header-reveal-complete", onHeaderComplete);

      if (film && (introItems.length || disruptionItems.length)) {
        const filmTl = gsap.timeline({
          scrollTrigger: {
            trigger: film,
            start: "top 85%",
            toggleActions: "restart reset restart reset",
          },
        });

        introItems.forEach((item) => {
          filmTl.to(item, { yPercent: 0, duration: 1.1, ease: "power4.out" }, 0);
        });

        disruptionItems.forEach((item) => {
          filmTl.to(item, { yPercent: 0, duration: 1.1, ease: "power4.out" }, ">-0.15");
        });

        if (allLetters.length && disruptionWordItems.length) {
          filmTl.to(disruptionWordItems, { opacity: 1, duration: 0.01 }, "<");
          filmTl.to(
            allLetters,
            { x: "0%", duration: 0.55, ease: "power4.out", stagger: 0.06 },
            "<"
          );
        }

        filmTl.eventCallback("onComplete", fitAll);
      }

      if (film && !isMobileViewport()) {
        ScrollTrigger.create({
          id: "intro-reveal",
          trigger: film,
          start: "top 92%",
          onEnter: runIntroReveal,
          onLeaveBack: resetIntroReveal,
        });
      }

      const floater = videoFloatRef.current;
      const slot = videoSlotRef.current;
      const heroSection = heroSectionRef.current;
      const videoEl = floater?.querySelector("video");

      const refreshVideoLayout = () => {
        const scrollProgress =
          ScrollTrigger.getAll().find((st) => st.vars?.endTrigger === slot)?.progress ?? 0;
        applyVideoProgress(scrollProgress, videoEntranceRef.current);
        applyHeroTextScroll(scrollProgress);
        applyLogoPosition(1, scrollProgress);
        ScrollTrigger.refresh();
      };

      if (floater && slot && heroSection && !isMobileViewport()) {
        gsap.set(floater, {
          position: "absolute",
          xPercent: -50,
          yPercent: -50,
          zIndex: 30,
          borderRadius: "20px",
          overflow: "hidden",
        });

        videoEntranceRef.current = 0;
        videoRevealStartedRef.current = false;
        syncVideoBounds();
        applyVideoProgress(0, 0);
        applyLogoPosition(0);

        const videoTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            endTrigger: slot,
            end: "top 55%",
            scrub: 1.8,
            invalidateOnRefresh: true,
          },
        });

        heroVideoST = videoTl.scrollTrigger;

        videoTl.to(videoScroll, {
          p: 1,
          ease: "none",
          onUpdate: () => {
            applyVideoProgress(videoScroll.p, 1);
            applyHeroTextScroll(videoScroll.p);
            syncLogoWithScroll(videoScroll.p);
          },
        });

        if (videoEl) {
          onVideoMetadata = refreshVideoLayout;
          metadataVideo = videoEl;
          videoEl.addEventListener("loadedmetadata", onVideoMetadata);
        }

        requestAnimationFrame(() => {
          applyVideoProgress(0, videoEntranceRef.current);
          ScrollTrigger.refresh();
        });
      }
    }, hero);

    const onResize = () => {
      fitAll();
      syncVideoBounds(videoEntranceRef.current >= 1);
      const scrollProgress =
        ScrollTrigger.getAll().find((st) => st.vars?.endTrigger === videoSlotRef.current)?.progress ?? 0;
      applyVideoProgress(scrollProgress, videoEntranceRef.current);
      applyHeroTextScroll(scrollProgress);
      applyLogoPosition(1, scrollProgress);
      if (spotlightStarted) startHeadlineSpotlight();
      ScrollTrigger.refresh();
    };

    hideHeadlineGold();
    fitAll();
    syncVideoBounds();
    requestAnimationFrame(() => {
      fitAll();
      syncVideoBounds();
    });
    window.addEventListener("resize", onResize);

    const resizeObserver =
      typeof ResizeObserver !== "undefined" &&
      new ResizeObserver(() => {
        fitAll();
      });

    if (headline?.parentElement && resizeObserver) {
      resizeObserver.observe(headline.parentElement);
    }
    if (disruption?.parentElement && resizeObserver) {
      resizeObserver.observe(disruption.parentElement);
    }

    return () => {
      spotlightTween?.kill();
      if (metadataVideo && onVideoMetadata) {
        metadataVideo.removeEventListener("loadedmetadata", onVideoMetadata);
      }
      window.removeEventListener("resize", onResize);
      window.removeEventListener("header-reveal-complete", onHeaderComplete);
      resizeObserver?.disconnect();
      ctx.revert();
    };
  }, []);

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  return (
    <>
      <style>{`
        @font-face {
          font-family: "Sequel Sans";
          src: url("/fonts/Sequel-Sans-Font-Family/Sequel-Sans-Font-Family-DEMO/Sequel Sans OTF/Sequel Sans Medium Head.otf")
            format("opentype");
          font-weight: 365;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Sequel Sans";
          src: url("/fonts/Sequel-Sans-Font-Family/Sequel-Sans-Font-Family-DEMO/Sequel Sans OTF/Sequel Sans Semi Bold Head.otf")
            format("opentype");
          font-weight: 370;
          font-style: normal;
          font-display: swap;
        }
        @keyframes watchNowPulse {
          0%,
          100% {
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25), 0 0 0 0 rgba(255, 255, 255, 0.45);
          }
          50% {
            box-shadow: 0 10px 34px rgba(0, 0, 0, 0.28), 0 0 0 10px rgba(255, 255, 255, 0);
          }
        }
        .watch-now-btn {
          animation: watchNowPulse 2.4s ease-in-out infinite;
        }
        .video-modal-backdrop {
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .video-modal-backdrop.is-visible {
          opacity: 1;
        }
        .video-modal-panel {
          transform: scale(0.35);
          opacity: 0;
          transition:
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.4s ease;
        }
        .video-modal-panel.is-visible {
          transform: scale(1);
          opacity: 1;
        }
      `}</style>

      <div ref={heroRef} className="relative overflow-x-hidden">
      <section
        ref={heroSectionRef}
        className="relative flex min-h-[calc(100dvh-4.5rem)] flex-col overflow-x-hidden bg-[#0D1334] px-8 pt-35px pb-[60px] md:min-h-screen md:px-12 md:pt-[30px] md:pb-[80px]"
      >
        <div
          ref={heroTextRef}
          className="relative z-40 mx-auto flex w-full max-w-[1200px] flex-col items-center text-center"
        >
          <div className="relative w-full overflow-x-hidden md:w-full lg:w-screen">
            <h1
              ref={headlineRef}
              style={headingStyle}
              className="m-0 mx-auto w-full max-w-full text-center text-[34px] leading-[36px] md:text-[72px] md:leading-[72px] lg:text-[94px] lg:leading-[94px]"
            >
              <div ref={headlineSpotlightWrapRef} className="relative w-full">
                <div className="relative z-[1]">
                  <Reveal clipYOnly className="w-full py-[2px]">
                    <span className="flex w-full justify-center">
                      <span data-headline-row className="inline-flex max-w-full items-center justify-center gap-[8px] md:gap-[40px] lg:gap-[90px]">
                        <span data-headline-word>18</span>
                        <span data-headline-word>YEARS</span>
                        <span data-headline-word>OF</span>
                      </span>
                    </span>
                  </Reveal>
                  <Reveal clipYOnly className="mt-[4px] w-full py-[2px]">
                    <span className="flex w-full justify-center">
                      <span data-headline-row className="inline-flex max-w-full items-center justify-center gap-[10px] md:gap-[20px] lg:gap-[90px]">
                        <span data-headline-word>MAKING</span>
                        <span data-headline-word>BRANDS</span>
                      </span>
                    </span>
                  </Reveal>
                  <Reveal clipYOnly className="mt-[4px] w-full py-[2px] md:overflow-x-visible">
                    <span className="flex w-full justify-center md:overflow-x-visible">
                      <span data-headline-row className="inline-flex max-w-full items-center justify-center gap-[6px] text-[26px] leading-[28px] md:gap-[6px] md:text-[58px] md:leading-[58px] lg:gap-[50px] lg:text-[94px] lg:leading-[94px] xl:gap-[120px]">
                        <span data-headline-word>IMPOSSIBLE</span>
                        <span data-headline-word>TO</span>
                        <span data-headline-word className="pr-[6px]">IGNORE</span>
                      </span>
                    </span>
                  </Reveal>
                </div>
                <div
                  ref={headlineGoldRef}
                  className="pointer-events-none absolute inset-0 z-[2] text-center"
                  style={{ ...headingStyle, color: goldColor }}
                  aria-hidden
                >
                  <div className="w-full py-[2px]">
                    <span className="flex w-full justify-center">
                      <span data-headline-row className="inline-flex max-w-full items-center justify-center gap-[8px] md:gap-[40px] lg:gap-[90px]">
                        <span>18</span>
                        <span>YEARS</span>
                        <span>OF</span>
                      </span>
                    </span>
                  </div>
                  <div className="mt-[4px] w-full py-[2px]">
                    <span className="flex w-full justify-center">
                      <span data-headline-row className="inline-flex max-w-full items-center justify-center gap-[10px] md:gap-[20px] lg:gap-[90px]">
                        <span>MAKING</span>
                        <span>BRANDS</span>
                      </span>
                    </span>
                  </div>
                  <div className="mt-[4px] w-full py-[2px] md:overflow-x-visible">
                    <span className="flex w-full justify-center md:overflow-x-visible">
                      <span data-headline-row className="inline-flex max-w-full items-center justify-center gap-[6px] text-[26px] leading-[28px] md:gap-[6px] md:text-[58px] md:leading-[58px] lg:gap-[50px] lg:text-[94px] lg:leading-[94px] xl:gap-[120px]">
                        <span>IMPOSSIBLE</span>
                        <span>TO</span>
                        <span className="pr-[6px]">IGNORE</span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </h1>
          </div>

          <div className={`${montserrat.className} relative z-40 mt-8 max-w-[1000px] md:mt-0 lg:mt-0 xl:mt-5`}>
            <Reveal group="sub">
              <p className="m-0 text-[20px] font-[300] italic leading-[25px] text-white md:text-[18px] md:leading-[20px] lg:text-[22px] xl:text-[28px] lg:leading-[36px]">
              Built on hustle. Driven by heart. Powered by ideas that move the world
              </p>
            </Reveal>
            <Reveal group="sub" className="mt-1">
              <p className="m-0 text-[20px] font-[300] italic leading-[25px] text-white md:text-[18px] md:leading-[20px] lg:text-[22px] xl:text-[28px] lg:leading-[36px]">
                by the belief that great ideas change the world
              </p>
            </Reveal>

            <div className="relative mt-14 w-full md:hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="block h-auto w-full"
                src="/about/video-about.mp4"
              />
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                <img
                  src="/logo/r-rmw-transparent.png"
                  alt=""
                  className="block w-auto max-w-[40%] object-contain"
                  style={{
                    filter: "brightness(3.2) contrast(1.05)",
                    opacity: 0.4,
                  }}
                />
              </div>
              <WatchNowOverlay onWatch={openVideoModal} />
            </div>
          </div>
        </div>
      </section>

      <div
        ref={videoFloatRef}
        className="pointer-events-none absolute z-30 hidden max-w-[1044px] overflow-hidden rounded-[24px] bg-black shadow-[0_24px_60px_rgba(0,0,0,0.35)] will-change-[left,top,width,height] md:block"
        style={{ visibility: "hidden", width: "1044px" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="block h-full w-full origin-center object-cover"
          src="/about/video-about.mp4"
        />
        <WatchNowOverlay onWatch={openVideoModal} />
      </div>
      <div
        ref={logoFloatRef}
        data-about-hero-logo
        className="pointer-events-none absolute z-[35] hidden overflow-hidden md:block"
        style={{ visibility: "hidden" }}
      >
        <div data-logo-inner className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center">
          <img
            src="/logo/r-rmw-transparent.png"
            alt=""
            className="block h-full w-auto max-w-[85%] object-contain object-bottom"
            style={{
              filter: "brightness(3.2) contrast(1.05)",
              opacity: 0.4,
            }}
          />
        </div>
      </div>

      <section id="intro" ref={filmRef} className="relative overflow-x-hidden bg-[#F1F1F1] px-8 pb-0 pt-[35px] md:px-12 md:pb-0 md:pt-[70px] lg:py-16 lg:pt-20">
        <img
          src="/logo/r-logo-side.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-0 top-[50%] z-0 hidden h-[min(460px,50vh)] w-auto -translate-y-1/2 object-contain object-left lg:block lg:h-[min(380px,35vh)] xl:h-[min(620px,50vh)]"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1400px]">
          {/* <Reveal className="absolute left-0 top-0 z-10">
            <img
              src="/about/ritz-logo.png"
              alt="Ritz Media World"
              className="h-[72px] w-auto object-contain md:h-[96px] lg:h-[110px]"
            />
          </Reveal> */}

          <div className="flex flex-col items-center text-center">
            <div className={`${montserrat.className} max-w-[850px]`}>
              <Reveal group="intro">
                <p className="m-0 text-[16px] font-[300] italic leading-[22px] text-[#1D1D1B] md:text-[22px] md:leading-[30px] lg:text-[36px] lg:leading-[40px]">
                  The world&apos;s largest independent brand agency,
                </p>
              </Reveal>
              <Reveal group="intro" className="mt-1">
                <p className="m-0 text-[16px] font-[300] italic leading-[22px] text-[#1D1D1B] md:text-[22px] md:leading-[30px] lg:text-[36px] lg:leading-[40px]">
                  17 years in the making.
                </p>
              </Reveal>
            </div>

            <Reveal group="disruption" className="mt-6 md:mt-12 lg:mt-14 xl:mt-5">
              <p style={subHeadingStyle} className="m-0 max-md:leading-normal text-[25px] md:text-[48px] xl:text-[48px]">
              We Drive Growth Through
              </p>
            </Reveal>
          </div>
        </div>

        <div className="relative z-10 mt-8 flex w-full justify-center md:mt-10 lg:mt-12 xl:mt-5">
          <div ref={disruptionRef} className="flex w-full flex-col items-center text-center">
            <div className="flex w-full flex-col items-center md:hidden">
              <Reveal group="disruption-word" clipYOnly className="overflow-x-visible">
                <span className="flex justify-center overflow-x-visible">
                  <span
                    data-headline-row
                    style={mobileDisruptionWordStyle}
                    className="inline-flex items-center justify-center gap-[14px]"
                  >
                    <Letter from="left">c</Letter>
                    <Letter from="left">R</Letter>
                    <Letter from="left">E</Letter>
                  </span>
                </span>
              </Reveal>

              <div className="relative my-4 w-full">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="block h-auto w-full"
                  src="/about/video-about.mp4"
                />
                <WatchNowOverlay onWatch={openVideoModal} />
              </div>

              <Reveal group="disruption-word" clipYOnly className="overflow-x-visible">
                <span className="flex justify-center overflow-x-visible">
                  <span
                    data-headline-row
                    style={mobileDisruptionWordStyle}
                    className="inline-flex items-center justify-center gap-[14px]"
                  >
                    <Letter from="right">A</Letter>
                    <Letter from="right">T</Letter>
                    <Letter from="right">I</Letter>
                  </span>
                </span>
              </Reveal>

              <Reveal group="disruption-word" clipYOnly className="mt-1 overflow-x-visible">
                <span className="flex justify-center overflow-x-visible">
                  <span
                    data-headline-row
                    style={mobileDisruptionWordStyle}
                    className="inline-flex items-center justify-center gap-[14px]"
                  >
                    <Letter from="left">V</Letter>
                    <Letter from="left">I</Letter>
                    <Letter from="right">T</Letter>
                    <Letter from="right">Y</Letter>
                  </span>
                </span>
              </Reveal>
            </div>

            <div className="hidden w-full flex-col items-center md:flex">
            <Reveal group="disruption-word" clipYOnly className="overflow-x-visible">
              <span className="flex justify-center overflow-x-visible">
                <span
                  data-headline-row
                  style={disruptionWordStyle}
                  className="inline-flex items-center justify-center gap-[20px]"
                >
                  <Letter from="left">c</Letter>
                  <Letter from="left">R</Letter>
                  <Letter from="left">E</Letter>
                  <span className="inline-flex shrink-0 items-center">
                    <span
                      ref={videoSlotRef}
                      aria-hidden
                      className="block h-[180px] w-[320px] opacity-0"
                    />
                  </span>
                  <Letter from="right">A</Letter>
                  <Letter from="right">T</Letter>
                  <Letter from="right">I</Letter>
                </span>
              </span>
            </Reveal>

            <Reveal group="disruption-word" clipYOnly className="mt-1 overflow-x-visible md:mt-2">
              <span className="flex justify-center overflow-x-visible">
                <span
                  data-headline-row
                  style={disruptionWordStyle}
                  className="inline-flex items-center justify-center gap-[20px]"
                >
                  <Letter from="left">V</Letter>
                  <Letter from="left">I</Letter>
                  <Letter from="right">T</Letter>
                  <Letter from="right">Y</Letter>
                </span>
              </span>
            </Reveal>
            </div>
          </div>
        </div>
      </section>
      </div>
      <VideoFullscreenModal open={isVideoModalOpen} onClose={closeVideoModal} />
    </>
  );
};

export default Section1;
