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

// Shared (non-size) classes. Font size is applied fluidly per list below so
// words never wrap/break and always fit the screen width.
const serviceClass =
  "whitespace-nowrap uppercase leading-[1.05] tracking-[0] font-semibold text-white transition-opacity duration-300 cursor-pointer";

// Single-column (mobile): one word per line, so it can be larger.
const mobileFontClass = "text-[clamp(16px,6vw,40px)]";
// Two words per row (desktop): smaller fluid size to keep both on one line.
const desktopFontClass = "text-[clamp(13px,3vw,56px)]";

// Deterministic (SSR-safe) scatter: each row gets its own justification + gap
// so the words land at varied horizontal positions instead of one centered column.
const rowLayoutClasses = [
  "justify-start lg:pl-[5%]",
  "justify-end lg:pr-[8%]",
  "justify-center lg:gap-x-[6%]",
  "justify-between",
  "justify-start lg:pl-[10%]",
  "justify-end lg:pr-[8%]",
  "justify-center lg:pl-[6%] lg:gap-x-[8%]",
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
          className={`${leagueSpartan.className} relative z-10 flex min-h-[100dvh] flex-col p-[50px]`}
        >
          <div
            className="flex flex-1 flex-col justify-between gap-4 md:hidden"
            onMouseLeave={() => setHoveredKey(null)}
          >
            {serviceRows.flat().map((label, index) => {
              const key = `mobile-${index}-${label}`;
              return (
                <span
                  key={key}
                  onMouseEnter={() => setHoveredKey(key)}
                  className={`${serviceClass} ${mobileFontClass} ${getOpacityClass(
                    key,
                  )}`}
                >
                  {label}
                </span>
              );
            })}
          </div>

          <div
            className="hidden w-full flex-1 flex-col justify-between md:flex"
            onMouseLeave={() => setHoveredKey(null)}
          >
            {serviceRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex w-full flex-nowrap items-center gap-x-10 lg:gap-x-16 ${
                  rowLayoutClasses[rowIndex] ?? "justify-center"
                }`}
              >
                {row.map((label, index) => {
                  const key = `${rowIndex}-${index}-${label}`;
                  return (
                    <span
                      key={key}
                      onMouseEnter={() => setHoveredKey(key)}
                      className={`${serviceClass} ${desktopFontClass} ${getOpacityClass(
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
