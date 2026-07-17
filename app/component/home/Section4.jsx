"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const numberStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(24px, 3vw, 36px)",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
};

const titleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
};

// Small styles reused for the grid-card labels (same font family/weight as the
// list, just scaled down so they read correctly inside a card).
const gridNumberStyle = {
  ...numberStyle,
  fontSize: "clamp(15px, 1.6vw, 22px)",
};

const gridTitleStyle = {
  ...titleStyle,
  fontSize: "clamp(22px, 2.6vw, 40px)",
};

// Splits a title into a top/bottom half for the grid-card hover effect
// (multi-word titles split on words, single words split by characters).
const splitTitleParts = (title) => {
  const words = title.trim().split(/\s+/);
  if (words.length > 1) {
    const half = Math.ceil(words.length / 2);
    return [words.slice(0, half).join(" "), words.slice(half).join(" ")];
  }
  const mid = Math.ceil(title.length / 2);
  return [title.slice(0, mid), title.slice(mid)];
};

const IMAGE_CLIP_WIDTH = "min(300px, 26vw)";
// Feathered edges (a soft ~14px fade instead of a hard cut) so letters that
// straddle the image window cross-fade between the black text and the
// image-filled text rather than being sliced mid-glyph.
const ROW_CLIP_MASK = `linear-gradient(to right, #000 0, #000 calc(50% - min(150px, 13vw) - 14px), transparent calc(50% - min(150px, 13vw) + 14px), transparent calc(50% + min(150px, 13vw) - 14px), #000 calc(50% + min(150px, 13vw) + 14px), #000 100%)`;
const IMAGE_TEXT_MASK = `linear-gradient(to right, transparent 0, transparent calc(50% - min(150px, 13vw) - 14px), #000 calc(50% - min(150px, 13vw) + 14px), #000 calc(50% + min(150px, 13vw) - 14px), transparent calc(50% + min(150px, 13vw) + 14px), transparent 100%)`;
const imageOverlayTextStyle = {
  color: "transparent",
  WebkitTextStroke: "0.5px gray",
  backgroundSize: `${IMAGE_CLIP_WIDTH} auto`,
  backgroundPosition: "center center",
  backgroundAttachment: "fixed",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
};

const linkRowClass =
  "inline-flex items-baseline justify-center gap-4 md:gap-6 lg:gap-10";

const services = [
  { number: "01", title: "GULSHAN", slug: "gulshan", image: "/home/gulshan.png", xlShift: 0 },
  { number: "02", title: "VEDVAN", slug: "vedvan", image: "/home/vedvan.jpg", xlShift: 100 },
  { number: "03", title: "EXOTICA", slug: "exotica", image: "/home/exotica.jpg", xlShift: -200 },
  { number: "04", title: "SPLENDOR ONYX", slug: "splendor-onyx", image: "/home/onyx.png", xlShift: 100 },
  { number: "05", title: "LUMORA", slug: "lumora", image: "/home/lumora.jpg", xlShift: -200 },
  { number: "06", title: "SANSKAR", slug: "sanskar", image: "/home/SANSKAR.jpg", xlShift: 200 },
  { number: "07", title: "VVIP MADHUBAN", slug: "vvip-madhuban", image: "/home/vvip.jpg", xlShift: -100 },
  { number: "08", title: "GHD", slug: "ghd", image: "/home/GHD.jpg", xlShift: 200 },
  { number: "09", title: "MANSHA GROUP", slug: "mansha-group", image: "/home/mansha.jpg", xlShift: -100 },
  { number: "10", title: "EON FAIRFOX", slug: "eon-fairfox", image: "/home/FAIRFOX.jpg", xlShift: 200, shiftClass: " md:-translate-x-[100px] lg:translate-x-[200px] xl:translate-x-[200px]" },
];

const shiftClassByValue = {
  0: "",
  100: " md:translate-x-[100px] lg:translate-x-[100px] xl:translate-x-[100px]",
  "-100": " md:-translate-x-[100px] lg:-translate-x-[100px] xl:-translate-x-[100px]",
  200: " md:translate-x-[200px] lg:translate-x-[200px] xl:translate-x-[200px]",
  "-200": " md:-translate-x-[200px] lg:-translate-x-[200px] xl:-translate-x-[200px]",
  400: " md:translate-x-[400px] lg:translate-x-[400px] xl:translate-x-[400px]",
  "-400": " md:-translate-x-[400px] lg:-translate-x-[400px] xl:-translate-x-[400px]",
};

/* -------------------------------------------------------------------------- */
/* List <-> Grid toggle                                                        */
/* -------------------------------------------------------------------------- */

