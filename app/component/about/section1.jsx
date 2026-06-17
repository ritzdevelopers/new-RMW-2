"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mixtaPro = "font-['MixtaPro']";
const sequelFontFamily = '"Sequel Sans"';
const goldColor = "#FFD188";

const headingStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 365,
  fontSize: "94px",
  lineHeight: "71px",
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

const subHeadingStyle = {
  fontFamily: sequelFontFamily,
  fontWeight: 300,
  fontSize: "48px",
  // lineHeight: "34px",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#1D1D1B",
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

const Letter = ({ children }) => (
  <span className="inline-block shrink-0">{children}</span>
);

const Section1 = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const disruptionRef = useRef(null);
  const filmRef = useRef(null);
  const heroSectionRef = useRef(null);
  const videoFloatRef = useRef(null);
  const videoSlotRef = useRef(null);
  const videoEntranceRef = useRef(0);
  const videoRevealStartedRef = useRef(false);

  const getStartSize = () => {
    const video = videoFloatRef.current?.querySelector("video");
    const width = Math.min(1044, window.innerWidth - 32);
    let height = width * (9 / 16);

    if (video?.videoWidth && video?.videoHeight) {
      height = width * (video.videoHeight / video.videoWidth);
    }

    return { width, height };
  };

  const computeVideoBounds = () => {
    const container = heroRef.current;
    const slot = videoSlotRef.current;
    const heroSection = heroSectionRef.current;
    if (!container || !slot || !heroSection) return null;

    const cRect = container.getBoundingClientRect();
    const sRect = slot.getBoundingClientRect();
    const startSize = getStartSize();
    const sectionBottom = heroSection.offsetTop + heroSection.offsetHeight;

    return {
      start: {
        x: window.innerWidth / 2 - cRect.left,
        y: sectionBottom - startSize.height / 2 + 330,
        width: startSize.width,
        height: startSize.height,
        clipTop: 0,
      },
      end: {
        x: sRect.left + sRect.width / 2 - cRect.left,
        y: sRect.top + sRect.height / 2 - cRect.top,
        width: sRect.width,
        height: sRect.height,
        clipTop: 0,
      },
    };
  };

  const applyVideoProgress = (progress, entranceProgress) => {
    const floater = videoFloatRef.current;
    const bounds = computeVideoBounds();
    if (!floater || !bounds) return;

    const logo = floater.querySelector("[data-about-hero-logo]");
    const logoImg = logo?.querySelector("img");

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
      clipPath: clipTop > 0 ? `inset(${clipTop}% 0% 0% 0%)` : "none",
      borderRadius: t > 0 ? gsap.utils.interpolate(24, 20, t) : gsap.utils.interpolate(0, 10, entrance),
    });

    const video = floater.querySelector("video");
    if (video) {
      gsap.set(video, { clearProps: "scale,height" });
    }

    if (logo && logoImg) {
      const logoHeightPct = 58;
      const logoOpacity = t > 0 ? gsap.utils.interpolate(1, 0, t) : entrance;
      gsap.set(logo, {
        visibility: t >= 0.98 ? "hidden" : "visible",
        opacity: logoOpacity,
      });
      gsap.set(logoImg, {
        top: `calc(${clipTop}% + 30px)`,
        height: `${logoHeightPct}%`,
        width: "auto",
        left: "50%",
        xPercent: -50,
      });
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
      const parent = disruption?.parentElement;
      if (!disruption || !parent) return;

      disruption.style.transform = "none";
      const rows = disruption.querySelectorAll("[data-headline-row]");
      let needed = 0;
      rows.forEach((row) => {
        needed = Math.max(needed, row.scrollWidth, row.getBoundingClientRect().width);
      });
      const buffer = 48;
      const available = parent.clientWidth - buffer;
      const scale = needed > 0 ? Math.min(1, available / needed) : 1;
      disruption.style.transform = scale < 1 ? `scale(${scale})` : "none";
      disruption.style.transformOrigin = "top center";
    };

    const fitAll = () => {
      fitHeadline();
      fitDisruption();
    };

    let onHeaderComplete = null;
    let metadataVideo = null;
    let onVideoMetadata = null;

    const ctx = gsap.context(() => {
      const headlineItems = gsap.utils.toArray("[data-about-reveal='headline']", hero);
      const subItems = gsap.utils.toArray("[data-about-reveal='sub']", hero);
      const logoEl = hero.querySelector("[data-about-hero-logo]");
      const introItems = gsap.utils.toArray("[data-about-reveal='intro']", hero);
      const disruptionItems = gsap.utils.toArray("[data-about-reveal='disruption']", hero);

      gsap.set(headlineItems, { yPercent: -110 });
      gsap.set(subItems, { yPercent: -110, opacity: 0 });
      if (logoEl) gsap.set(logoEl, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(introItems, { yPercent: -110 });
      gsap.set(disruptionItems, { yPercent: -110 });

      const playHeroEntrance = () => {
        const entrance = { value: 0 };
        videoEntranceRef.current = 0;
        videoRevealStartedRef.current = true;
        applyVideoProgress(0, 0);

        const tl = gsap.timeline({
          onComplete: () => {
            videoEntranceRef.current = 1;
            fitAll();
            applyVideoProgress(0, 1);
          },
        });

        headlineItems.forEach((item, index) => {
          tl.to(
            item,
            { yPercent: 0, duration: 2, ease: "power4.out" },
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

        if (logoEl) {
          tl.set(logoEl, { visibility: "visible" }, 0);
        }

        tl.to(
          entrance,
          {
            value: 1,
            duration: 2,
            ease: "power4.out",
            onUpdate: () => {
              videoEntranceRef.current = entrance.value;
              applyVideoProgress(0, entrance.value);
            },
          },
          0
        );
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

        introItems.forEach((item, index) => {
          filmTl.to(
            item,
            { yPercent: 0, duration: 2, ease: "power4.out" },
            index === 0 ? 0 : "-=1.65"
          );
        });

        disruptionItems.forEach((item, index) => {
          filmTl.to(
            item,
            { yPercent: 0, duration: 2, ease: "power4.out" },
            index === 0 ? "-=1.2" : "-=1.65"
          );
        });

        filmTl.eventCallback("onComplete", fitAll);
      }

      const floater = videoFloatRef.current;
      const slot = videoSlotRef.current;
      const heroSection = heroSectionRef.current;
      const videoEl = floater?.querySelector("video");

      const refreshVideoLayout = () => {
        applyVideoProgress(
          ScrollTrigger.getAll().find((st) => st.vars?.endTrigger === slot)?.progress ?? 0,
          videoEntranceRef.current
        );
        ScrollTrigger.refresh();
      };

      if (floater && slot && heroSection) {
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
        applyVideoProgress(0, 0);

        ScrollTrigger.create({
          trigger: heroSection,
          start: "top top",
          endTrigger: slot,
          end: "top 55%",
          scrub: 0.85,
          invalidateOnRefresh: true,
          onUpdate: (self) => applyVideoProgress(self.progress, 1),
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
      applyVideoProgress(
        ScrollTrigger.getAll().find((st) => st.vars?.endTrigger === videoSlotRef.current)?.progress ?? 0,
        videoEntranceRef.current
      );
      ScrollTrigger.refresh();
    };

    fitAll();
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
      if (metadataVideo && onVideoMetadata) {
        metadataVideo.removeEventListener("loadedmetadata", onVideoMetadata);
      }
      window.removeEventListener("resize", onResize);
      window.removeEventListener("header-reveal-complete", onHeaderComplete);
      resizeObserver?.disconnect();
      ctx.revert();
    };
  }, []);

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
      `}</style>

      <div ref={heroRef} className="relative overflow-x-hidden">
      <section
        ref={heroSectionRef}
        className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#0D1334] px-8 pt-35px pb-[60px] md:px-12 md:pt-[70px] md:pb-[80px]"
      >
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
          <div className="relative w-screen">
            <h1
              ref={headlineRef}
              style={headingStyle}
              className="m-0 mx-auto w-full text-center"
            >
              <Reveal clipYOnly className="w-full">
                <span className="flex w-full justify-center">
                  <span data-headline-row className="inline-flex items-center justify-center gap-[140px]">
                    <span>17</span>
                    <span>YEARS</span>
                    <span>
                      <span style={{ color: goldColor }}>O</span>F
                    </span>
                  </span>
                </span>
              </Reveal>
              <Reveal clipYOnly className="mt-1 w-full md:mt-8">
                <span className="flex w-full justify-center">
                  <span data-headline-row className="inline-flex items-center justify-center gap-[160px]">
                    <span>MAKING</span>
                    <span>BRANDS</span>
                  </span>
                </span>
              </Reveal>
              <Reveal clipYOnly className="mt-1 w-full overflow-x-visible md:mt-8">
                <span className="flex w-full justify-center overflow-x-visible">
                  <span data-headline-row className="inline-flex items-center justify-center gap-[120px]">
                    <span>
                      <span style={{ color: goldColor }}>IM</span>POSSIBLE
                    </span>
                    <span>TO</span>
                    <span className="pr-[6px]">IGNORE</span>
                  </span>
                </span>
              </Reveal>
            </h1>
          </div>

          <div className={`${mixtaPro} mt-8 max-w-[720px] md:mt-10 lg:mt-5`}>
            <Reveal group="sub">
              <p className="m-0 text-[14px] font-[300] italic leading-[20px] text-white md:text-[20px] md:leading-[28px] lg:text-[28px] lg:leading-[36px]">
                Fuelled by a magnetic culture of hustle and heart, backed
              </p>
            </Reveal>
            <Reveal group="sub" className="mt-1">
              <p className="m-0 text-[14px] font-[300] italic leading-[20px] text-white md:text-[20px] md:leading-[28px] lg:text-[28px] lg:leading-[36px]">
                by the belief that great ideas change the world
              </p>
            </Reveal>
          </div>
        </div>

      </section>

      <div
        ref={videoFloatRef}
        className="pointer-events-none absolute z-30 max-w-[1044px] overflow-hidden rounded-[24px] bg-black shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
        style={{ visibility: "hidden", width: "1044px" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="block h-full w-full origin-center object-cover"
          src="/about/aboutsectionvideo.mp4"
        />
        <div
          data-about-hero-logo
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ visibility: "hidden" }}
        >
          <img
            src="/logo/r-rmw-transparent.png"
            alt=""
            className="absolute block w-auto max-w-[85%] object-contain object-top"
            style={{
              filter: "brightness(3.2) contrast(1.05)",
              opacity: 0.4,
            }}
          />
        </div>
      </div>

      <section ref={filmRef} className="relative overflow-x-hidden bg-[#E8E8E8] px-8 pb-10 pt-24 md:px-12 md:pb-14 md:pt-32 lg:py-16 lg:pt-36">
        <div className="relative mx-auto w-full max-w-[1400px]">
          {/* <Reveal className="absolute left-0 top-0 z-10">
            <img
              src="/about/ritz-logo.png"
              alt="Ritz Media World"
              className="h-[72px] w-auto object-contain md:h-[96px] lg:h-[110px]"
            />
          </Reveal> */}

          <div className="flex flex-col items-center  text-center ">
            <div className={`${mixtaPro} max-w-[720px]`}>
              <Reveal group="intro">
                <p className="m-0 text-[16px] font-[300] italic leading-[22px] text-[#1D1D1B] md:text-[22px] md:leading-[30px] lg:text-[36px] lg:leading-[36px]">
                  The world&apos;s largest independent brand agency,
                </p>
              </Reveal>
              <Reveal group="intro" className="mt-1">
                <p className="m-0 text-[16px] font-[300] italic leading-[22px] text-[#1D1D1B] md:text-[22px] md:leading-[30px] lg:text-[36px] lg:leading-[36px]">
                  17 years in the making.
                </p>
              </Reveal>
            </div>

            <Reveal group="disruption" className="mt-10 md:mt-12 lg:mt-14 xl:mt-5">
              <p style={subHeadingStyle} className="m-0 text-[18px] md:text-[24px] xl:text-[48px]">
                WE CREATE DESIRE THROUGH
              </p>
            </Reveal>
            

            <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 md:mt-10 lg:mt-12 xl:mt-5">
              <div
                ref={disruptionRef}
                style={disruptionStyle}
                className="mx-auto w-full text-center"
              >
                <Reveal group="disruption" clipYOnly className="w-full overflow-x-visible">
                  <span className="flex w-full justify-center overflow-x-visible">
                    <span
                      data-headline-row
                      className="inline-flex items-center justify-center gap-[20px] md:gap-[32px] lg:gap-[48px]"
                    >
                      <Letter>D</Letter>
                      <Letter>I</Letter>
                      <Letter>S</Letter>
                      <span className="mx-[8px] inline-flex shrink-0 items-center md:mx-[12px] lg:mx-[16px]">
                        <span
                          ref={videoSlotRef}
                          aria-hidden
                          className="block h-[120px] w-[200px] opacity-0 md:h-[160px] md:w-[260px] lg:h-[200px] lg:w-[320px]"
                        />
                      </span>
                      <Letter>R</Letter>
                      <Letter>U</Letter>
                      <Letter>P</Letter>
                    </span>
                  </span>
                </Reveal>

                <Reveal group="disruption" clipYOnly className="mt-1 w-full overflow-x-visible md:mt-2">
                  <span className="flex w-full justify-center overflow-x-visible">
                    <span
                      data-headline-row
                      className="inline-flex items-center justify-center gap-[20px] md:gap-[32px] lg:gap-[48px]"
                    >
                      <Letter>T</Letter>
                      <Letter>I</Letter>
                      <Letter>O</Letter>
                      <Letter>N</Letter>
                    </span>
                  </span>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Section1;
