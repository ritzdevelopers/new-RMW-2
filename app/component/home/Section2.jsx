"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const headingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 700,
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const bodyStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontStyle: "italic",
  fontSize: "22px",
  lineHeight: "30px",
  letterSpacing: "0",
  color: "#FFFFFF",
};

const aboutButtonTextStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "capitalize",
};

const Section2 = () => {
  const sectionRef = useRef(null);
  const [GridScan, setGridScan] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let cancelled = false;
    let idleId = 0;
    let timeoutId = 0;
    let stopObserve = () => {};

    const load = () => {
      import("@/components/GridScan").then((mod) => {
        if (!cancelled) setGridScan(() => mod.GridScan);
      });
    };

    const boot = () => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          if ("requestIdleCallback" in window) {
            idleId = window.requestIdleCallback(load, { timeout: 1800 });
          } else {
            timeoutId = window.setTimeout(load, 200);
          }
        },
        { rootMargin: "160px 0px" }
      );
      observer.observe(el);
      stopObserve = () => observer.disconnect();
    };

    if (window.__rmwLoaderDone) {
      boot();
    } else {
      window.addEventListener("rmw:loader-done", boot, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("rmw:loader-done", boot);
      stopObserve();
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-8 py-[35px] md:px-12 md:py-[70px]"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0F0E14]" aria-hidden />
        {GridScan ? (
          <GridScan
            className="absolute inset-0"
            style={{ width: "100%", height: "100%" }}
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#5A5568"
            gridScale={0.1}
            scanColor="#4DA6FF"
            scanOpacity={0.4}
            enablePost
            bloomIntensity={0.6}
            chromaticAberration={0.002}
            noiseIntensity={0.01}
            lineJitter={0.1}
            scanGlow={0.5}
            scanSoftness={2}
            enableWebcam={false}
            showPreview={false}
          />
        ) : null}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-8xl">
        <div className="grid grid-cols-1 justify-items-center md:grid-cols-[1fr_auto] md:items-start md:justify-items-stretch md:gap-x-6">
          <h1
            className="m-0 min-w-0 w-full text-center text-[28px] md:col-start-1 md:row-start-1 md:text-left md:text-[30px] lg:text-[48px]"
            style={headingStyle}
          >
            Creative Advertising, Branding & Digital <br className="md:hidden lg:block"/> Marketing Agency in India
          </h1>

          <p
            className="m-0 mt-5 w-full text-center md:col-span-2 md:row-start-2 md:text-left xl:max-w-[1150px] lg:max-w-[800px] md:max-w-[800px]"
            style={bodyStyle}
          >
           18 years of transforming brands through creativity, strategy & innovation
          </p>

          <Link
            href="/about.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-5 flex shrink-0 cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-white py-2.5 pl-5 pr-2 shadow-[0_6px_24px_rgba(0,0,0,0.22)] md:col-start-2 md:row-start-1 md:mt-0 md:justify-self-end md:gap-2.5 md:py-2 md:pl-6 md:pr-2"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-left scale-x-0 rounded-full bg-[#1D1D1B] transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
            />
            <span
              className="relative z-10 text-[#1D1D1B] transition-colors duration-300 group-hover:text-white"
              style={aboutButtonTextStyle}
            >
              About Us
            </span>
            <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1D1B] text-white transition-[background-color,color,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 group-hover:bg-white group-hover:text-[#1D1D1B] md:h-9 md:w-9">
              <i
                className="ri-arrow-right-up-line text-[14px] md:text-[16px]"
                aria-hidden
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section2;
