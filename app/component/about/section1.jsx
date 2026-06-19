"use client";

import React, { useLayoutEffect, useRef } from "react";
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

const subHeadingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  fontSize: "48px",
  // lineHeight: "34px",
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

const Section1 = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
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
    const logoFloat = logoFloatRef.current;
    const bounds = computeVideoBounds();
    if (!logoFloat || !bounds) return;

    const entrance = gsap.utils.clamp(0, 1, entranceProgress ?? videoEntranceRef.current);
    const scrollT = gsap.utils.clamp(0, 1, scrollProgress);
    const { start } = bounds;
    const minScale = 0.18;
    const width =
      entrance >= 1
        ? start.width
        : gsap.utils.interpolate(start.width * minScale, start.width, entrance);
    const height =
      entrance >= 1
        ? start.height
        : gsap.utils.interpolate(start.height * minScale, start.height, entrance);

    const logoInner = logoFloat.querySelector("[data-logo-inner]");

    if (scrollT > 0) {
      const heroSection = heroSectionRef.current;
      const container = heroRef.current;
      if (!heroSection || !container) return;

      const sectionBottom = heroSection.offsetTop + heroSection.offsetHeight;

      gsap.set(logoFloat, {
        position: "absolute",
        left: container.offsetWidth / 2,
        right: "auto",
        top: sectionBottom,
        xPercent: -50,
        yPercent: -100,
        width: start.width,
        height: start.height * 0.42,
        zIndex: 55,
        borderRadius: 0,
        visibility: videoRevealStartedRef.current ? "visible" : "hidden",
        opacity: 1,
      });

      if (logoInner) {
        gsap.set(logoInner, {
          top: "auto",
          bottom: "6%",
          left: 0,
          right: 0,
          height: "58%",
          alignItems: "flex-end",
          justifyContent: "center",
        });
      }
      const logoImg = logoFloat.querySelector("[data-logo-inner] img");
      if (logoImg) {
        gsap.set(logoImg, {
          clearProps: "width,height",
          height: "100%",
          width: "auto",
          maxWidth: "85%",
          objectPosition: "bottom",
        });
      }
      return;
    }

    gsap.set(logoFloat, {
      position: "absolute",
      left: start.x,
      top: start.y,
      xPercent: -50,
      yPercent: -50,
      width,
      height,
      zIndex: 35,
      borderRadius: gsap.utils.interpolate(0, 10, entrance),
      visibility: videoRevealStartedRef.current ? "visible" : "hidden",
      opacity: entrance,
    });

    if (logoInner) {
      gsap.set(logoInner, {
        top: "6%",
        bottom: "auto",
        left: 0,
        right: 0,
        height: "58%",
        alignItems: "center",
        justifyContent: "center",
      });
    }
    const logoImg = logoFloat.querySelector("[data-logo-inner] img");
    if (logoImg) {
      gsap.set(logoImg, {
        clearProps: "width,height,maxWidth,objectPosition",
        objectPosition: "top",
      });
    }
  };

  const applyHeroTextScroll = (scrollProgress) => {
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
      if (!disruption) return;

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
        videoEntranceRef.current = 0;
        videoRevealStartedRef.current = true;
        applyVideoProgress(0, 0);

        const tl = gsap.timeline({
          onComplete: () => {
            videoEntranceRef.current = 1;
            fitAll();
            syncVideoBounds(true);
            applyVideoProgress(0, 1);
            applyLogoPosition(1);
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
              applyLogoPosition(entrance.value);
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
        syncVideoBounds();
        applyVideoProgress(0, 0);
        applyLogoPosition(0);

        ScrollTrigger.create({
          trigger: heroSection,
          start: "top top",
          endTrigger: slot,
          end: "top 55%",
          scrub: 0.85,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            applyVideoProgress(self.progress, 1);
            applyHeroTextScroll(self.progress);
            syncLogoWithScroll(self.progress);
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
      ScrollTrigger.refresh();
    };

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
        @font-face {
          font-family: "Sequel Sans";
          src: url("/fonts/Sequel-Sans-Font-Family/Sequel-Sans-Font-Family-DEMO/Sequel Sans OTF/Sequel Sans Semi Bold Head.otf")
            format("opentype");
          font-weight: 370;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

      <div ref={heroRef} className="relative overflow-x-hidden">
      <section
        ref={heroSectionRef}
        className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#0D1334] px-8 pt-35px pb-[60px] md:px-12 md:pt-[70px] md:pb-[80px]"
      >
        <div
          ref={heroTextRef}
          className="relative z-40 mx-auto flex w-full max-w-[1200px] flex-col items-center text-center"
        >
          <div className="relative w-full md:w-full lg:w-screen">
            <h1
              ref={headlineRef}
              style={headingStyle}
              className="m-0 mx-auto w-full text-center text-[94px] leading-[94px] md:text-[72px] md:leading-[72px] lg:text-[94px] lg:leading-[94px]"
            >
              <Reveal clipYOnly className="w-full py-[4px]">
                <span className="flex w-full justify-center">
                  <span data-headline-row className="inline-flex items-center justify-center gap-[140px] md:gap-[40px] lg:gap-[90px]">
                    <span>17</span>
                    <span>YEARS</span>
                    <span>
                      <span style={{ color: goldColor }}>O</span>F
                    </span>
                  </span>
                </span>
              </Reveal>
              <Reveal clipYOnly className="mt-[10px] w-full py-[4px]">
                <span className="flex w-full justify-center">
                  <span data-headline-row className="inline-flex items-center justify-center gap-[180px] md:gap-[20px] lg:gap-[90px]">
                    <span>MAKING</span>
                    <span>BRANDS</span>
                  </span>
                </span>
              </Reveal>
              <Reveal clipYOnly className="mt-[10px] w-full overflow-x-visible py-[4px]">
                <span className="flex w-full justify-center overflow-x-visible">
                  <span data-headline-row className="inline-flex items-center justify-center gap-[200px] md:gap-[6px] md:text-[58px] md:leading-[58px] lg:gap-[50px] lg:text-[94px] lg:leading-[94px] xl:gap-[120px]">
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

          <div className={`${montserrat.className} relative z-40 mt-8 max-w-[1000px] md:mt-0 lg:mt-0 xl:mt-2`}>
            <Reveal group="sub">
              <p className="m-0 text-[14px] font-[300] italic leading-[20px] text-white md:text-[18px] md:leading-[20px] lg:text-[22px] xl:text-[28px] lg:leading-[36px]">
              Built on hustle. Driven by heart. Powered by ideas that move the world
              </p>
            </Reveal>
            <Reveal group="sub" className="mt-1">
              <p className="m-0 text-[14px] font-[300] italic leading-[20px] text-white md:text-[18px] md:leading-[20px] lg:text-[22px] xl:text-[28px] lg:leading-[36px]">
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
      </div>
      <div
        ref={logoFloatRef}
        data-about-hero-logo
        className="pointer-events-none absolute z-[35] overflow-hidden"
        style={{ visibility: "hidden" }}
      >
        <div data-logo-inner className="absolute inset-x-0 top-[6%] flex h-[58%] justify-center">
          <img
            src="/logo/r-rmw-transparent.png"
            alt=""
            className="block h-full w-auto max-w-[85%] object-contain object-top"
            style={{
              filter: "brightness(3.2) contrast(1.05)",
              opacity: 0.4,
            }}
          />
        </div>
      </div>

      <section ref={filmRef} className="relative overflow-x-hidden bg-[#F1F1F1] px-8 pb-10 pt-24 md:px-12 md:pb-14 md:pt-32 lg:py-16 lg:pt-20">
        <div className="relative mx-auto w-full max-w-[1400px]">
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
                <p className="m-0 text-[16px] font-[300] italic leading-[22px] text-[#1D1D1B] md:text-[22px] md:leading-[30px] lg:text-[36px] lg:leading-[36px]">
                  The world&apos;s largest independent brand agency,
                </p>
              </Reveal>
              <Reveal group="intro" className="mt-1">
                <p className="m-0 text-[16px] font-[300] italic leading-[22px] text-[#1D1D1B] md:text-[22px] md:leading-[30px] lg:text-[36px] lg:leading-[40px]">
                  17 years in the making.
                </p>
              </Reveal>
            </div>

            <Reveal group="disruption" className="mt-10 md:mt-12 lg:mt-14 xl:mt-5">
              <p style={subHeadingStyle} className="m-0 text-[18px] md:text-[24px] xl:text-[48px]">
              We Drive Growth Through
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-8 flex w-full justify-center md:mt-10 lg:mt-12 xl:mt-5">
          <div ref={disruptionRef} className="flex flex-col items-center text-center">
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
      </section>
      </div>
    </>
  );
};

export default Section1;
