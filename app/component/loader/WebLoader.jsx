"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const LOADER_SESSION_KEY = "rmwLoaderShown";

 
const DEFAULT_IMAGES = [
    
  "/loder/loader_i6.jpg",
  "/loder/loader_i1.jpg",
  "/loder/loader_i2.jpg",
  "/loder/loader_i4.jpg",
  
  "/loder/loader_i3.jpg",
];

// Desktop image window grows from the first size to the last (in px).
const IMG_START_W = 238;
const IMG_START_H = 188;
const IMG_END_W = 546;
const IMG_END_H = 487;

const isMobileViewport = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches;

/** Mobile: stay inside the screen - modest start size, taller end size (not full-bleed). */
const getImageSizeRange = () => {
  if (!isMobileViewport()) {
    return {
      startW: IMG_START_W,
      startH: IMG_START_H,
      endW: IMG_END_W,
      endH: IMG_END_H,
    };
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const maxW = vw * 0.58;
  const maxH = vh * 0.4;

  const startW = Math.min(132, maxW * 0.55);
  const startH = startW * 1.22;
  const endW = Math.min(maxW, startW * 1.7);
  const endH = Math.min(maxH, endW * 1.28);

  return { startW, startH, endW, endH };
};

function WebLoader({
  topText = "Ritz",
  bottomText = "MediaWorld",
  images = DEFAULT_IMAGES,
  introHoldMs = 350,
  intervalMs = 850,
  onComplete = () => {},
  children,
}) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("intro"); // intro -> loading -> revealing -> done

  const overlayRef = useRef(null);
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);
  const frameRef = useRef(null); // centered image window (sized in px)
  const imgRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const skippedRef = useRef(false);
  const sizeRangeRef = useRef(null);
  const isMobileRef = useRef(false);

  // Show the loader only the first time per browser session. If it has already
  // played, skip straight to "done" before paint (no flash) on later visits.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    isMobileRef.current = isMobileViewport();
    sizeRangeRef.current = getImageSizeRange();
    if (window.sessionStorage.getItem(LOADER_SESSION_KEY) === "1") {
      skippedRef.current = true;
      setPhase("done");
    }
  }, []);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sizeAt = (i) => {
    const range = sizeRangeRef.current ?? getImageSizeRange();
    const n = images.length;
    const t = n <= 1 ? 1 : Math.min(Math.max(i / (n - 1), 0), 1);
    return {
      w: range.startW + (range.endW - range.startW) * t,
      h: range.startH + (range.endH - range.startH) * t,
    };
  };

  useEffect(() => {
    if (skippedRef.current) return;
    const first = sizeAt(0);
    gsap.set(frameRef.current, {
      left: "50%",
      top: "50%",
      xPercent: -50,
      yPercent: -50,
      width: 0,
      height: 0,
      opacity: 0,
    });
    gsap.set(topTextRef.current, {
      left: "50%",
      top: "50%",
      xPercent: -100,
      yPercent: -50,
      x: 0,
      y: 0,
      opacity: 1,
    });
    gsap.set(bottomTextRef.current, {
      left: "50%",
      top: "50%",
      xPercent: 0,
      yPercent: -50,
      x: 0,
      y: 0,
      opacity: 1,
    });

    if (reduceMotion) {
      gsap.set(topTextRef.current, { yPercent: -100, x: -first.w / 2, y: -first.h / 2 });
      gsap.set(bottomTextRef.current, { yPercent: 0, x: first.w / 2, y: first.h / 2 });
      gsap.set(frameRef.current, { width: first.w, height: first.h, opacity: 1 });
      setPhase("loading");
      return;
    }

    const tl = gsap.timeline({
      delay: introHoldMs / 1000,
      onComplete: () => setPhase("loading"),
    });

    tl.to(
      topTextRef.current,
      { yPercent: -100, x: -first.w / 2, y: -first.h / 2, duration: 0.4, ease: "power3.inOut" },
      0
    )
      .to(
        bottomTextRef.current,
        { yPercent: 0, x: first.w / 2, y: first.h / 2, duration: 0.4, ease: "power3.inOut" },
        0
      )
      .to(
        frameRef.current,
        { width: first.w, height: first.h, duration: 0.4, ease: "power3.inOut" },
        0
      )
      .to(frameRef.current, { opacity: 1, duration: 0.35, ease: "power2.out" }, 0.15);
  }, []);

  useEffect(() => {
    if (phase === "intro") return;
    if (reduceMotion || !imgRef.current) return;

    gsap.fromTo(
      imgRef.current,
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
    );

    const { w, h } = sizeAt(index);
    const dur = Math.min(intervalMs / 1000, 0.4);

    gsap.to(frameRef.current, { width: w, height: h, duration: dur, ease: "sine.inOut" });
    gsap.to(topTextRef.current, { x: -w / 2, y: -h / 2, duration: dur, ease: "sine.inOut" });
    gsap.to(bottomTextRef.current, { x: w / 2, y: h / 2, duration: dur, ease: "sine.inOut" });

    if (counterRef.current) {
      const pct = Math.round(((index + 1) / images.length) * 100);
      gsap.to(counterRef.current, {
        innerText: pct,
        duration: 0.4,
        snap: { innerText: 1 },
      });
    }
    if (barRef.current) {
      gsap.to(barRef.current, {
        scaleX: (index + 1) / images.length,
        duration: 0.5,
        ease: "power3.inOut",
        transformOrigin: "left center",
      });
    }
  }, [index]);

  // Advance through images, then trigger the reveal
  useEffect(() => {
    if (phase !== "loading") return;

    const timer = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= images.length) {
          clearInterval(timer);
          setPhase("revealing");
          return prev;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [phase, images.length, intervalMs]);

  // Final reveal sequence
  useEffect(() => {
    if (phase !== "revealing") return;

    if (reduceMotion) {
      setPhase("done");
      onComplete?.();
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        setPhase("done");
        onComplete?.();
      },
    });

    const mobile = isMobileRef.current;
    const last = sizeAt(images.length - 1);

    // Mobile: keep the frame on-screen (slight grow only). Desktop: full-bleed reveal.
    if (mobile) {
      tl.to(frameRef.current, {
        width: last.w * 1.08,
        height: last.h * 1.08,
        duration: 0.45,
      })
        .to(
          topTextRef.current,
          { x: "-=48", y: "-=48", opacity: 0, duration: 0.4 },
          "<",
        )
        .to(
          bottomTextRef.current,
          { x: "+=48", y: "+=48", opacity: 0, duration: 0.4 },
          "<",
        )
        .to([counterRef.current, barRef.current], { opacity: 0, duration: 0.25 }, "<")
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.45,
          ease: "power2.inOut",
        });
    } else {
      tl.to(frameRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        duration: 0.6,
      })
        .to(
          topTextRef.current,
          { x: "-=160", y: "-=160", opacity: 0, duration: 0.45 },
          "<",
        )
        .to(
          bottomTextRef.current,
          { x: "+=160", y: "+=160", opacity: 0, duration: 0.45 },
          "<",
        )
        .to([counterRef.current, barRef.current], { opacity: 0, duration: 0.3 }, "<")
        .to(overlayRef.current, {
          opacity: 0,
          scale: 1.04,
          duration: 0.5,
          ease: "power2.inOut",
        });
    }
  }, [phase]);

  // Broadcast when the loader is finished so the rest of the site (e.g. the
  // home hero video) can wait for it and only then start playing.
  useEffect(() => {
    if (phase !== "done" || typeof window === "undefined") return;
    window.sessionStorage.setItem(LOADER_SESSION_KEY, "1");
    window.__rmwLoaderDone = true;
    window.dispatchEvent(new Event("rmw:loader-done"));
  }, [phase]);

  return (
    <>
      {children}

      {phase !== "done" && (
        <div ref={overlayRef} style={styles.overlay}>
          <span ref={topTextRef} style={styles.topText}>
            {topText}
          </span>
          <span ref={bottomTextRef} style={styles.bottomText}>
            {bottomText}
          </span>

          <div ref={frameRef} style={styles.frame}>
            <img
              key={index}
              ref={imgRef}
              src={images[index]}
              alt=""
              style={styles.image}
              draggable={false}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "low"}
            />
          </div>

          {phase !== "intro" && (
            <div style={styles.footer}>
              <span style={styles.footerLabel}>LOADING</span>
              <div style={styles.barTrack}>
                <div ref={barRef} style={styles.barFill} />
              </div>
              <span style={styles.counter}>
                <span ref={counterRef}>0</span>%
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "#0a0a0a",
    color: "#f5f5f0",
    overflow: "hidden",
    fontFamily: "'Helvetica Neue', Arial, 'Segoe UI', sans-serif",
  },
  topText: {
    position: "absolute",
    fontSize: "clamp(1rem, 3vw, 2.6rem)",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: 0.9,
    textTransform: "uppercase",
    margin: 0,
    opacity: 0,
    whiteSpace: "nowrap",
    willChange: "transform",
  },
  bottomText: {
    position: "absolute",
    fontSize: "clamp(1rem, 3vw, 2.6rem)",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: 0.9,
    textTransform: "uppercase",
    textAlign: "left",
    margin: 0,
    opacity: 0,
    whiteSpace: "nowrap",
    willChange: "transform",
  },
  frame: {
    position: "absolute", 
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
    background: "#141414",
  },
  image: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  footer: {
    position: "absolute",
    left: "clamp(1rem, 4vw, 3rem)",
    bottom: "clamp(0.75rem, 2vh, 1.25rem)",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
  },
  footerLabel: {
    opacity: 0.6,
  },
  barTrack: {
    width: "clamp(80px, 12vw, 160px)",
    height: "2px",
    background: "rgba(245,245,240,0.2)",
  },
  barFill: {
    width: "100%",
    height: "100%",
    background: "#f5f5f0",
    transform: "scaleX(0)",
  },
  counter: {
    fontVariantNumeric: "tabular-nums",
    opacity: 0.8,
  },
};

export default WebLoader;
