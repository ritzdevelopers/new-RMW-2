"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

// ─── Config ────────────────────────────────────────────────────────────────────
const API_BASE = "https://ritzmediaworld.com";
const CASE_STUDY_PATH = "/api/category/case-study";

const CARD_TEMPLATES = [
  { type: "split",       bg: "#F5F3EE", textColor: "#1D1D1B" },
  { type: "solid",       bg: "#1D1D1B", textColor: "#FFFFFF", align: "start" },
  { type: "image-hero",  textColor: "#FFFFFF", usesImage: true },
  { type: "solid",       bg: "#E8542A", textColor: "#FFFFFF", align: "start" },
  { type: "solid-arrow", bg: "#3B71E8", textColor: "#FFFFFF", align: "start" },
  { type: "image-badge", textColor: "#FFFFFF", usesImage: true },
  { type: "watermark",   bg: "#6B1F24", textColor: "rgba(255,255,255,0.28)" },
];

// ─── Stack 3-D constants ───────────────────────────────────────────────────────
const CARD_HEIGHT       = 200;
const EXPANDED_HEIGHT   = 480;
const STACK_PEEK        = 60;
const EXPAND_GAP        = 50;   // gap above expanded image
const EXPAND_GAP_BELOW  = 0;   // gap below expanded image
const TILT_X            = -32;
const HEIGHT_SCALE      = (1 / Math.cos((Math.abs(TILT_X) * Math.PI) / 180)).toFixed(4);
const ANIM_DURATION     = 0.55;

// ─── Helpers ───────────────────────────────────────────────────────────────────
function getCaseStudyApiUrl() {
  if (typeof window === "undefined") return `${API_BASE}${CASE_STUDY_PATH}`;
  const { hostname, origin } = window.location;
  const apiHost = new URL(API_BASE).hostname;
  if (hostname === apiHost || hostname === `www.${apiHost}`) {
    return `${API_BASE.replace(/\/$/, "")}${CASE_STUDY_PATH}`;
  }
  if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
    return CASE_STUDY_PATH;
  }
  return `${API_BASE.replace(/\/$/, "")}${CASE_STUDY_PATH}`;
}

function resolveBlogImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.trim();
  if (!normalized) return "";
  if (normalized.includes("/images")) {
    const tail = normalized.split("/images")[1] || "";
    return tail ? `${API_BASE}/api/images${tail}` : "";
  }
  return `${API_BASE}/blogs/${normalized.replace(/^\/+/, "")}`;
}

function measureImageDisplayHeight(img) {
  if (!img) return CARD_HEIGHT;
  const rendered = img.getBoundingClientRect().height || img.offsetHeight;
  if (rendered > 0) return Math.round(rendered);
  const width = img.clientWidth || img.offsetWidth;
  if (img.naturalWidth > 0 && img.naturalHeight > 0 && width > 0) {
    return Math.round((img.naturalHeight / img.naturalWidth) * width);
  }
  return CARD_HEIGHT;
}

function preloadImageHeight(src, containerWidth) {
  return new Promise((resolve) => {
    if (!src || !containerWidth) {
      resolve(CARD_HEIGHT);
      return;
    }
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth > 0) {
        resolve(Math.round((img.naturalHeight / img.naturalWidth) * containerWidth));
      } else {
        resolve(CARD_HEIGHT);
      }
    };
    img.onerror = () => resolve(CARD_HEIGHT);
    img.src = src;
  });
}

function mapCaseStudyItem(item, index) {
  const template = CARD_TEMPLATES[index % CARD_TEMPLATES.length];
  const project = {
    id:        item.slug,
    slug:      item.slug,
    title:     item.title,
    type:      template.type,
    textColor: template.textColor,
  };
  if (template.bg)    project.bg    = template.bg;
  if (template.align) project.align = template.align;
  if (item.blog_image) {
    project.image     = resolveBlogImageUrl(item.blog_image);
    project.bg        = "#111"; // solid backdrop behind the image when expanded
    project.textColor = "#FFFFFF";
  }
  if (template.type === "image-badge") {
    project.badge = item.title;
  }
  return project;
}

