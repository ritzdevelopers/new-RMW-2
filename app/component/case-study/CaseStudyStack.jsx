"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BG_WAVE = "/case-study/Background.png";
const BG_ROBOTICS = "/case-study/Robotics%20Interface.png";

const APPLE_EASE = "power2.inOut";
const APPLE_EASE_OUT = "power3.out";

const sideLabelStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#333333",
};

const titleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0",
};

const projects = [
  {
    id: "corporate-films",
    type: "image-hero",
    bg: BG_WAVE,
    title: "What Are Corporate Brand Films?",
    meta: "HWE SYSTEMS / 2024",
    textColor: "#FFFFFF",
  },
  {
    id: "bold-design",
    type: "solid",
    bg: "#1D1D1B",
    title: "Bold Design.",
    textColor: "#FFFFFF",
    align: "start",
  },
  {
    id: "hse",
    type: "split",
    bg: "#FFFFFF",
    title: "HSE",
    description: "scaling chips down to their physical",
    textColor: "#1D1D1B",
    border: "1px solid #E8E8E8",
  },
  {
    id: "software",
    type: "solid",
    bg: "#E8542A",
    title: "Sell Your Software To",
    textColor: "#FFFFFF",
    align: "start",
  },
  {
    id: "robotics-hand",
    type: "solid-arrow",
    bg: "#3B71E8",
    title: "AI powered robotic hand",
    textColor: "#FFFFFF",
    align: "start",
  },
  {
    id: "red-barn",
    type: "image-badge",
    bg: BG_ROBOTICS,
    badge: "RED BARN ROBOTICS",
    textColor: "#FFFFFF",
  },
  {
    id: "co-morpho",
    type: "watermark",
    bg: "#6B1F24",
    title: "CO-MORPHO",
    textColor: "rgba(255,255,255,0.35)",
  },
];

const STACK_LEAD_HEIGHT = 260;
const STACK_ITEM_HEIGHT = 140;
const STACK_VISIBLE_PEEK = 54;
const STICKY_TOP = 88;
const STICKY_STEP = 14;
const SCROLL_PER_CARD = 420;