const ViewToggle = ({ viewMode, onChange, onGridHover }) => {
  const baseBtn =
    "flex items-center gap-2 text-[11px] md:text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-200";

  return (
    <div className="relative z-40 flex items-center gap-5 md:gap-6">
      <button
        type="button"
        onClick={() => onChange("list")}
        className={`${baseBtn} ${
          viewMode === "list" ? "text-black" : "text-black/35 hover:text-black/60"
        }`}
        aria-pressed={viewMode === "list"}
      >
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
          <line x1="0" y1="1" x2="16" y2="1" stroke="currentColor" strokeWidth="1.4" />
          <line x1="0" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="1.4" />
          <line x1="0" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        List
      </button>

      <button
        type="button"
        onClick={() => onChange("grid")}
        onMouseEnter={() => onGridHover?.(true)}
        onMouseLeave={() => onGridHover?.(false)}
        onFocus={() => onGridHover?.(true)}
        onBlur={() => onGridHover?.(false)}
        className={`${baseBtn} ${
          viewMode === "grid" ? "text-black" : "text-black/35 hover:text-black/60"
        }`}
        aria-pressed={viewMode === "grid"}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <rect x="0" y="0" width="6" height="6" stroke="currentColor" strokeWidth="1.4" />
          <rect x="8" y="0" width="6" height="6" stroke="currentColor" strokeWidth="1.4" />
          <rect x="0" y="8" width="6" height="6" stroke="currentColor" strokeWidth="1.4" />
          <rect x="8" y="8" width="6" height="6" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        Grid
      </button>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Grid (horizontal slider) mode                                              */
/* -------------------------------------------------------------------------- */

const GridSlider = ({ cardRefs }) => {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0); // pointer x at grab
  const startScroll = useRef(0); // scrollLeft at grab
  const target = useRef(0); // where we want to be
  const current = useRef(0); // where we actually are (eased)
  const vel = useRef(0); // scrollLeft delta / frame (fling)
  const pointerVel = useRef(0); // pointer px/ms (last move)
  const lastX = useRef(0);
  const lastT = useRef(0);
  const rafId = useRef(0);
  const running = useRef(false);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? track.scrollLeft / max : 0);
  }, []);

  // Single rAF loop that owns scrollLeft for every interaction (drag, wheel,
  // trackpad, fling) so motion is always frame-synced and eased.
  //  - dragging: ease `current` toward the pointer target
  //  - flinging: coast on `vel` with friction (keep target synced so it
  //    doesn't snap back once the fling ends)
  //  - otherwise: ease `current` toward `target` (wheel / trackpad / settle)
  const tick = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      running.current = false;
      return;
    }
    const max = track.scrollWidth - track.clientWidth;

    if (isDragging.current) {
      current.current += (target.current - current.current) * 0.16;
    } else if (Math.abs(vel.current) > 0.05) {
      current.current += vel.current;
      vel.current *= 0.95; // gentle friction = long, silky glide
      target.current = current.current;
    } else {
      current.current += (target.current - current.current) * 0.12;
    }

    if (current.current < 0) {
      current.current = 0;
      vel.current = 0;
      target.current = 0;
    } else if (current.current > max) {
      current.current = max;
      vel.current = 0;
      target.current = max;
    }

    track.scrollLeft = current.current;

    const settled =
      !isDragging.current &&
      Math.abs(vel.current) < 0.05 &&
      Math.abs(target.current - current.current) < 0.4;

    if (settled) {
      running.current = false;
      return;
    }
    rafId.current = requestAnimationFrame(tick);
  }, []);

  const ensureRAF = useCallback(() => {
    if (running.current) return;
    running.current = true;
    rafId.current = requestAnimationFrame(tick);
  }, [tick]);

  useLayoutEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("resize", updateProgress);
      cancelAnimationFrame(rafId.current);
      running.current = false;
    };
  }, [updateProgress]);

  const onPointerDown = (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return; // let touch scroll natively
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startScroll.current = track.scrollLeft;
    current.current = track.scrollLeft;
    target.current = track.scrollLeft;
    vel.current = 0;
    pointerVel.current = 0;
    lastX.current = e.clientX;
    lastT.current = performance.now();
    track.setPointerCapture?.(e.pointerId);
    track.style.cursor = "grabbing";
    ensureRAF();
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const now = performance.now();
    const dt = now - lastT.current || 16;
    // Smooth the pointer velocity (rolling blend) so a flick hands off a
    // stable, jitter-free speed to the glide.
    const inst = (e.clientX - lastX.current) / dt;
    pointerVel.current = pointerVel.current * 0.6 + inst * 0.4;
    lastX.current = e.clientX;
    lastT.current = now;
    target.current = startScroll.current - (e.clientX - startX.current);
    ensureRAF();
  };

  const endDrag = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const track = trackRef.current;
    if (track) {
      track.style.cursor = "grab";
      track.releasePointerCapture?.(e.pointerId);
    }
    // Hand the pointer velocity to the fling (px/ms -> px/frame, inverted
    // because dragging right scrolls content left). Boosted a touch and
    // capped so a flick travels far but never runaway-fast.
    const flung = -pointerVel.current * 18;
    vel.current = Math.max(-90, Math.min(90, flung));
    ensureRAF();
  };

  const onScrubberPointerDown = (e) => {
    const track = trackRef.current;
    const bar = e.currentTarget;
    if (!track || !bar) return;

    // Take over from any running glide, then let the eased loop chase the
    // scrubber target so the cards glide smoothly (instead of snapping).
    isDragging.current = false;
    vel.current = 0;
    if (!running.current) current.current = track.scrollLeft;

    const setFromClientX = (clientX) => {
      const rect = bar.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const max = track.scrollWidth - track.clientWidth;
      target.current = ratio * max;
      ensureRAF();
    };

    setFromClientX(e.clientX);
    bar.setPointerCapture?.(e.pointerId);

    const onMove = (moveEvent) => setFromClientX(moveEvent.clientX);
    const onUp = () => {
      bar.removeEventListener("pointermove", onMove);
      bar.removeEventListener("pointerup", onUp);
    };
    bar.addEventListener("pointermove", onMove);
    bar.addEventListener("pointerup", onUp);
  };

  return (
    <div className="relative z-30 w-full">
      <div
        ref={trackRef}
        onScroll={updateProgress}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={(e) => isDragging.current && endDrag(e)}
        className="flex w-full cursor-grab items-center gap-4 overflow-x-auto px-[calc(50%-150px)] pb-2 [-ms-overflow-style:none] [scroll-behavior:auto] [scroll-snap-type:x_proximity] [scrollbar-width:none] [touch-action:pan-y] md:gap-6 md:px-0 md:[scroll-snap-type:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((service, index) => {
          const [topPart, bottomPart] = splitTitleParts(service.title);
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="group relative shrink-0 [scroll-snap-align:center] w-[min(300px,80vw)] md:h-[74vh] md:w-auto"
              draggable={false}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/5 md:h-full md:w-auto">
                <img
                  src={service.image}
                  alt={service.title}
                  draggable={false}
                  className="pointer-events-none h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />

                <span
                  className="pointer-events-none absolute left-4 top-4 text-white md:left-6 md:top-6"
                  style={gridNumberStyle}
                >
                  {service.number}
                </span>

                {/* Split title: on hover the top half lifts and the bottom
                    half drops, opening up around the image. */}
                <div
                  className="pointer-events-none absolute inset-x-4 bottom-8 flex flex-col text-white/40 transition-colors duration-500 group-hover:text-white/70 md:inset-x-6 md:bottom-10"
                  style={{
                    ...titleStyle,
                    fontSize: "clamp(40px, 8vw, 104px)",
                    lineHeight: "0.82",
                    letterSpacing: "0.02em",
                    WebkitTextStroke: "1px rgba(255,255,255,0.25)",
                  }}
                >
                  <span className="block [word-break:break-all] transition-transform duration-500 ease-out group-hover:-translate-y-4">
                    {topPart}
                  </span>
                  <span className="block [word-break:break-all] transition-transform duration-500 ease-out group-hover:translate-y-4">
                    {bottomPart}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div
        onPointerDown={onScrubberPointerDown}
        className="group relative mx-auto mt-8 h-1 w-[240px] cursor-pointer rounded-full bg-black/10 md:w-[340px]"
      >
        {/* filled progress */}
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-black/80"
          style={{ width: `calc(${progress * 100}% + 2px)` }}
        />
        {/* draggable knob */}
        <div
          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-black shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-[height,width] duration-150 ease-out group-hover:h-4 group-hover:w-4"
          style={{ left: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Mobile image slider (list mode)                                            */
/* -------------------------------------------------------------------------- */

const MobileImageSlider = ({ activeSlug, onActiveChange }) => {
  useEffect(() => {
    const interval = window.setInterval(() => {
      const currentIndex = services.findIndex((service) => service.slug === activeSlug);
      const nextIndex = (currentIndex + 1 + services.length) % services.length;
      onActiveChange(services[nextIndex].slug);
    }, 2800);

    return () => window.clearInterval(interval);
  }, [activeSlug, onActiveChange]);

  return (
    <div className="pointer-events-none relative z-20 mb-8 w-full overflow-hidden select-none md:hidden">
      <div
        className="flex w-max gap-3 animate-section4-mobile-marquee"
      >
        {[...services, ...services].map((service, index) => {
          return (
            <div
              key={`${service.slug}-${index}`}
              className="relative w-[min(280px,75vw)] shrink-0"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/5">
                <img
                  src={service.image}
                  alt={service.title}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                <span
                  className="pointer-events-none absolute left-3 top-3 text-[10px] text-white"
                  style={gridNumberStyle}
                >
                  {service.number}
                </span>
                <span
                  className="pointer-events-none absolute inset-x-3 bottom-4 text-[22px] text-white"
                  style={gridTitleStyle}
                >
                  {service.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Section4                                                                    */
/* -------------------------------------------------------------------------- */

const Section4 = () => {
  const [activeSlug, setActiveSlug] = useState(services[0].slug);
  const [viewMode, setViewMode] = useState("list"); // "list" | "grid"
  const [pendingReveal, setPendingReveal] = useState(false);
  const [gridPreview, setGridPreview] = useState(false);
  // grid -> list reveal: hold every row black briefly (so it hands off from
  // the black ghost text), then let the inactive rows fade to transparent on
  // a long, gentle transition instead of snapping.
  const [revealBlack, setRevealBlack] = useState(false);
  const [revealSlow, setRevealSlow] = useState(false);
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const textRefs = useRef([]);
  const thumbRefs = useRef([]);
  const gridCardRefs = useRef([]);
  const overlayRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const activeService =
    services.find((service) => service.slug === activeSlug) ?? services[0];

  // The grid-tab hover preview (thumbnails beside each title) only makes sense
  // while we're actually looking at the list.
  const showGridPreview = gridPreview && viewMode === "list";

  const handleGridHover = (enter) => {
    if (viewMode !== "list") return;
    setGridPreview(enter);
  };

  // Applies the same starting Y offset the pinned ScrollTrigger uses, so that
  // when we morph *into* list mode the ghosts land exactly where the real list
  // rows will sit — even before ScrollTrigger is (re)created.
  const applyListStartY = useCallback(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const pin = pinRef.current;
    const list = listRef.current;
    const first = itemRefs.current[0];
    if (!pin || !list || !first) return;
    gsap.set(list, {
      y: pin.offsetHeight * 0.3 - (first.offsetTop + first.offsetHeight / 2),
    });
  }, []);

  // Choreographed grid -> list transition (the mirror image of runListToGrid):
  //   1) each grid card shrinks + travels back to a small thumb beside its
  //      list title, its card label fading out,
  //   2) the real list number + title fade back in at their exact measured
  //      positions and font sizes,
  // so the grid visually collapses into the list — no size pop, no clipped
  // text — instead of one view popping out and the other popping in.
  const runGridToList = () => {
    const overlay = overlayRef.current;

    // Capture grid-card geometry now, before React swaps the DOM to the list.
    const fromData = services.map((service, index) => {
      const card = gridCardRefs.current[index];
      return card ? { rect: card.getBoundingClientRect() } : null;
    });

    const finish = () => {
      setPendingReveal(false);
      isAnimatingRef.current = false;
    };

    // Phase A — build the card image ghosts on top of the still-visible grid
    // *before* swapping to the list, so the very first painted frame already
    // shows them. (Building them a couple frames later was the blink/blank.)
    const imgGhosts = [];
    if (overlay) {
      overlay.innerHTML = "";
      services.forEach((service, index) => {
        const from = fromData[index];
        if (!from) return;
        const cardRect = from.rect;

        const imgGhost = document.createElement("div");
        Object.assign(imgGhost.style, {
          position: "fixed",
          left: `${cardRect.left}px`,
          top: `${cardRect.top}px`,
          width: `${cardRect.width}px`,
          height: `${cardRect.height}px`,
          overflow: "hidden",
          zIndex: 1000,
          pointerEvents: "none",
          transformOrigin: "top left",
          willChange: "transform, width, height, opacity",
          backfaceVisibility: "hidden",
          background: "#f4f3f1",
        });
        const [topPart, bottomPart] = splitTitleParts(service.title);
        imgGhost.innerHTML = `
            <img src="${service.image}" style="width:100%;height:100%;object-fit:cover;display:block" />
            <div class="s4-card-label" style="position:absolute;inset:0">
              <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,.7), rgba(0,0,0,0) 55%)"></div>
              <span style="position:absolute;left:24px;top:24px;color:#fff;font-family:'League Spartan',sans-serif;font-weight:600;text-transform:uppercase;font-size:clamp(15px,1.6vw,22px);white-space:nowrap;">${service.number}</span>
              <div style="position:absolute;left:24px;right:24px;bottom:40px;display:flex;flex-direction:column;color:rgba(255,255,255,0.4);-webkit-text-stroke:1px rgba(255,255,255,0.25);font-family:'League Spartan',sans-serif;font-weight:600;text-transform:uppercase;font-size:clamp(40px,8vw,104px);line-height:0.82;letter-spacing:0.02em;"><span style="display:block;word-break:break-all;">${topPart}</span><span style="display:block;word-break:break-all;">${bottomPart}</span></div>
            </div>
          `;
        overlay.appendChild(imgGhost);
        imgGhosts[index] = {
          imgGhost,
          label: imgGhost.querySelector(".s4-card-label"),
          cardRect,
        };
      });
    }

    setViewMode("list");
    setPendingReveal(true);
    setGridPreview(false);
    setRevealBlack(true);
    setRevealSlow(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!overlay) return finish();

        // Snap the window back to Section 4's top *before* we measure the list
        // and hand off to it. The pinned list ScrollTrigger is (re)created once
        // pendingReveal flips to false; if the scroll isn't exactly at the
        // section top at that moment, ScrollTrigger's first refresh yanks the
        // scroll to align progress 0 -> that yank was the remaining jhatka.
        // Doing it here (list hidden, only the fixed ghosts are visible) is
        // invisible and keeps the ghost -> real-row handoff pixel-accurate.
        const section = sectionRef.current;
        if (
          section &&
          typeof window !== "undefined" &&
          window.innerWidth >= 768
        ) {
          window.scrollTo({ top: section.offsetTop, behavior: "auto" });
        }

        // Position the (still hidden) list at the pinned start offset first, so
        // the destination rects we measure below match where the real rows end
        // up — the ghost text hands off to the real text with no jump.
        applyListStartY();

        const tl = gsap.timeline({
          onComplete: () => {
            // Reveal the real list — it now fades in via the container's
            // opacity transition, so the active preview image glides in
            // instead of popping. Keep the ghosts on top during that fade so
            // the text doesn't flicker, then drop them once the list is fully
            // in (matches the 500ms container transition).
            finish();
            window.setTimeout(() => {
              overlay.innerHTML = "";
              // Release the "all black" hold: inactive rows now ease from
              // black -> transparent over the long transition below.
              setRevealBlack(false);
              window.setTimeout(() => setRevealSlow(false), 900);
            }, 520);
          },
        });

        const makeText = (rect, fontSize, text) => {
          const el = document.createElement("div");
          Object.assign(el.style, {
            position: "fixed",
            left: `${rect.left}px`,
            top: `${rect.top}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: '"League Spartan", sans-serif',
            fontWeight: "600",
            textTransform: "uppercase",
            color: "#000",
            fontSize,
            lineHeight: "1",
            whiteSpace: "nowrap",
            zIndex: 999,
            pointerEvents: "none",
            willChange: "opacity, transform",
          });
          el.textContent = text;
          overlay.appendChild(el);
          return el;
        };

        let built = false;

        services.forEach((service, index) => {
          const g = imgGhosts[index];
          const link = textRefs.current[index];
          if (!g || !link) return;

          // Measure the real destination row so the ghost text matches its
          // final size + position exactly (this is what was popping before —
          // the old ghost used fixed clamp() sizes smaller than the real text).
          const spans = link.querySelectorAll("span");
          const numberEl = spans[0];
          const titleEl = spans[1];
          const numberRect = numberEl?.getBoundingClientRect();
          const titleRect = titleEl?.getBoundingClientRect();
          const numberFS = numberEl ? getComputedStyle(numberEl).fontSize : "24px";
          const titleFS = titleEl ? getComputedStyle(titleEl).fontSize : "48px";

          const { imgGhost, label, cardRect } = g;

          // Small square beside the title where the card image collapses to
          // (mirror of runListToGrid's starting thumb).
          const h = titleRect ? titleRect.height * 0.72 : 80;
          const thumbRect = {
            left: titleRect ? titleRect.right + 24 : cardRect.left,
            top: titleRect ? titleRect.top + titleRect.height / 2 - h / 2 : cardRect.top,
            width: h,
            height: h,
          };

          built = true;

          const numberGhost = numberRect ? makeText(numberRect, numberFS, service.number) : null;
          const titleGhost = titleRect ? makeText(titleRect, titleFS, service.title) : null;
          if (numberGhost) gsap.set(numberGhost, { opacity: 0, y: -12 });
          if (titleGhost) gsap.set(titleGhost, { opacity: 0, y: -12 });

          const move = index * 0.05; // 1) card collapses to thumb
          const labelOut = move; // card label fades as it shrinks
          const imgOut = move + 0.34; // image fades out once small
          const textIn = move + 0.3; // 2) list text drops back in

          if (label)
            tl.to(label, { opacity: 0, duration: 0.3, ease: "power1.in" }, labelOut);

          // GPU transforms (x/y) instead of left/top; width/height still change
          // so the image crops correctly as it shrinks.
          tl.to(
            imgGhost,
            {
              x: thumbRect.left - cardRect.left,
              y: thumbRect.top - cardRect.top,
              width: thumbRect.width,
              height: thumbRect.height,
              duration: 0.72,
              ease: "power3.inOut",
              force3D: true,
              autoRound: false,
            },
            move
          );
          tl.to(imgGhost, { opacity: 0, duration: 0.32, ease: "power1.inOut" }, imgOut);

          if (numberGhost)
            tl.to(numberGhost, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, textIn);
          if (titleGhost)
            tl.to(titleGhost, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, textIn);
        });

        if (!built) {
          overlay.innerHTML = "";
          finish();
        }
      });
    });
  };

  // Choreographed list -> grid transition:
  //   1) the big list text fades (lifts) away first,
  //   2) the hover thumbnails grow + travel into their grid-card slots,
  //   3) the card label (number + title) fades in once the card has landed.
  const runListToGrid = () => {
    // Capture list geometry *now*, while the hover thumbnails are still on
    // screen (before React swaps the DOM over to the grid).
    const fromData = services.map((service, index) => {
      const link = textRefs.current[index] || itemRefs.current[index]?.querySelector("a");
      if (!link) return null;

      // Only the two label spans live inside the <a>; the active-row image
      // overlay spans are siblings, so this stays limited to number + title.
      const spans = link.querySelectorAll("span");
      const numberEl = spans[0];
      const titleEl = spans[1];
      const numberRect = numberEl?.getBoundingClientRect();
      const titleRect = titleEl?.getBoundingClientRect();
      const numberFS = numberEl ? getComputedStyle(numberEl).fontSize : "24px";
      const titleFS = titleEl ? getComputedStyle(titleEl).fontSize : "48px";

      const thumb = thumbRefs.current[index];
      let thumbRect = thumb?.getBoundingClientRect();
      // If the preview wasn't hovered (thumb collapsed to 0px), start the image
      // as a small square just to the right of the title so it still animates.
      if (!thumbRect || thumbRect.width < 4) {
        const h = titleRect ? titleRect.height * 0.72 : 80;
        thumbRect = {
          left: titleRect ? titleRect.right + 24 : 0,
          top: titleRect ? titleRect.top + titleRect.height / 2 - h / 2 : 0,
          width: h,
          height: h,
        };
      }

      return { numberRect, titleRect, numberFS, titleFS, thumbRect };
    });

    const overlay = overlayRef.current;

    const finish = () => {
      setPendingReveal(false);
      isAnimatingRef.current = false;
    };

    const makeText = (rect, fontSize, text) => {
      const el = document.createElement("div");
      Object.assign(el.style, {
        position: "fixed",
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '"League Spartan", sans-serif',
        fontWeight: "600",
        textTransform: "uppercase",
        color: "#000",
        fontSize,
        lineHeight: "1",
        whiteSpace: "nowrap",
        zIndex: 999,
        pointerEvents: "none",
        willChange: "opacity, transform",
      });
      el.textContent = text;
      overlay.appendChild(el);
      return el;
    };

    // Phase A — build the ghosts over the still-visible list *before* swapping
    // to the grid, so the very first painted frame already shows them (this
    // removes the blank/blink at the moment of the click).
    const ghosts = [];
    if (overlay) {
      overlay.innerHTML = "";
      services.forEach((service, index) => {
        const from = fromData[index];
        if (!from) return;
        const thumbRect = from.thumbRect;

        const numberGhost = from.numberRect
          ? makeText(from.numberRect, from.numberFS, service.number)
          : null;
        const titleGhost = from.titleRect
          ? makeText(from.titleRect, from.titleFS, service.title)
          : null;

        const imgGhost = document.createElement("div");
        Object.assign(imgGhost.style, {
          position: "fixed",
          left: `${thumbRect.left}px`,
          top: `${thumbRect.top}px`,
          width: `${thumbRect.width}px`,
          height: `${thumbRect.height}px`,
          overflow: "hidden",
          zIndex: 1000,
          pointerEvents: "none",
          transformOrigin: "top left",
          willChange: "transform, width, height",
          backfaceVisibility: "hidden",
          background: "#f4f3f1",
        });
        const [topPart, bottomPart] = splitTitleParts(service.title);
        imgGhost.innerHTML = `
            <img src="${service.image}" style="width:100%;height:100%;object-fit:cover;display:block" />
            <div class="s4-card-label" style="position:absolute;inset:0;opacity:0">
              <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,.7), rgba(0,0,0,0) 55%)"></div>
              <span style="position:absolute;left:24px;top:24px;color:#fff;font-family:'League Spartan',sans-serif;font-weight:600;text-transform:uppercase;font-size:clamp(15px,1.6vw,22px);white-space:nowrap;">${service.number}</span>
              <div style="position:absolute;left:24px;right:24px;bottom:40px;display:flex;flex-direction:column;color:rgba(255,255,255,0.4);-webkit-text-stroke:1px rgba(255,255,255,0.25);font-family:'League Spartan',sans-serif;font-weight:600;text-transform:uppercase;font-size:clamp(40px,8vw,104px);line-height:0.82;letter-spacing:0.02em;"><span style="display:block;word-break:break-all;">${topPart}</span><span style="display:block;word-break:break-all;">${bottomPart}</span></div>
            </div>
          `;
        overlay.appendChild(imgGhost);
        ghosts[index] = {
          numberGhost,
          titleGhost,
          imgGhost,
          label: imgGhost.querySelector(".s4-card-label"),
          thumbRect,
        };
      });
    }

    setViewMode("grid");
    setPendingReveal(true);
    setGridPreview(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!overlay) return finish();
        const cards = gridCardRefs.current;

        // The list view pins Section 4, so by the time the user reaches the
        // last row the window is scrolled far past the section's natural
        // position. Switching to grid removes the pin (and its spacer), which
        // would otherwise drop the viewport onto the sections below. Snap the
        // scroll back to Section 4's top — the pinned list was already sitting
        // at the top of the viewport, so this keeps the transition seamless.
        const section = sectionRef.current;
        if (section) {
          window.scrollTo({ top: section.offsetTop, behavior: "auto" });
        }

        const tl = gsap.timeline({
          onComplete: () => {
            finish();
            requestAnimationFrame(() => {
              overlay.innerHTML = "";
            });
          },
        });

        let built = false;

        services.forEach((service, index) => {
          const g = ghosts[index];
          const card = cards[index];
          if (!g || !card) return;
          const cardRect = card.getBoundingClientRect();
          const { numberGhost, titleGhost, imgGhost, label, thumbRect } = g;
          built = true;

          const textOut = index * 0.03; // 1) list text lifts away
          const move = 0.26 + index * 0.055; // 2) thumbnail -> card
          const labelIn = move + 0.42; // 3) card label fades in

          if (numberGhost)
            tl.to(numberGhost, { opacity: 0, y: -12, duration: 0.32, ease: "power2.in" }, textOut);
          if (titleGhost)
            tl.to(titleGhost, { opacity: 0, y: -12, duration: 0.32, ease: "power2.in" }, textOut);

          tl.to(
            imgGhost,
            {
              x: cardRect.left - thumbRect.left,
              y: cardRect.top - thumbRect.top,
              width: cardRect.width,
              height: cardRect.height,
              duration: 0.72,
              ease: "power3.inOut",
              force3D: true,
              autoRound: false,
            },
            move
          );

          tl.fromTo(label, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out" }, labelIn);
        });

        if (!built) {
          overlay.innerHTML = "";
          finish();
        }
      });
    });
  };

  const handleViewChange = (mode) => {
    if (mode === viewMode || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    if (mode === "grid") {
      runListToGrid();
    } else {
      setGridPreview(false);
      runGridToList();
    }
  };

  // Pinned scroll-driven list — only active while viewMode === "list".
  useLayoutEffect(() => {
    if (viewMode !== "list") return;

    let frame = 0;

    const updateActive = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestSlug = services[0].slug;
      let closestDistance = Infinity;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSlug = services[index].slug;
        }
      });

      setActiveSlug((current) => (current === closestSlug ? current : closestSlug));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // While a morph is in flight the list is hidden and covered by the ghost
    // clones. Setting up the pinned ScrollTrigger here (pin-spacer insertion +
    // full ScrollTrigger.refresh reflow) mid-animation is what caused the lag,
    // so we skip it until the morph has finished (pendingReveal -> false).
    if (pendingReveal) {
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }

    const section = sectionRef.current;
    const pin = pinRef.current;
    const list = listRef.current;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (!section || !pin || !list) return;

      const getStartY = () => {
        const first = itemRefs.current[0];
        if (!first) return 0;

        return pin.offsetHeight * 0.30 - (first.offsetTop + first.offsetHeight / 2);
      };

      const getEndY = () => {
        const items = itemRefs.current.filter(Boolean);
        const last = items[items.length - 1];
        if (!last) return getStartY();

        // Stop when last text sits on the image center
        return pin.offsetHeight * 0.5 - (last.offsetTop + last.offsetHeight / 2);
      };

      const applyStartY = () => {
        gsap.set(list, { y: getStartY() });
      };

      applyStartY();

      const tween = gsap.to(list, {
        y: () => getEndY(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(Math.abs(getStartY() - getEndY()), window.innerHeight)}`,
          scrub: true,
          pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: applyStartY,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(list, { clearProps: "transform" });
      };
    });

    mm.add("(max-width: 767px)", () => {
      if (!section) return;

      const items = itemRefs.current.filter(Boolean);
      if (!items.length) return;

      const tweens = items.map((item, index) => {
        const dir = index % 2 === 0 ? -1 : 1;
        gsap.set(item, { force3D: true });
        return gsap.fromTo(
          item,
          { x: dir * -8 },
          {
            x: dir * 8,
            ease: "power1.inOut",
            force3D: true,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      return () => {
        tweens.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
        items.forEach((item) => gsap.set(item, { clearProps: "x" }));
      };
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mm.revert();
    };
  }, [viewMode, pendingReveal]);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-white ${
        viewMode === "grid"
          ? "px-0 py-0"
          : "px-8 py-[35px] md:px-12 md:py-[6vh]"
      }`}
    >
      <style>{`
        @media (min-width: 768px) {
          .section4-row-link-active {
            -webkit-mask-image: ${ROW_CLIP_MASK};
            mask-image: ${ROW_CLIP_MASK};
          }
        }
        @media (max-width: 767px) {
          .section4-row-text {
            color: #000000 !important;
          }
          .section4-row-number {
            font-size: 10px !important;
          }
        }
        @keyframes section4-mobile-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-section4-mobile-marquee {
          animation: section4-mobile-marquee 45s linear infinite;
        }
      `}</style>

      {/* Fixed-position layer that hosts the transient "ghost" clones used to
          morph list rows into grid cards (and back) — lives outside pinRef so
          it's never affected by the list's pin transform. */}
      <div ref={overlayRef} className="pointer-events-none fixed inset-0 z-[999]" />

      {viewMode === "list" ? (
        <div
          ref={pinRef}
          className={`relative isolate mx-auto flex w-full max-w-8xl flex-col items-center overflow-x-visible overflow-y-visible transition-opacity duration-500 ease-out md:h-[88dvh] md:overflow-hidden ${
            pendingReveal ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          {/* Toggle lives inside the pinned area so it stays anchored to the
              bottom of Section 4 (absolute, not viewport-fixed). */}
          <div className="absolute bottom-4 left-0 z-[60] hidden md:block md:bottom-6">
            <ViewToggle
              viewMode={viewMode}
              onChange={handleViewChange}
              onGridHover={handleGridHover}
            />
          </div>

          <div
            className={`pointer-events-none absolute left-1/2 top-[42%] z-0 hidden -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 md:block ${
              showGridPreview ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              key={activeService.slug}
              src={activeService.image}
              alt=""
              className="block h-auto w-[min(300px,26vw)] object-contain shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
            />
          </div>

          <MobileImageSlider activeSlug={activeSlug} onActiveChange={setActiveSlug} />

          <ul
            ref={listRef}
            className="relative z-[30] m-0 flex w-full list-none flex-col items-center gap-0 p-0 md:gap-2 lg:gap-2"
          >
            {services.map((service, index) => {
              const isActive = activeSlug === service.slug;

              return (
                <li
                  key={service.slug}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className={`relative w-full text-center${
                    service.shiftClass ??
                    shiftClassByValue[String(service.xlShift)] ??
                    ""
                  }`}
                >
                  <div className="relative inline-flex items-baseline justify-center">
                    <span
                      ref={(node) => {
                        textRefs.current[index] = node;
                      }}
                      className={`relative z-10 cursor-default pointer-events-none select-none ${linkRowClass}${
                        isActive && !showGridPreview ? " section4-row-link-active" : ""
                      }`}
                    >
                      <span
                        className="section4-row-text section4-row-number shrink-0 transition-colors duration-300"
                        style={{
                          ...numberStyle,
                          color:
                            isActive || showGridPreview || revealBlack
                              ? "#000000"
                              : "#00000005",
                          transitionDuration: revealSlow ? "800ms" : undefined,
                        }}
                      >
                        {service.number}
                      </span>
                      <span
                        className="section4-row-text text-[37px] transition-colors duration-300 md:text-[50px] lg:text-[70px] xl:text-[106px]"
                        style={{
                          ...titleStyle,
                          color:
                            isActive || showGridPreview || revealBlack
                              ? "#000000"
                              : "#00000005",
                          transitionDuration: revealSlow ? "800ms" : undefined,
                        }}
                      >
                        {service.title}
                      </span>
                    </span>

                    {/* Thumbnail preview that slides in beside the title when the
                        GRID tab is hovered — a peek at the grid content. */}
                    <span
                      aria-hidden="true"
                      ref={(node) => {
                        thumbRefs.current[index] = node;
                      }}
                      className={`z-10 hidden shrink-0 self-center overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out md:block ${
                        showGridPreview
                          ? "ml-4 w-[64px] opacity-100 lg:ml-6 lg:w-[88px]"
                          : "ml-0 w-0 opacity-0"
                      }`}
                      style={{ transitionDelay: showGridPreview ? `${index * 45}ms` : "0ms" }}
                    >
                      <img
                        src={service.image}
                        alt=""
                        draggable={false}
                        className="block h-[64px] w-[64px] object-cover lg:h-[88px] lg:w-[88px]"
                      />
                    </span>

                    {isActive && !showGridPreview ? (
                      <div
                        className="pointer-events-none absolute inset-0 z-20 hidden items-baseline justify-center md:flex"
                        style={{
                          maskImage: IMAGE_TEXT_MASK,
                          WebkitMaskImage: IMAGE_TEXT_MASK,
                        }}
                      >
                        <span className={linkRowClass}>
                          <span
                            className="shrink-0"
                            style={{
                              ...numberStyle,
                              ...imageOverlayTextStyle,
                              backgroundImage: `url(${service.image})`,
                            }}
                          >
                            {service.number}
                          </span>
                          <span
                            className="text-[30px] md:text-[50px] lg:text-[70px] xl:text-[106px]"
                            style={{
                              ...titleStyle,
                              ...imageOverlayTextStyle,
                              backgroundImage: `url(${service.image})`,
                            }}
                          >
                            {service.title}
                          </span>
                        </span>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div
          className={`relative flex w-full flex-col items-start justify-center gap-8 px-8 py-10 md:h-[100dvh] md:px-12 md:py-0 ${
            pendingReveal ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <GridSlider cardRefs={gridCardRefs} />

          <div className="z-[60] hidden w-full md:flex">
            <ViewToggle
              viewMode={viewMode}
              onChange={handleViewChange}
              onGridHover={handleGridHover}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Section4;