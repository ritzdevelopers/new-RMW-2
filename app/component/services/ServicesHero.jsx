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

const goldColor = "#FFD188";
const circleSpotlightDuration = 15;

const headingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const headlineRowSpread = "flex w-full items-end justify-between gap-4";
const headlineWordGroup = "inline-flex items-end gap-6 sm:gap-10 md:gap-16 lg:gap-24 xl:gap-32";

const servicesHeadlineRows = [
  { left: "SERVICES", right: ["TAILORED", "TO"] },
  { left: "TRANSFORM", right: ["YOUR", "BRAND"] },
];

const defaultSubtext = ["From Present to Prominent."];

const Reveal = ({ children, className = "", group = "headline", clipYOnly = false }) => (
  <span
    className={`block ${clipYOnly ? "overflow-x-visible overflow-y-hidden" : "overflow-hidden"} ${className}`}
  >
    <span data-svc-reveal={group} className="block w-full">
      {children}
    </span>
  </span>
);

function normalizeSubtext(subtext) {
  if (!subtext?.length) return defaultSubtext;

  return subtext.map((line) => {
    if (Array.isArray(line)) return line;

    const emDashParts = line
      .split(/\s*[—–]\s*/)
      .map((part) => part.trim())
      .filter(Boolean);
    if (emDashParts.length > 1) return emDashParts;

    const commaParts = line
      .split(/,\s+(?=backed|from|and|with|to|across|or|but)\s*/i)
      .map((part) => part.trim())
      .filter(Boolean);
    if (commaParts.length > 1) return commaParts;

    return [line];
  });
}

function buildSingleLineRows(words) {
  if (words.length === 0) return [];
  if (words.length === 1) return [{ left: words[0], right: [] }];
  if (words.length === 2) return [{ left: words[0], right: [words[1]] }];

  const rows = [];
  for (let index = 0; index < words.length; index += 3) {
    const chunk = words.slice(index, index + 3);
    if (chunk.length === 1) {
      rows.push({ left: chunk[0], right: [] });
    } else if (chunk.length === 2) {
      rows.push({ left: chunk[0], right: [chunk[1]] });
    } else {
      rows.push({ left: chunk[0], right: chunk.slice(1) });
    }
  }
  return rows;
}

export function buildSubServiceHeadlineRows(title) {
  const words = title
    .replace(/[()]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.toUpperCase());

  const rows = [];
  for (let index = 0; index < words.length; index += 2) {
    rows.push({
      left: words[index],
      right: words[index + 1] ? [words[index + 1]] : [],
    });
  }
  return rows;
}

const renderHeadlineRow = (row, variant = "white") => {
  const Word = ({ text }) =>
    variant === "white" ? (
      <span data-headline-word>{text}</span>
    ) : (
      <span>{text}</span>
    );

  return (
    <span data-headline-row className={headlineRowSpread}>
      <Word text={row.left} />
      {row.right.length > 0 ? (
        <span className={headlineWordGroup}>
          {row.right.map((word) => (
            <Word key={`${variant}-${word}`} text={word} />
          ))}
        </span>
      ) : null}
    </span>
  );
};

const HeadlineRows = ({ rows, variant = "white" }) => (
  <>
    {rows.map((row, rowIndex) =>
      variant === "white" ? (
        <Reveal key={`${row.left}-${row.right.join("-")}`} clipYOnly className={`w-full py-[2px]${rowIndex > 0 ? " mt-1 md:mt-2" : ""}`}>
          {renderHeadlineRow(row, variant)}
        </Reveal>
      ) : (
        <div key={`gold-${row.left}-${row.right.join("-")}`} className={`w-full py-[2px]${rowIndex > 0 ? " mt-1 md:mt-2" : ""}`}>
          {renderHeadlineRow(row, variant)}
        </div>
      ),
    )}
  </>
);