function getStackLayout(count, activeIndex, openHeight) {
  const raw = Array.from({ length: count }, (_, i) => {
    const baseTop = i * STACK_PEEK;

    if (activeIndex === null) {
      return { top: baseTop, height: CARD_HEIGHT, zIndex: i + 1, expanded: false };
    }

    const activeTop    = activeIndex * STACK_PEEK + EXPAND_GAP;
    const activeBottom = activeTop + openHeight;

    if (i === activeIndex) {
      return { top: activeTop, height: openHeight, zIndex: count + 20, expanded: true };
    }

    if (i < activeIndex) {
      const stepsAbove = activeIndex - 1 - i;
      return {
        top:      activeTop - EXPAND_GAP - CARD_HEIGHT - stepsAbove * STACK_PEEK,
        height:   CARD_HEIGHT,
        zIndex:   i + 1,
        expanded: false,
      };
    }

    const stepsBelow = i - activeIndex - 1;
    return {
      top:      activeBottom + EXPAND_GAP_BELOW + stepsBelow * STACK_PEEK,
      height:   CARD_HEIGHT,
      zIndex:   i + 1,
      expanded: false,
    };
  });

  const minTop = Math.min(...raw.map((l) => l.top));
  const offset = minTop < 0 ? -minTop : 0;
  if (!offset) return raw;

  return raw.map((l) => ({ ...l, top: l.top + offset }));
}

