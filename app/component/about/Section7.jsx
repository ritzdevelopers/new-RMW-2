"use client";

import React from "react";
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

const rowOffsetClasses = [
  "",
  "ml-[40px]",
  "ml-[120px]",
  "-ml-8 md:-ml-12",
  "ml-[130px]",
  "ml-[40px]",
  "-ml-8 md:-ml-12",
];

const serviceClass =
  "whitespace-nowrap uppercase leading-[100%] tracking-[0] text-[32px] md:text-[48px] lg:text-[60px]";

const Section7 = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full">
        <Image
          src="/service/bg-image.png"
          alt=""
          width={1024}
          height={584}
          priority
          className="block h-auto w-full object-cover object-center"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/10" aria-hidden />

        <div
          className={`${leagueSpartan.className} absolute inset-0 z-10 flex flex-col justify-center gap-6 px-8 py-20 md:gap-8 md:px-12 md:py-15 lg:gap-10`}
        >
        {serviceRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex w-full flex-wrap items-center gap-x-8 gap-y-2 lg:gap-x-16 ${rowOffsetClasses[rowIndex] ?? ""}`}
          >
            {row.map((label, index) => (
              <span
                key={`${rowIndex}-${index}-${label}`}
                className={`${serviceClass} cursor-pointer font-semibold text-[#FFFFFF4D] transition-colors duration-300 hover:text-white`}
              >
                {label}
              </span>
            ))}
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default Section7;