function CardInner({ project, expanded = false, compact = false }) {
  return (
    <>
      {(project.type === "image-hero" || project.type === "image-badge") && (
        <>
          <img
            src={project.bg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/15" aria-hidden />
        </>
      )}

      {project.type === "image-hero" && (
        <div className="relative z-10 flex h-full w-full flex-col">
          {compact ? (
            <div className="flex h-full w-full items-center justify-between gap-5 px-8 md:px-12 lg:px-14">
              <h3
                style={{ ...titleStyle, color: project.textColor, fontWeight: 500 }}
                className="m-0 truncate text-[18px] leading-[1.2] tracking-[0.02em] md:text-[22px] lg:text-[26px]"
              >
                {project.title}
              </h3>
              <span
                className="shrink-0 text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 md:text-[11px] lg:text-[12px]"
                style={{ fontFamily: '"Montserrat", sans-serif' }}
              >
                {project.meta}
              </span>
            </div>
          ) : (
            <>
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center md:px-10">
                <h3
                  style={{ ...titleStyle, color: project.textColor }}
                  className={`m-0 max-w-[640px] leading-[1.15] ${expanded ? "text-[28px] md:text-[40px] lg:text-[48px]" : "text-[22px] md:text-[32px] lg:text-[40px]"}`}
                >
                  {project.title}
                </h3>
              </div>
              <div className="px-6 pb-5 md:px-8 md:pb-6">
                <p className="m-0 text-[11px] font-medium uppercase tracking-[0.12em] text-white/50 md:text-[13px]">
                  {project.meta}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {project.type === "solid" && (
        <div
          className={`relative z-10 flex h-full w-full items-center px-8 md:px-12 lg:px-14 ${
            project.align === "start" ? "justify-start" : "justify-center"
          }`}
        >
          <h3
            style={{ ...titleStyle, color: project.textColor, fontWeight: 500 }}
            className={`m-0 leading-[1.05] tracking-[0.01em] ${
              compact
                ? "truncate text-[22px] md:text-[28px] lg:text-[32px]"
                : expanded
                  ? "text-[36px] md:text-[52px] lg:text-[64px]"
                  : "text-[28px] md:text-[40px] lg:text-[52px]"
            }`}
          >
            {project.title}
          </h3>
        </div>
      )}

      {project.type === "split" && (
        <div className="relative z-10 flex h-full w-full items-center justify-between gap-5 px-8 md:px-12 lg:px-14">
          <h3
            style={{ ...titleStyle, color: project.textColor, fontWeight: 600 }}
            className={`m-0 shrink-0 leading-none tracking-[-0.02em] ${
              compact ? "text-[36px] md:text-[48px] lg:text-[56px]" : expanded ? "text-[64px] md:text-[88px] lg:text-[110px]" : "text-[48px] md:text-[72px] lg:text-[96px]"
            }`}
          >
            {project.title}
          </h3>
          {!compact && (
            <p
              className="m-0 max-w-[220px] text-right text-[13px] leading-[1.5] opacity-60 md:text-[15px] lg:text-[16px]"
              style={{ color: project.textColor, fontFamily: '"Montserrat", sans-serif' }}
            >
              {project.description}
            </p>
          )}
        </div>
      )}

      {project.type === "solid-arrow" && (
        <div className="relative z-10 flex h-full w-full items-center justify-between gap-5 px-8 md:px-12 lg:px-14">
          <h3
            style={{ ...titleStyle, color: project.textColor, fontWeight: 500 }}
            className={`m-0 leading-[1.08] tracking-[0.01em] ${
              compact
                ? "truncate text-[18px] md:text-[24px] lg:text-[28px]"
                : expanded
                  ? "max-w-[520px] text-[32px] md:text-[44px] lg:text-[52px]"
                  : "max-w-[520px] text-[24px] md:text-[36px] lg:text-[44px]"
            }`}
          >
            {project.title}
          </h3>
          {!compact && (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10">
              <i className="ri-arrow-right-up-line text-[20px] text-white" aria-hidden />
            </span>
          )}
          {compact && (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 md:h-11 md:w-11">
              <i className="ri-arrow-right-up-line text-[16px] text-white md:text-[18px]" aria-hidden />
            </span>
          )}
        </div>
      )}

      {project.type === "image-badge" && (
        <div className="relative z-10 flex h-full w-full items-center px-8 md:px-12 lg:px-14">
          <span className="inline-flex w-fit rounded-[6px] bg-[#B32D2E] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white md:text-[11px] lg:text-[12px]">
            {project.badge}
          </span>
        </div>
      )}

      {project.type === "watermark" && (
        <div className="relative z-10 flex h-full w-full items-center px-8 md:px-12 lg:px-14">
          <h3
            style={{ ...titleStyle, color: project.textColor, fontWeight: 600 }}
            className={`m-0 select-none leading-none tracking-[0.04em] ${
              compact
                ? "text-[20px] opacity-70 md:text-[24px] lg:text-[28px]"
                : expanded
                  ? "text-[80px] md:text-[110px] lg:text-[140px]"
                  : "text-[64px] md:text-[96px] lg:text-[120px]"
            }`}
          >
            {project.title}
          </h3>
        </div>
      )}
    </>
  );
}

function getExpandedMetrics() {
  const width = Math.min(920, window.innerWidth - 40);
  const height = Math.min(580, window.innerHeight - 48);
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;
  return { width, height, left, top };
}

function lockScroll() {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}

function unlockScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

function applyFlipFromRect(expanded, rect, metrics) {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const tx = metrics.left + metrics.width / 2;
  const ty = metrics.top + metrics.height / 2;

  gsap.set(expanded, {
    position: "fixed",
    top: metrics.top,
    left: metrics.left,
    width: metrics.width,
    height: metrics.height,
    x: cx - tx,
    y: cy - ty,
    scaleX: rect.width / metrics.width,
    scaleY: rect.height / metrics.height,
    transformOrigin: "50% 50%",
    force3D: true,
    borderRadius: 16,
    zIndex: 60,
    boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
    opacity: 1,
  });
}

const CaseStudyStack = () => {
  const sectionRef = useRef(null);
  const pinWrapRef = useRef(null);
  const stackRef = useRef(null);
  const cardRefs = useRef([]);
  const overlayRef = useRef(null);
  const backdropRef = useRef(null);
  const stormRef = useRef(null);
  const expandedCardRef = useRef(null);
  const expandTweenRef = useRef(null);
  const waveLoopRef = useRef(null);
  const originRectRef = useRef(null);
  const activeCardRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const isExpandedRef = useRef(false);
  const hoverTweensRef = useRef(new Map());
  const masterTlRef = useRef(null);
  const savedScrollStateRef = useRef({ y: 0, progress: 0 });

  const [expandedIndex, setExpandedIndex] = useState(null);
  const isExpanded = expandedIndex !== null;
  isExpandedRef.current = isExpanded;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pinWrap = pinWrapRef.current;
    const stack = stackRef.current;
    if (!section || !pinWrap || !stack) return;

    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    const segmentCount = Math.max(cards.length - 1, 1);
    const segmentDuration = 1 / segmentCount;

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card, { y: 0, opacity: 1, force3D: true });
          card.style.zIndex = String(index + 1);
          return;
        }
        gsap.set(card, { y: 90, opacity: 0, force3D: true });
        card.style.zIndex = String(index + 1);
        const surface = card.querySelector("[data-cs-card-surface]");
        if (surface) {
          gsap.set(surface, {
            scale: Math.max(0.975, 1 - index * 0.0035),
            force3D: true,
            transformOrigin: "50% 100%",
          });
        }
      });

      const scrollDistance = SCROLL_PER_CARD * segmentCount;

      const setCardSticky = (enabled) => {
        cards.forEach((card, index) => {
          card.style.position = enabled ? "sticky" : "relative";
          card.style.top = enabled ? `${STICKY_TOP + index * STICKY_STEP}px` : "auto";
        });

        gsap.utils.toArray("[data-cs-side-label]", section).forEach((label) => {
          label.style.position = enabled ? "sticky" : "relative";
          label.style.top = enabled ? `${STICKY_TOP}px` : "auto";
        });
      };

      const syncCardDepth = (progress) => {
        const visibleCount = Math.min(
          cards.length,
          1 + Math.floor(progress * segmentCount),
        );

        cards.forEach((card, i) => {
          card.style.zIndex = String(i + 1);
          const surface = card.querySelector("[data-cs-card-surface]");
          if (!surface) return;

          const depth = Math.max(0, visibleCount - 1 - i);
          const scale = i === 0 ? 1 : Math.max(0.972, 1 - depth * 0.004);
          gsap.set(surface, {
            scale,
            force3D: true,
            transformOrigin: "50% 100%",
          });
        });
      };

      const masterTl = gsap.timeline({
        scrollTrigger: {
          id: "cs-stack-scroll",
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: pinWrap,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: () => setCardSticky(false),
          onEnterBack: (self) => {
            setCardSticky(true);
            masterTl.progress(self.progress);
            syncCardDepth(self.progress);
          },
          onUpdate: (self) => syncCardDepth(self.progress),
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const segIndex = index - 1;
        const start = segIndex * segmentDuration;

        masterTl.fromTo(
          card,
          { y: 90, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: segmentDuration * 0.92,
            ease: APPLE_EASE_OUT,
            force3D: true,
          },
          start,
        );
      });

      masterTlRef.current = masterTl;

      cards.forEach((card) => {
        const surface = card.querySelector("[data-cs-card-surface]");
        if (!surface) return;

        const onEnter = () => {
          if (isAnimatingRef.current || isExpandedRef.current) return;
          hoverTweensRef.current.get(card)?.kill();
          hoverTweensRef.current.set(
            card,
            gsap.to(surface, {
              y: -3,
              scale: 1.012,
              duration: 0.6,
              ease: APPLE_EASE_OUT,
              force3D: true,
              transformOrigin: "50% 100%",
              overwrite: "auto",
            }),
          );
        };

        const onLeave = () => {
          hoverTweensRef.current.get(card)?.kill();
          hoverTweensRef.current.set(
            card,
            gsap.to(surface, {
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: APPLE_EASE,
              force3D: true,
              transformOrigin: "50% 100%",
              overwrite: "auto",
            }),
          );
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        card._csHoverCleanup = () => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        };
      });

      gsap.utils.toArray("[data-cs-side-label]", section).forEach((label) => {
        gsap.from(label, {
          opacity: 0,
          x: label.dataset.csSide === "left" ? -28 : 28,
          duration: 0.9,
          ease: APPLE_EASE_OUT,
          scrollTrigger: {
            trigger: stack,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, section);

    return () => {
      cards.forEach((card) => card._csHoverCleanup?.());
      hoverTweensRef.current.clear();
      masterTlRef.current = null;
      ctx.revert();
    };
  }, [projects.length]);

  const syncStackFromScroll = useCallback(() => {
    const st = ScrollTrigger.getById("cs-stack-scroll");
    const tl = masterTlRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!st || !tl || !cards.length) return;

    tl.progress(st.progress);

    const segmentCount = Math.max(cards.length - 1, 1);
    const visibleCount = Math.min(cards.length, 1 + Math.floor(st.progress * segmentCount));

    cards.forEach((card, i) => {
      card.style.zIndex = String(i + 1);
      gsap.set(card, { visibility: "visible" });

      const surface = card.querySelector("[data-cs-card-surface]");
      if (!surface) return;

      const depth = Math.max(0, visibleCount - 1 - i);
      const scale = i === 0 ? 1 : Math.max(0.972, 1 - depth * 0.004);
      gsap.set(surface, {
        x: 0,
        y: 0,
        scale,
        force3D: true,
        transformOrigin: "50% 100%",
      });
    });
  }, []);

  const finishCloseAndRestore = useCallback(() => {
    const overlay = overlayRef.current;
    const backdrop = backdropRef.current;
    const storm = stormRef.current;
    const expanded = expandedCardRef.current;
    const sourceCard = activeCardRef.current;

    expandTweenRef.current?.kill();
    waveLoopRef.current?.kill();
    hoverTweensRef.current.forEach((tween) => tween.kill());
    hoverTweensRef.current.clear();

    if (expanded) gsap.set(expanded, { clearProps: "all" });
    if (overlay) gsap.set(overlay, { pointerEvents: "none", visibility: "hidden", opacity: 0 });
    if (backdrop) gsap.set(backdrop, { opacity: 0 });

    const waves = storm?.querySelectorAll("[data-cs-wave]");
    if (waves?.length) {
      gsap.set(waves, { clearProps: "all", opacity: 0, scale: 1 });
    }

    if (sourceCard) {
      gsap.set(sourceCard, { visibility: "visible", clearProps: "transform,opacity" });
      const surface = sourceCard.querySelector("[data-cs-card-surface]");
      if (surface) gsap.set(surface, { clearProps: "transform" });
    }

    activeCardRef.current = null;
    originRectRef.current = null;
    isAnimatingRef.current = false;

    setExpandedIndex(null);
    unlockScroll();

    const st = ScrollTrigger.getById("cs-stack-scroll");
    const { y, progress } = savedScrollStateRef.current;
    st?.enable();

    requestAnimationFrame(() => {
      window.scrollTo(0, y);
      ScrollTrigger.refresh();
      const tl = masterTlRef.current;
      if (tl) tl.progress(progress);
      syncStackFromScroll();
    });
  }, [syncStackFromScroll]);

  const runOpenAnimationRef = useRef(null);

  const runOpenAnimation = useCallback(() => {
    const overlay = overlayRef.current;
    const backdrop = backdropRef.current;
    const storm = stormRef.current;
    const expanded = expandedCardRef.current;
    const origin = originRectRef.current;

    if (!overlay || !expanded || !origin) return;

    expandTweenRef.current?.kill();
    waveLoopRef.current?.kill();

    const metrics = getExpandedMetrics();
    applyFlipFromRect(expanded, origin, metrics);

    gsap.set(overlay, { visibility: "visible", pointerEvents: "auto", opacity: 1 });
    gsap.set(backdrop, { opacity: 0 });

    const waves = storm?.querySelectorAll("[data-cs-wave]");
    if (waves?.length) {
      gsap.set(waves, { scale: 2.4, opacity: 0, force3D: true });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
    expandTweenRef.current = tl;

    tl.to(backdrop, { opacity: 1, duration: 0.5, ease: APPLE_EASE_OUT }, 0);

    if (waves?.length) {
      tl.to(
        waves,
        {
          scale: 1.12,
          opacity: 0.5,
          duration: 1,
          ease: APPLE_EASE_OUT,
          stagger: 0.06,
          force3D: true,
        },
        0,
      );

      waveLoopRef.current = gsap.to(waves, {
        scale: 1.22,
        opacity: 0.38,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.15,
        force3D: true,
      });
    }

    tl.to(
      expanded,
      {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        borderRadius: 20,
        boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
        duration: 0.88,
        ease: APPLE_EASE,
        force3D: true,
      },
      0.08,
    );
  }, []);

  runOpenAnimationRef.current = runOpenAnimation;

  const closeExpanded = useCallback(() => {
    if (!isExpandedRef.current) return;

    const overlay = overlayRef.current;
    const backdrop = backdropRef.current;
    const storm = stormRef.current;
    const expanded = expandedCardRef.current;
    const origin = originRectRef.current;

    expandTweenRef.current?.kill();
    waveLoopRef.current?.kill();

    if (!overlay || !expanded || !origin) {
      finishCloseAndRestore();
      return;
    }

    isAnimatingRef.current = true;

    const metrics = getExpandedMetrics();
    const cx = origin.left + origin.width / 2;
    const cy = origin.top + origin.height / 2;
    const tx = metrics.left + metrics.width / 2;
    const ty = metrics.top + metrics.height / 2;

    const waves = storm?.querySelectorAll("[data-cs-wave]");
    const tl = gsap.timeline({
      onComplete: finishCloseAndRestore,
    });

    expandTweenRef.current = tl;

    tl.to(
      expanded,
      {
        x: cx - tx,
        y: cy - ty,
        scaleX: origin.width / metrics.width,
        scaleY: origin.height / metrics.height,
        borderRadius: 16,
        boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
        duration: 0.82,
        ease: APPLE_EASE,
        force3D: true,
      },
      0,
    );

    if (waves?.length) {
      tl.to(
        waves,
        { scale: 2.2, opacity: 0, duration: 0.65, ease: "power2.in", stagger: 0.04, force3D: true },
        0,
      );
    }

    tl.to(backdrop, { opacity: 0, duration: 0.45, ease: "power2.in" }, 0.08);
  }, [finishCloseAndRestore]);

  const openExpanded = useCallback(
    (index, cardEl) => {
      if (!cardEl || isExpandedRef.current) return;
      if (isAnimatingRef.current) {
        expandTweenRef.current?.kill();
        waveLoopRef.current?.kill();
      }

      isAnimatingRef.current = true;
      activeCardRef.current = cardEl;

      const surface = cardEl.querySelector("[data-cs-card-surface]");
      if (surface) gsap.set(surface, { y: 0, clearProps: "transform" });

      const rect = cardEl.getBoundingClientRect();
      originRectRef.current = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      };

      const st = ScrollTrigger.getById("cs-stack-scroll");
      savedScrollStateRef.current = {
        y: window.scrollY,
        progress: st?.progress ?? 0,
      };

      gsap.set(cardEl, { visibility: "hidden" });
      st?.disable(false);
      lockScroll();

      setExpandedIndex(index);
    },
    [],
  );

  useLayoutEffect(() => {
    if (expandedIndex === null) return;
    runOpenAnimationRef.current?.();
  }, [expandedIndex]);

  useEffect(() => {
    if (expandedIndex === null) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") closeExpanded();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedIndex, closeExpanded]);

  const stackEndPadding = STACK_VISIBLE_PEEK + 40;

  const isLightCard = (project) => project.type === "split";

  return (
    <>
      <style>{`
        .cs-stack-shell {
          position: relative;
          padding: 4px 0 8px;
        }
        .cs-stack-shell::before {
          content: "";
          position: absolute;
          inset: 12% 8% auto 8%;
          height: 48%;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.06) 0%, transparent 72%);
          pointer-events: none;
          z-index: 0;
        }
        .cs-stack-card {
          align-self: stretch;
          border-radius: 16px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transform: translateZ(0);
        }
        .cs-stack-card--lead {
          height: ${STACK_LEAD_HEIGHT}px;
          margin-bottom: -${STACK_LEAD_HEIGHT - STACK_VISIBLE_PEEK}px;
        }
        .cs-stack-card--item {
          height: ${STACK_ITEM_HEIGHT}px;
          margin-bottom: -${STACK_ITEM_HEIGHT - STACK_VISIBLE_PEEK}px;
        }
        .cs-stack-card:last-child {
          margin-bottom: 0;
        }
        .cs-stack-card:focus-visible {
          outline: 2px solid rgba(59, 113, 232, 0.65);
          outline-offset: 4px;
        }
        .cs-stack-card-surface {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          align-self: stretch;
          position: relative;
          height: 100%;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transition: box-shadow 0.45s ease;
        }
        .cs-stack-card-surface::after {
          content: "";
          position: absolute;
          inset: 0 0 auto 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.22) 50%,
            transparent 100%
          );
          z-index: 15;
          pointer-events: none;
          opacity: 0.7;
        }
        .cs-stack-card-surface--lead {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #111;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.06) inset,
            0 28px 56px -14px rgba(0, 0, 0, 0.32),
            0 8px 20px -6px rgba(0, 0, 0, 0.18);
        }
        .cs-stack-card-surface--item {
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.05) inset,
            0 16px 36px -12px rgba(0, 0, 0, 0.28),
            0 4px 12px -4px rgba(0, 0, 0, 0.14);
        }
        .cs-stack-card-surface--light {
          border: 1px solid rgba(0, 0, 0, 0.07);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.85) inset,
            0 16px 36px -12px rgba(0, 0, 0, 0.1),
            0 4px 12px -4px rgba(0, 0, 0, 0.06);
        }
        .cs-stack-card-surface--light::after {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.95) 50%,
            transparent 100%
          );
          opacity: 0.55;
        }
        .cs-stack-card:hover .cs-stack-card-surface--lead,
        .cs-stack-card:hover .cs-stack-card-surface--item {
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.08) inset,
            0 32px 64px -16px rgba(0, 0, 0, 0.34),
            0 10px 24px -8px rgba(0, 0, 0, 0.2);
        }
        @media (max-width: 767px) {
          .cs-stack-card--lead {
            height: 168px;
            margin-bottom: -${168 - 42}px;
          }
          .cs-stack-card--item {
            height: 96px;
            margin-bottom: -${96 - 42}px;
          }
        }
        .cs-storm-wave {
          position: absolute;
          inset: -20%;
          background-image: url("${BG_WAVE}");
          background-size: cover;
          background-position: center;
          filter: grayscale(1) contrast(1.15);
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform, opacity;
        }
        .cs-storm-wave:nth-child(1) { opacity: 0.45; mix-blend-mode: screen; }
        .cs-storm-wave:nth-child(2) { opacity: 0.35; mix-blend-mode: lighten; }
        .cs-storm-wave:nth-child(3) { opacity: 0.25; filter: grayscale(1) contrast(1.3) blur(2px); }
        .cs-expanded-card {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          .cs-stack-card-surface,
          .cs-expanded-card,
          .cs-storm-wave {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative bg-white px-4 pb-[35px] pt-10 md:px-8 md:pb-[70px] md:pt-16 lg:px-12"
      >
        <div
          ref={pinWrapRef}
          className="mx-auto flex w-full max-w-[min(100%,1280px)] items-start gap-4 md:gap-10 lg:max-w-[1320px] lg:gap-14"
        >
          <div
            data-cs-side-label
            data-cs-side="left"
            className="sticky hidden shrink-0 lg:flex"
            style={{
              top: STICKY_TOP,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            <span style={sideLabelStyle} className="text-[14px] xl:text-[18px]">
              Startups
            </span>
          </div>

          <div
            ref={stackRef}
            className="cs-stack-shell relative z-[1] flex min-w-0 flex-1 flex-col items-stretch"
            style={{ paddingBottom: stackEndPadding }}
          >
            {projects.map((project, index) => (
              <article
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                data-cs-card
                role="button"
                tabIndex={0}
                aria-label={`Open case study: ${project.title}`}
                className={`cs-stack-card relative w-full ${
                  index === 0 ? "cs-stack-card--lead" : "cs-stack-card--item"
                }`}
                style={{
                  position: "sticky",
                  top: STICKY_TOP + index * STICKY_STEP,
                  zIndex: index + 1,
                }}
                onClick={(e) => openExpanded(index, e.currentTarget)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openExpanded(index, e.currentTarget);
                  }
                }}
              >
                <div
                  data-cs-card-surface
                  className={`cs-stack-card-surface relative h-full w-full ${
                    index === 0
                      ? "cs-stack-card-surface--lead"
                      : `cs-stack-card-surface--item${isLightCard(project) ? " cs-stack-card-surface--light" : ""}`
                  }`}
                  style={
                    index === 0
                      ? undefined
                      : {
                          background:
                            project.type === "image-hero" || project.type === "image-badge"
                              ? "#111"
                              : project.bg,
                        }
                  }
                >
                  <CardInner project={project} compact />
                </div>
              </article>
            ))}
          </div>

          <div
            data-cs-side-label
            data-cs-side="right"
            className="sticky hidden shrink-0 lg:flex"
            style={{
              top: STICKY_TOP,
              writingMode: "vertical-rl",
            }}
          >
            <span style={sideLabelStyle} className="text-[14px] xl:text-[18px]">
              Projects
            </span>
          </div>
        </div>
      </section>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[200] opacity-0"
        style={{ visibility: "hidden", pointerEvents: "none" }}
        aria-hidden={!isExpanded}
      >
        <div
          ref={backdropRef}
          className="absolute inset-0 bg-[#0a0f2a]/88"
          onClick={closeExpanded}
          aria-hidden
        />

        <div ref={stormRef} className="pointer-events-none absolute inset-0 overflow-hidden">
          <div data-cs-wave className="cs-storm-wave" />
          <div data-cs-wave className="cs-storm-wave" />
          <div data-cs-wave className="cs-storm-wave" />
        </div>

        {expandedIndex !== null && (
          <div
            ref={expandedCardRef}
            className="cs-expanded-card"
            style={{
              background:
                projects[expandedIndex].type === "image-hero" ||
                projects[expandedIndex].type === "image-badge"
                  ? "#111"
                  : projects[expandedIndex].bg,
              border: projects[expandedIndex].border || "none",
            }}
          >
            <div className="relative h-full w-full">
              <CardInner project={projects[expandedIndex]} expanded />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeExpanded();
              }}
              aria-label="Close case study"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black/60 md:right-6 md:top-6"
            >
              <i className="ri-close-line text-[22px]" aria-hidden />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CaseStudyStack;
