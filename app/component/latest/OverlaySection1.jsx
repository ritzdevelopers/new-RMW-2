"use client";

import React, { useState } from "react";
import Image from "next/image";
import { League_Spartan } from "next/font/google";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const serviceRows = [
  ["Digital Marketing", "Creative Service"],
  ["Print Advertisement", "Radio Advertisement"],
  ["Content Marketing", "Web Development"],
  ["Influencer Marketing", "Celebrity Endorsement"],
  ["Creative Service", "Print Advertisement"],
  ["Celebrity Endorsement", "Radio Advertisement"],
  ["Influencer Marketing", "Digital Marketing"],
];

// Shared (non-size) classes.
// Character-level break when text overflows (e.g. DIGITA / L), not whole-word wrap.
// xl+: enough width — keep each label on one line.
const serviceClass =
  "uppercase leading-[1.05] tracking-[0] font-semibold text-white transition-opacity duration-300 cursor-pointer break-all xl:whitespace-nowrap xl:break-normal";

// Single-column (mobile): one label per line; still char-break if it overflows.
const mobileFontClass = "text-[clamp(20px,7vw,46px)]";
// Below xl: a bit larger; xl+ keeps the max size.
const desktopFontClass = "text-[clamp(22px,4.2vw,68px)] xl:text-[clamp(28px,4.4vw,72px)]";
 
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

  const getOpacityClass = (key) =>
    hoveredKey && hoveredKey !== key ? "opacity-30" : "opacity-100";

  return (
    <section className="relative min-h-[100dvh] w-full max-w-full overflow-x-clip bg-[#0E1125]">
      <div className="relative min-h-[100dvh] w-full">
        <Image
          src="/service/website%20banner%20%5BRecovered%5D-01.jpg"
          alt="Ritz Media World creative services"
          title="Ritz Media World creative services"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/10" aria-hidden />

        <div
          className={`${leagueSpartan.className} relative z-10 flex min-h-[100dvh] flex-col p-[20px] xl:p-[50px]`}
        >
          <div
            className="flex flex-1 flex-col items-center justify-between gap-4 text-center md:hidden"
            onMouseLeave={() => setHoveredKey(null)}
          >
            {serviceRows.flat().map((label, index) => {
              const key = `mobile-${index}-${label}`;
              return (
                <span
                  key={key}
                  onMouseEnter={() => setHoveredKey(key)}
                  className={`${serviceClass} ${mobileFontClass} block w-full text-center ${getOpacityClass(
                    key,
                  )}`}
                >
                  {label}
                </span>
              );
            })}
          </div>

          <div
            className="hidden w-full flex-1 flex-col justify-between md:justify-evenly lg:justify-between md:flex"
            onMouseLeave={() => setHoveredKey(null)}
          >
            {serviceRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex w-full flex-wrap items-center gap-x-0 gap-y-0 xl:flex-nowrap xl:gap-x-16 ${
                  rowLayoutClasses[rowIndex] ?? "justify-evenly xl:justify-center"
                }`}
              >
                {row.map((label, index) => {
                  const key = `${rowIndex}-${index}-${label}`;
                  return (
                    <span
                      key={key}
                      onMouseEnter={() => setHoveredKey(key)}
                      className={`${serviceClass} ${desktopFontClass} min-w-0 max-w-[48%] xl:max-w-none ${getOpacityClass(
                        key,
                      )}`}
                    >
                      {label}
                    </span>
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
