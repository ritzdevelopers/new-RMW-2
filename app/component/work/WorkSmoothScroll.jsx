"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { refreshFooterScroll } from "@/lib/footerRefresh";

gsap.registerPlugin(ScrollTrigger);

function getLenisOptions() {
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isNarrowScreen = window.matchMedia("(max-width: 1024px)").matches;

  if (isCoarsePointer || isNarrowScreen) {
    return {
      lerp: 0.14,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.15,
      wheelMultiplier: 0.9,
    };
  }

  return {
    lerp: 0.09,
    smoothWheel: true,
    syncTouch: true,
    touchMultiplier: 1,
    wheelMultiplier: 1,
  };
}

export default function WorkSmoothScroll({ children }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis(getLenisOptions());
    const scroller = document.documentElement;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const onTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTicker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scroller.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.defaults({ scroller });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const refreshScroll = () => {
      lenis.resize();
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      refreshFooterScroll();
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(refreshScroll);
    });
    window.addEventListener("load", refreshScroll, { once: true });
    window.addEventListener("resize", refreshScroll);

    const refreshTimer = window.setTimeout(refreshScroll, 600);
    const lateRefreshTimer = window.setTimeout(refreshScroll, 1600);

    return () => {
      window.clearTimeout(refreshTimer);
      window.clearTimeout(lateRefreshTimer);
      window.removeEventListener("resize", refreshScroll);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(onTicker);
      lenis.destroy();
      ScrollTrigger.scrollerProxy(scroller, {});
      ScrollTrigger.defaults({ scroller: undefined });
      ScrollTrigger.refresh();
    };
  }, []);

  return children;
}