function getStackWrapHeight(layout) {
  const maxBottom = Math.max(...layout.map((l) => l.top + l.height));
  return maxBottom + 80;
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const FONT = {
  fontFamily:    '"League Spartan", sans-serif',
  fontWeight:    600,
  textTransform: "uppercase",
  letterSpacing: "0.01em",
};
const SIDE_LABEL_STYLE = {
  fontFamily:    '"League Spartan", sans-serif',
  fontWeight:    600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color:         "#555",
};

// ─── CardInner ─────────────────────────────────────────────────────────────────
function CardInner({ project, expanded = false, onImageLoad }) {
  const expandedImgRef = useRef(null);

  const syncExpandedImageHeight = useCallback(() => {
    const img = expandedImgRef.current;
    if (!img) return;
    const height = measureImageDisplayHeight(img);
    onImageLoad?.(height);
  }, [onImageLoad]);

  useLayoutEffect(() => {
    if (!expanded || !project.image) return;
    const img = expandedImgRef.current;
    if (!img) return;

    const report = () => {
      requestAnimationFrame(() => {
        onImageLoad?.(measureImageDisplayHeight(img));
      });
    };

    if (img.complete) report();

    const ro = new ResizeObserver(report);
    ro.observe(img);
    return () => ro.disconnect();
  }, [expanded, project.image, onImageLoad, syncExpandedImageHeight]);

  // ── image card (collapsed) ──────────────────────────────────────────────────
  if (project.image && !expanded) {
    return (
      <>
        <img
          src={project.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/20" />
        <h3
          style={{ ...FONT, color: "#fff", fontWeight: 500, fontSize: 15 }}
          className="relative z-10 truncate px-6"
        >
          {project.title}
        </h3>
      </>
    );
  }

  // ── image card (expanded) — show FULL image at natural aspect ratio ────────
  if (project.image && expanded) {
    return (
      <div className="relative w-full leading-[0]">
        <img
          ref={expandedImgRef}
          src={project.image}
          alt={project.title}
          className="block w-full h-auto select-none"
          draggable={false}
          onLoad={syncExpandedImageHeight}
        />
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        <div className="absolute inset-0 z-10 flex items-end px-6 pb-6 md:px-8 md:pb-8 pointer-events-none">
          <h3 style={{ ...FONT, color: "#fff", fontSize: 28, lineHeight: 1.15, maxWidth: 720 }}>
            {project.title}
          </h3>
        </div>
      </div>
    );
  }

  // ── split ───────────────────────────────────────────────────────────────────
  if (project.type === "split") {
    return (
      <div className="flex h-full w-full items-center justify-between px-6 gap-4">
        <h3 style={{ ...FONT, color: project.textColor, fontSize: expanded ? 80 : 36, letterSpacing: "-0.03em", lineHeight: 1 }}>
          {project.title}
        </h3>
        {project.description && (
          <p className="text-right text-[11px] leading-relaxed opacity-60 max-w-[120px]" style={{ color: project.textColor }}>
            {project.description}
          </p>
        )}
      </div>
    );
  }

  // ── solid-arrow ─────────────────────────────────────────────────────────────
  if (project.type === "solid-arrow") {
    return (
      <div className="flex h-full w-full items-center justify-between px-6 gap-4">
        <h3 style={{ ...FONT, color: project.textColor, fontWeight: 500, fontSize: expanded ? 40 : 15 }}>
          {project.title}
        </h3>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 11L11 3M11 3H5M11 3V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    );
  }

  // ── image-badge ─────────────────────────────────────────────────────────────
  if (project.type === "image-badge") {
    return (
      <div className="flex h-full w-full items-center px-6">
        <span
          className="inline-flex rounded-[5px] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white"
          style={{ background: "#B32D2E" }}
        >
          {project.badge}
        </span>
      </div>
    );
  }

  // ── watermark ───────────────────────────────────────────────────────────────
  if (project.type === "watermark") {
    return (
      <div className="flex h-full w-full items-center px-6">
        <h3
          style={{ ...FONT, color: project.textColor, fontSize: expanded ? 80 : 42, lineHeight: 1 }}
          className="select-none"
        >
          {project.title}
        </h3>
      </div>
    );
  }

  // ── solid / image-hero (text only fallback) ─────────────────────────────────
  return (
    <div className={`flex h-full w-full items-center px-6 ${project.align === "start" ? "justify-start" : "justify-center"}`}>
      <h3 style={{ ...FONT, color: project.textColor, fontWeight: 500, fontSize: expanded ? 40 : 15 }}>
        {project.title}
      </h3>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
const CaseStudyStack = () => {
  const [projects, setProjects]       = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [openHeight, setOpenHeight]   = useState(CARD_HEIGHT);

  const cardRefs       = useRef([]);
  const stackRef       = useRef(null);
  const isAnimatingRef = useRef(false);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    fetch(getCaseStudyApiUrl())
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(items => {
        if (cancelled || !Array.isArray(items)) return;
        setProjects(items.map(mapCaseStudyItem));
      })
      .catch(err => console.warn("Case study fetch failed:", err));
    return () => { cancelled = true; };
  }, []);

  // ── Animate stack whenever activeIndex or openHeight changes ───────────────
  useLayoutEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    let effectiveOpenHeight = openHeight;
    if (activeIndex !== null) {
      const img = cards[activeIndex]?.querySelector(".cs-card-media img");
      const measured = img ? measureImageDisplayHeight(img) : 0;
      if (measured > 0) {
        effectiveOpenHeight = measured;
        if (Math.abs(measured - openHeight) > 2) {
          setOpenHeight(measured);
        }
      }
    }

    const layout = getStackLayout(cards.length, activeIndex, effectiveOpenHeight);
    const wrapH  = getStackWrapHeight(layout);

    if (stackRef.current) {
      gsap.to(stackRef.current, {
        height: wrapH,
        duration: ANIM_DURATION,
        ease: "power2.inOut",
      });
    }

    cards.forEach((card, i) => {
      const l = layout[i];
      card.style.zIndex = String(l.zIndex);

      if (l.expanded) {
        gsap.killTweensOf(card, "height");
        card.style.overflow = "visible";
        card.style.height   = "auto";
        gsap.to(card, {
          top:             l.top,
          rotateX:         0,
          scaleY:          1,
          transformOrigin: "50% 0%",
          force3D:         true,
          duration:        ANIM_DURATION,
          ease:            "power2.inOut",
          onComplete: () => { card.style.height = "auto"; },
        });
      } else {
        card.style.overflow = "hidden";
        gsap.to(card, {
          top:             l.top,
          height:          l.height,
          rotateX:         TILT_X,
          scaleY:          parseFloat(HEIGHT_SCALE),
          transformOrigin: "50% 100%",
          force3D:         true,
          duration:        ANIM_DURATION,
          ease:            "power2.inOut",
        });
      }
    });
  }, [activeIndex, openHeight, projects.length]);

  // ── Image-load callback (when an expanded image finishes loading) ──────────
  const handleImageLoad = useCallback((imgHeight) => {
    if (!imgHeight || imgHeight < 1) return;
    const nextHeight = Math.round(imgHeight);
    setOpenHeight(prev => Math.abs(prev - nextHeight) > 2 ? nextHeight : prev);
  }, []);

  // ── Select / deselect ──────────────────────────────────────────────────────
  const selectCard = useCallback((index) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const next    = activeIndex === index ? null : index;
    const project = projects[index];

    if (next !== null) {
      if (project?.image) {
        const containerWidth =
          stackRef.current?.offsetWidth ||
          cardRefs.current[index]?.offsetWidth ||
          0;
        preloadImageHeight(project.image, containerWidth).then((height) => {
          setOpenHeight((prev) => (prev > CARD_HEIGHT ? prev : height));
        });
      } else {
        setOpenHeight(EXPANDED_HEIGHT);
      }
    } else {
      setOpenHeight(CARD_HEIGHT);
    }

    setActiveIndex(next);

    window.setTimeout(() => {
      isAnimatingRef.current = false;
    }, ANIM_DURATION * 1000 + 60);
  }, [activeIndex, projects]);

  // ── Escape to close ────────────────────────────────────────────────────────
  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e) => { if (e.key === "Escape") selectCard(activeIndex); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, selectCard]);

  const initialHeight = projects.length > 0
    ? (projects.length - 1) * STACK_PEEK + CARD_HEIGHT + 80
    : CARD_HEIGHT + 80;

  return (
    <>
      <style>{`
        .cs-scene {
          perspective: 1400px;
          perspective-origin: 50% 0%;
          overflow: visible;
        }
        .cs-stack-wrap {
          transform-style: preserve-3d;
          position: relative;
          overflow: visible;
        }
        .cs-card {
          position: absolute;
          left: -3px;
          width: calc(100% + 6px);
          height: ${CARD_HEIGHT}px;
          cursor: pointer;
          transform-style: preserve-3d;
          border-radius: 0;
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
          transform: rotateX(${TILT_X}deg) scaleY(${HEIGHT_SCALE});
          transform-origin: 50% 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: top, height, transform;
        }
        /* When the card is open, flatten it and let the image dictate the height */
        .cs-card.is-active {
          left: 0 !important;
          width: 100% !important;
          overflow: visible !important;
          height: auto !important;
          min-height: ${CARD_HEIGHT}px;
          transform: none !important;          /* no scaleY squish */
          transform-origin: 50% 0%;
          backface-visibility: visible;
          -webkit-backface-visibility: visible;
          box-shadow: 0 24px 60px rgba(0,0,0,0.28);
        }
        .cs-card.is-active .cs-card-media {
          overflow: visible;
          height: auto;
        }
        /* Make sure the expanded image is never cropped */
        .cs-card.is-active img {
          display: block;
          width: 100%;
          height: auto;
          max-width: 100%;
          object-fit: contain;
        }
        .cs-card:not(.is-active):hover {
          filter: brightness(1.05);
        }
        .cs-card:focus-visible {
          outline: 2px solid rgba(59,113,232,0.7);
          outline-offset: 3px;
        }
      `}</style>

      <section className="relative bg-white px-4 pb-[35px] pt-10 md:px-8 md:pb-[70px] md:pt-16 lg:px-12">
        <div className="mx-auto flex w-full max-w-[min(100%,1280px)] items-start gap-4 md:gap-10 lg:max-w-[1320px] lg:gap-14">

          {/* Left label */}
          <div
            className="hidden shrink-0 self-start lg:flex"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            <span style={SIDE_LABEL_STYLE} className="text-[14px] xl:text-[18px]">Startups</span>
          </div>

          {/* 3-D Scene */}
          <div className="cs-scene min-w-0 flex-1">
            <div
              ref={stackRef}
              className="cs-stack-wrap mx-auto w-full"
              style={{ height: initialHeight }}
            >
              {projects.map((project, index) => {
                const isActive = activeIndex === index;
                const shadow = isActive
                  ? "0 24px 60px rgba(0,0,0,0.28)"
                  : `0 -1px 0 rgba(0,0,0,${(0.08 + index * 0.012).toFixed(3)}), 0 ${2 + index}px ${8 + index * 2}px rgba(0,0,0,${(0.12 + index * 0.015).toFixed(3)})`;

                return (
                  <article
                    key={project.id}
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className={`cs-card${isActive ? " is-active" : ""}`}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    aria-label={`${isActive ? "Close" : "Open"} case study: ${project.title}`}
                    style={{
                      top:        index * STACK_PEEK,
                      zIndex:     index + 1,
                      boxShadow:  shadow,
                      background: project.bg || "#1D1D1B",
                    }}
                    onClick={() => selectCard(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        selectCard(index);
                      }
                    }}
                  >
                    {/* Card content */}
                    <div className={`cs-card-media relative w-full ${isActive ? "" : "h-full overflow-hidden"}`}>
                      <CardInner
                        project={project}
                        expanded={isActive}
                        onImageLoad={isActive ? handleImageLoad : undefined}
                      />
                    </div>

                    {/* Controls shown only when expanded */}
                    {isActive && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); selectCard(index); }}
                          aria-label="Close case study"
                          className="absolute right-4 top-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-colors duration-200"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 3L13 13M13 3L3 13" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                          </svg>
                        </button>

                        {project.slug && (
                          <Link
                            href={`/${project.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm hover:bg-black/60 transition-colors duration-200"
                            style={{ fontFamily: '"Montserrat", sans-serif' }}
                          >
                            Read More
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2 12L12 2M12 2H5M12 2V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Link>
                        )}
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          </div>

          {/* Right label */}
          <div
            className="hidden shrink-0 self-start lg:flex"
            style={{ writingMode: "vertical-rl" }}
          >
            <span style={SIDE_LABEL_STYLE} className="text-[14px] xl:text-[18px]">Projects</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudyStack;