const ServicesHero = ({
  lineOne = "Digital Marketing",
  singleLine = false,
  variant = "default",
  headlineRows: headlineRowsProp,
  subtext = defaultSubtext,
  subtextItalic = true,
}) => {
  const isSubService = variant === "subService";
  const subtextLines = normalizeSubtext(subtext);
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const headlineWrapRef = useRef(null);
  const headlineSpotlightWrapRef = useRef(null);
  const headlineGoldRef = useRef(null);
  const logoRef = useRef(null);

  const headlineRows =
    headlineRowsProp ||
    (isSubService
      ? buildSubServiceHeadlineRows(lineOne)
      : singleLine
        ? buildSingleLineRows(lineOne.split(/\s+/).filter(Boolean))
        : servicesHeadlineRows);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
    if (!hero) return;

    let spotlightTween = null;
    let spotlightStarted = false;

    const getCircleRadius = () => {
      const width = window.innerWidth;
      if (width >= 768) return 65;
      return 22;
    };

    const getSpotlightRowWaypoints = () => {
      const wrap = headlineSpotlightWrapRef.current;
      if (!wrap) return null;

      const whiteLayer = wrap.firstElementChild;
      if (!whiteLayer) return null;

      const rows = whiteLayer.querySelectorAll("[data-headline-row]");
      if (!rows.length) return null;

      const wrapRect = wrap.getBoundingClientRect();
      const circleRadius = getCircleRadius();

      return [...rows]
        .map((row) => {
          const words = [...row.querySelectorAll("[data-headline-word]")];
          if (!words.length) return null;

          const firstRect = words[0].getBoundingClientRect();
          const lastRect = words[words.length - 1].getBoundingClientRect();
          const startX = firstRect.left - wrapRect.left + circleRadius;
          const endX = lastRect.left - wrapRect.left + lastRect.width - circleRadius;

          return {
            start: {
              x: startX,
              y: firstRect.top - wrapRect.top + firstRect.height * 0.5,
            },
            end: {
              x: Math.max(startX, endX),
              y: lastRect.top - wrapRect.top + lastRect.height * 0.5,
            },
          };
        })
        .filter(Boolean);
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

      const rowWaypoints = getSpotlightRowWaypoints();
      if (!rowWaypoints?.length) return;

      spotlightTween?.kill();
      spotlightTween = null;

      const setMaskAt = (x, y) => {
        const radius = getCircleRadius();
        const mask = `radial-gradient(circle ${radius}px at ${x}px ${y}px, #000 98%, transparent 100%)`;
        gold.style.maskImage = mask;
        gold.style.webkitMaskImage = mask;
      };

      const speed = wrap.offsetWidth / circleSpotlightDuration;
      let maskVisible = true;
      const proxy = {
        x: rowWaypoints[0].start.x,
        y: rowWaypoints[0].start.y,
      };

      const showMask = () => {
        maskVisible = true;
        setMaskAt(proxy.x, proxy.y);
      };

      const hideMask = () => {
        maskVisible = false;
        hideHeadlineGold();
      };

      const tl = gsap.timeline({
        repeat: -1,
        onUpdate: () => {
          if (maskVisible) setMaskAt(proxy.x, proxy.y);
        },
      });

      rowWaypoints.forEach((row, rowIndex) => {
        if (rowIndex > 0) {
          tl.call(hideMask);
          tl.set(proxy, { x: row.start.x, y: row.start.y });
          tl.call(showMask);
        } else {
          tl.set(proxy, { x: row.start.x, y: row.start.y });
          tl.call(showMask);
        }

        const dist = Math.hypot(row.end.x - row.start.x, row.end.y - row.start.y);
        if (!dist) return;

        tl.to(proxy, {
          x: row.end.x,
          y: row.end.y,
          duration: dist / speed,
          ease: "none",
        });
      });

      tl.call(hideMask);
      tl.set(proxy, { x: rowWaypoints[0].start.x, y: rowWaypoints[0].start.y });

      spotlightTween = tl;
      spotlightStarted = true;
    };

    const fitHeadline = () => {
      const parent = headline?.parentElement;
      if (!headline || !parent) return;

      headline.style.transform = "none";
      const rows = headline.querySelectorAll("[data-headline-row]");
      let needed = 0;
      rows.forEach((row) => {
        needed = Math.max(needed, row.scrollWidth, row.getBoundingClientRect().width);
      });
      const buffer = window.innerWidth >= 1024 ? 48 : 24;
      const available = parent.clientWidth - buffer;
      const scale = needed > 0 ? Math.min(1, available / needed) : 1;
      headline.style.transform = scale < 1 ? `scale(${scale})` : "none";
      headline.style.transformOrigin = isSubService ? "top center" : "top left";
    };

    const ctx = gsap.context(() => {
      const headlineItems = gsap.utils.toArray("[data-svc-reveal='headline']", hero);
      const subItems = gsap.utils.toArray("[data-svc-reveal='sub']", hero);

      gsap.set(headlineItems, { yPercent: -110 });
      gsap.set(subItems, { yPercent: -110, opacity: 0 });

      if (logoRef.current) {
        gsap.set(logoRef.current, { opacity: 0 });
      }

      let entrancePlayed = false;

      const playEntrance = () => {
        if (entrancePlayed) return;
        entrancePlayed = true;

        const tl = gsap.timeline({
          onComplete: () => {
            fitHeadline();
            ScrollTrigger.refresh();
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
                      fitHeadline();
                      startHeadlineSpotlight();
                    }
                  : undefined,
            },
            index === 0 ? 0 : "-=1.65",
          );
        });

        subItems.forEach((item, index) => {
          tl.to(
            item,
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.4,
              ease: "power4.out",
            },
            index === 0 ? "-=1.1" : "-=1.15",
          );
        });

        if (logoRef.current) {
          tl.to(
            logoRef.current,
            {
              opacity: 1,
              duration: 2,
              ease: "power4.out",
            },
            0,
          );
        }
      };

      const onHeaderComplete = () => playEntrance();
      window.addEventListener("header-reveal-complete", onHeaderComplete);

      requestAnimationFrame(() => {
        const headerItems = document.querySelectorAll("[data-header-reveal]");
        const headerDone = headerItems.length
          ? Array.from(headerItems).every((el) => gsap.getProperty(el, "yPercent") === 0)
          : true;
        if (headerDone) playEntrance();
      });

      fitHeadline();
      hideHeadlineGold();

      const onResize = () => {
        fitHeadline();
        if (spotlightStarted) startHeadlineSpotlight();
      };

      window.addEventListener("resize", onResize);
      window.addEventListener("load", fitHeadline);
      document.fonts?.ready?.then(() => requestAnimationFrame(fitHeadline));

      const resizeObserver =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(() => fitHeadline())
          : null;
      if (headline?.parentElement && resizeObserver) {
        resizeObserver.observe(headline.parentElement);
      }

      return () => {
        spotlightTween?.kill();
        window.removeEventListener("header-reveal-complete", onHeaderComplete);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("load", fitHeadline);
        resizeObserver?.disconnect();
      };
    }, hero);

    return () => ctx.revert();
  }, [singleLine, lineOne, isSubService, headlineRowsProp]);

  const logoMark = (
    <div
      ref={logoRef}
      aria-hidden
      className={
        isSubService
          ? "h-[min(220px,58vw)] w-[min(180px,48vw)] lg:h-[300px] lg:w-[250px]"
          : "h-[min(240px,62vw)] w-[min(200px,52vw)] lg:h-[339px] lg:w-[282.186px]"
      }
      style={{
        background: "rgba(255, 255, 255, 0.20)",
        WebkitMaskImage: "url(/logo/r-logo-new.png)",
        maskImage: "url(/logo/r-logo-new.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        transform: "rotate(-12.441deg)",
        transformOrigin: "center center",
      }}
    />
  );

  const headlineBlock = (
    <div
      ref={headlineWrapRef}
      className={`relative w-full overflow-x-clip ${isSubService ? "mx-auto max-w-[1100px]" : ""}`}
    >
      <h1
        ref={headlineRef}
        style={headingStyle}
        className={`m-0 w-full leading-[0.95] ${
          isSubService
            ? "text-center text-[28px] sm:text-[34px] md:text-[56px] lg:text-[72px] xl:text-[82px]"
            : "text-left text-[36px] sm:text-[44px] md:text-[84px] lg:text-[110px]"
        }`}
      >
        <div ref={headlineSpotlightWrapRef} className="relative w-full">
          <div className="relative z-[1] w-full">
            <HeadlineRows rows={headlineRows} />
          </div>
          <div
            ref={headlineGoldRef}
            className={`pointer-events-none absolute inset-0 z-[2] w-full ${
              isSubService ? "text-center" : "text-left"
            }`}
            style={{ ...headingStyle, color: goldColor }}
            aria-hidden
          >
            <HeadlineRows rows={headlineRows} variant="gold" />
          </div>
        </div>
      </h1>
    </div>
  );

  const subtextBlock = (
    <div className={`${montserrat.className} relative z-40 w-full`}>
      {subtextLines.map((phrases, index) => (
        <Reveal
          key={`${phrases.join("-")}-${index}`}
          group="sub"
          clipYOnly
          className={index > 0 ? "mt-1" : ""}
        >
          <p
            className={`m-0 text-white ${
              isSubService
                ? "text-[14px] font-normal leading-snug sm:text-[16px] md:text-[18px] lg:text-[21px]"
                : `text-[22px] font-[300] leading-[28px] sm:text-[24px] sm:leading-[30px] md:text-[26px] md:leading-[32px] lg:text-[32px] lg:leading-[40px] xl:text-[40px] xl:leading-[48px] ${
                    subtextItalic ? "italic" : ""
                  }`
            }`}
          >
            {phrases.join(" ")}
          </p>
        </Reveal>
      ))}
    </div>
  );

  return (
    <section
      ref={heroRef}
      className={`relative flex flex-col overflow-x-clip bg-[#0D1334] px-8 md:px-12 ${
        isSubService
          ? "min-h-[280px] items-center justify-center py-10 sm:min-h-[320px] md:min-h-[360px] lg:min-h-[409px] lg:py-14"
          : "min-h-[calc(100dvh-4.5rem)] pb-12 pt-4 md:pb-16 md:pt-6 lg:min-h-screen lg:pb-[80px]"
      }`}
    >
      <div
        className={`pointer-events-none absolute left-1/2 z-[1] -translate-x-1/2 ${
          isSubService
            ? "bottom-0 flex items-end justify-center"
            : "bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-0"
        }`}
      >
        {logoMark}
      </div>

      {isSubService ? (
        <div className="relative z-10 flex w-full max-w-[1280px] flex-col items-center gap-4 text-center sm:gap-5">
          {headlineBlock}
          {subtextBlock}
        </div>
      ) : (
        <div className="relative z-10 flex w-full flex-1 flex-col">
          {headlineBlock}

          <div className="mx-auto flex w-full max-w-[920px] flex-1 flex-col items-center justify-center px-2 text-center md:max-w-[980px] lg:max-w-[1040px]">
            {subtextBlock}
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesHero;
