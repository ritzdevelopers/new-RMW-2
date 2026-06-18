"use client";

import React, { useState } from "react";
import Image from "next/image";
import { League_Spartan, Montserrat } from "next/font/google";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const awards = [
  {
    year: "2024",
    image: "/award/awardlogo.png",
    description: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
  },
  {
    year: "2024",
    image: "/award/awardlogo.png",
    description: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
  },
  {
    year: "2025",
    image: "/award/awardlogo.png",
    description: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
  },
];

const Section5 = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? awards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === awards.length - 1 ? 0 : prev + 1));
  };

  const visibleAwards = [
    awards[activeIndex],
    awards[(activeIndex + 1) % awards.length],
    awards[(activeIndex + 2) % awards.length],
  ];

  return (
    <section className="bg-[#0D1334] px-8 py-16 md:px-12 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* <h2
          className={`${leagueSpartan.className} m-0 text-center text-[48px] font-semibold uppercase leading-[100%] tracking-[0] text-white md:text-[86px]`}
        >
          Awards &amp; Company
          <br />
          Recognition
        </h2> */}
        <h2
          className={`${leagueSpartan.className} m-0 text-center text-[48px] font-semibold uppercase leading-[100%] tracking-[0] text-white md:text-[86px]`}
        >
         HONOURS  &amp; RECOGNITION
          {/* <br />
          Recognition */}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {visibleAwards.map((award, index) => (
            <article
              key={`${award.year}-${index}`}
              className="flex min-h-[420px] flex-col rounded-[20px] border border-[#1F275A] bg-[#11173D] px-6 pb-8 pt-6 md:min-h-auto md:px-8"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`${montserrat.className} text-[16px] font-medium leading-none text-white md:text-[18px]`}
                >
                  {award.year}
                </span>
                <button
                  type="button"
                  aria-label="View award details"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white"
                >
                  <i className="ri-add-line text-[20px] leading-none" aria-hidden />
                </button>
              </div>

              <div className="relative mx-auto my-15 flex w-full   items-center justify-center ">
                <Image
                  src={award.image}
                  alt=""
                  width={260}
                  height={260}
                  className="object-contain"
                />
              </div>

              <p
                className={`${montserrat.className} m-0 text-center text-[16px] font-medium leading-[28px] tracking-[0] text-white md:text-[18px]`}
              >
                {award.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 md:mt-12">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous awards"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#161C3D] text-white transition-opacity hover:opacity-80"
          >
            <i className="ri-arrow-left-line text-[20px]" aria-hidden />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next awards"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#161C3D] text-white transition-opacity hover:opacity-80"
          >
            <i className="ri-arrow-right-line text-[20px]" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section5;
