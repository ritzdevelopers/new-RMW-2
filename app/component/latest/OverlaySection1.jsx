"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { refreshFooterScroll } from "@/lib/footerRefresh";

const BANNER_SRC = "/service/website%20banner%20%5BRecovered%5D-01.jpg";

const serviceRows = [
  [
    { title: "Digital Marketing", href: "/services/digital-marketing" },
    { title: "Print Advertisement", href: "/services/print-advertising" },
  ],
  [
    { title: "Creative Service", href: "/services/creative-services" },
    { title: "Radio Advertisement", href: "/services/radio-advertising" },
  ],
  [
    { title: "Content Marketing", href: "/services/content-marketing" },
    {
      title: "Celebrity Endorsement",
      href: "/services/celebrity-endorsements",
    },
  ],
  [
    {
      title: "Influencer Marketing",
      href: "/services/influencer-marketing-agency-in-india",
    },
    {
      title: "Web Development",
      href: "/services/web-designing-and-development",
    },
  ],
  [
    { title: "Creative Service", href: "/services/creative-services" },
    { title: "Print Advertisement", href: "/services/print-advertising" },
  ],
  [
    { title: "Digital Marketing", href: "/services/digital-marketing" },
    {
      title: "Web Development",
      href: "/services/web-designing-and-development",
    },
  ],
  [
    {
      title: "Influencer Marketing",
      href: "/services/influencer-marketing-agency-in-india",
    },
    { title: "Print Advertisement", href: "/services/print-advertising" },
  ],
];

const serviceClass =
  "shrink-0 whitespace-nowrap uppercase leading-[1.05] tracking-[0] font-semibold text-white transition-opacity duration-300 cursor-pointer";

const mobileFontClass = "text-[clamp(20px,7vw,46px)]";
const desktopFontClass =
  "text-[clamp(22px,4.2vw,68px)] xl:text-[clamp(28px,4.4vw,72px)]";

const rowLayoutClasses = [
  "justify-evenly xl:justify-start xl:pl-[5%]",
  "justify-evenly xl:justify-end xl:pr-[8%]",
  "justify-evenly xl:justify-center xl:gap-x-[6%]",
  "justify-evenly xl:justify-between",
  "justify-evenly xl:justify-start xl:pl-[10%]",
  "justify-evenly xl:justify-end xl:pr-[8%]",
  "justify-evenly xl:justify-center xl:pl-[6%] xl:gap-x-[8%]",
];

const OverlaySection1 = () => {
  const [hoveredKey, setHoveredKey] = useState(null);
  const sectionRef = useRef(null);

  const getOpacityClass = (key) =>
    hoveredKey && hoveredKey !== key ? "opacity-30" : "opacity-100";

  // Let the footer curtain measure this overlay once layout is settled.
  useLayoutEffect(() => {
    refreshFooterScroll();
    const raf = requestAnimationFrame(() => refreshFooterScroll());
    const timer = window.setTimeout(() => refreshFooterScroll(), 120);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const refresh = () => refreshFooterScroll();
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => refresh())
        : null;
    resizeObserver?.observe(el);

    const settleTimer = window.setTimeout(refresh, 400);
    window.addEventListener("load", refresh, { once: true });

    return () => {
      resizeObserver?.disconnect();
      window.clearTimeout(settleTimer);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] min-h-[100dvh] w-full max-w-full overflow-hidden bg-[#0E1125]"
    >
      <div className="relative h-full min-h-[100dvh] w-full">
        <Image
          src={BANNER_SRC}
          alt="Ritz Media World creative services"
          title="Ritz Media World creative services"
          fill
          loading="lazy"
          fetchPriority="low"
          quality={75}
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/10" aria-hidden />

        <div className="font-league-spartan relative z-10 flex h-full min-h-[100dvh] flex-col p-[20px] xl:p-[50px]">
          <div
            className="flex min-h-0 flex-1 flex-col items-center justify-between gap-4 text-center md:hidden"
            onMouseLeave={() => setHoveredKey(null)}
          >
            {serviceRows.flat().map((label, index) => {
              const key = `mobile-${index}-${label.href}`;
              return (
                <Link
                  key={key}
                  href={label.href}
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredKey(key)}
                  className={`${serviceClass} ${mobileFontClass} block w-full text-center ${getOpacityClass(
                    key,
                  )}`}
                >
                  {label.title}
                </Link>
              );
            })}
          </div>

          <div
            className="hidden min-h-0 w-full flex-1 flex-col justify-between md:flex lg:justify-between"
            onMouseLeave={() => setHoveredKey(null)}
          >
            {serviceRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex w-full shrink-0 flex-nowrap items-center gap-x-8 xl:gap-x-16 ${
                  rowLayoutClasses[rowIndex] ??
                  "justify-evenly xl:justify-center"
                }`}
              >
                {row.map((label, index) => {
                  const key = `${rowIndex}-${index}-${label.href}`;
                  return (
                    <Link
                      key={key}
                      href={label.href}
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveredKey(key)}
                      className={`${serviceClass} ${desktopFontClass} ${getOpacityClass(
                        key,
                      )}`}
                    >
                      {label.title}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverlaySection1;
