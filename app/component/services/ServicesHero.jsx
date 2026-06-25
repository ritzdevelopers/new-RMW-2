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

const headlineRowSpread =
  "flex w-full min-w-0 items-end justify-between gap-2 sm:gap-3 md:gap-4";
const subServiceHeadlineRowSpread =
  "flex w-full min-w-0 items-end justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10";
const headlineWordGroup =
  "inline-flex min-w-0 shrink items-end gap-2 sm:gap-4 md:gap-8 lg:gap-16 xl:gap-24";
const subServiceHeadlineWordGroup =
  "inline-flex min-w-0 shrink items-end gap-3 sm:gap-4 md:gap-5";

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

const renderHeadlineRow = (row, variant = "white", isSubService = false) => {
  const Word = ({ text }) =>
    variant === "white" ? (
      <span data-headline-word className="shrink-0 whitespace-nowrap">
        {text}
      </span>
    ) : (
      <span className="shrink-0 whitespace-nowrap">{text}</span>
    );

  const rowClass = isSubService ? subServiceHeadlineRowSpread : headlineRowSpread;
  const wordGroupClass = isSubService ? subServiceHeadlineWordGroup : headlineWordGroup;

  return (
    <span data-headline-row className={rowClass}>
      <Word text={row.left} />
      {row.right.length > 0 ? (
        <span className={wordGroupClass}>
          {row.right.map((word) => (
            <Word key={`${variant}-${word}`} text={word} />
          ))}
        </span>
      ) : null}
    </span>
  );
};

const HeadlineRows = ({ rows, variant = "white", isSubService = false }) => (
  <>
    {rows.map((row, rowIndex) =>
      variant === "white" ? (
        <Reveal
          key={`${row.left}-${row.right.join("-")}`}
          clipYOnly
          className={`w-full py-[2px]${rowIndex > 0 ? (isSubService ? " mt-0" : " mt-1 md:mt-2") : ""}`}
        >
          {renderHeadlineRow(row, variant, isSubService)}
        </Reveal>
      ) : (
        <div
          key={`gold-${row.left}-${row.right.join("-")}`}
          className={`w-full py-[2px]${rowIndex > 0 ? (isSubService ? " mt-0" : " mt-1 md:mt-2") : ""}`}
        >
          {renderHeadlineRow(row, variant, isSubService)}
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

    const measureRowContentWidth = (row) => {
      const style = window.getComputedStyle(row);
      const gap = parseFloat(style.columnGap || style.gap) || 0;
      const children = [...row.children];

      if (!children.length) {
        return row.scrollWidth;
      }

      return children.reduce((total, child, index) => {
        const childWidth = child.scrollWidth || child.getBoundingClientRect().width;
        return total + childWidth + (index > 0 ? gap : 0);
      }, 0);
    };

    const fitHeadline = () => {
      const parent = headline?.parentElement;
      if (!headline || !parent) return;

      headline.style.transform = "none";
      headline.style.width = "100%";
      headline.style.marginLeft = "0";
      headline.style.marginBottom = "0";

      const rows = headline.querySelectorAll("[data-headline-row]");
      let needed = 0;
      rows.forEach((row) => {
        needed = Math.max(needed, measureRowContentWidth(row));
      });

      const sectionStyles = window.getComputedStyle(hero);
      const horizontalPadding =
        parseFloat(sectionStyles.paddingLeft) + parseFloat(sectionStyles.paddingRight);
      const buffer = window.innerWidth >= 1024 ? 32 : window.innerWidth >= 640 ? 24 : 12;
      const available =
        Math.min(window.innerWidth, parent.clientWidth) - horizontalPadding - buffer;
      const scale = needed > 0 && available > 0 ? Math.min(1, available / needed) : 1;

      if (scale < 1) {
        headline.style.width = `${100 / scale}%`;
        headline.style.transform = `scale(${scale})`;
        headline.style.marginBottom = `${headline.offsetHeight * (scale - 1)}px`;
      } else {
        headline.style.transform = "none";
      }

      const useCenterOrigin = isSubService || window.innerWidth < 1024;
      headline.style.transformOrigin = useCenterOrigin ? "top center" : "top left";
    };

    const ctx = gsap.context(() => {
      const headlineItems = gsap.utils.toArray("[data-svc-reveal='headline']", hero);
      const subItems = gsap.utils.toArray("[data-svc-reveal='sub']", hero);

      gsap.set(headlineItems, { yPercent: -110 });
      gsap.set(subItems, { yPercent: -110, opacity: 0 });

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
      if (resizeObserver) {
        resizeObserver.observe(hero);
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

  const headlineBlock = (
    <div
      ref={headlineWrapRef}
      className={`relative w-full min-w-0 max-w-full overflow-x-clip ${isSubService ? "mx-auto" : ""}`}
    >
      <h1
        ref={headlineRef}
        style={headingStyle}
        className={`m-0 w-full max-w-full leading-[0.95] ${
          isSubService
            ? "text-center text-[34px] sm:text-[42px] md:text-[64px] lg:text-[80px] xl:text-[92px]"
            : "text-left text-[26px] sm:text-[36px] md:text-[58px] lg:text-[84px] xl:text-[110px]"
        }`}
      >
        <div ref={headlineSpotlightWrapRef} className="relative w-full">
          <div className="relative z-[1] w-full">
            <HeadlineRows rows={headlineRows} isSubService={isSubService} />
          </div>
          <div
            ref={headlineGoldRef}
            className={`pointer-events-none absolute inset-0 z-[2] w-full ${
              isSubService ? "text-center" : "text-left"
            }`}
            style={{ ...headingStyle, color: goldColor }}
            aria-hidden
          >
            <HeadlineRows rows={headlineRows} variant="gold" isSubService={isSubService} />
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
                : `text-[18px] font-[300] leading-[24px] sm:text-[22px] sm:leading-[28px] md:text-[26px] md:leading-[32px] lg:text-[32px] lg:leading-[40px] xl:text-[40px] xl:leading-[48px] ${
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
      className={`relative flex flex-col overflow-x-clip bg-[#0D1334] px-4 sm:px-6 md:px-10 lg:px-12 ${
        isSubService
          ? "min-h-[220px] items-center justify-center py-8 sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px] lg:py-12"
          : "py-10 pt-6 sm:py-12 md:py-14 lg:py-16"
      }`}
    >
      {isSubService ? (
        <div className="relative z-10 flex w-full max-w-[1280px] flex-col items-center gap-3 text-center sm:gap-4">
          {headlineBlock}
          {subtextBlock}
        </div>
      ) : (
        <div className="relative z-10 flex w-full min-w-0 flex-col gap-6 sm:gap-8 md:gap-10">
          {headlineBlock}

          <div className="mx-auto w-full min-w-0 max-w-full px-1 text-center sm:max-w-[920px] sm:px-2 md:max-w-[980px] lg:max-w-[1040px]">
            {subtextBlock}
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesHero;
