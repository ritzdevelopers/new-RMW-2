"use client";

import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});


const milestones = [
  {
    year: "2008",
    image: "/create/award.jpeg",
    title: "Foundation",
    description:
      "Ritz Media World launched with a mission to reimagine brand communication for India's growth markets.",
  },
  {
    year: "2012",
    image: "/create/award3.jpeg",
    title: "Innovation Leadership",
    description:
      "Pioneered centrespread storytelling in Hindustan Times, setting new creative benchmarks for print.",
  },
  {
    year: "2016",
    image: "/create/award2.jpeg",
    title: "Digital Expansion",
    description:
      "Scaled into 360° digital marketing, unifying performance, content, and automation for premium brands.",
  },
];

const Section4 = () => {
  return (
    <section className="bg-white px-8 py-16 md:px-12 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1200px]">
        <h2 className="m-0 text-center font-league-spartan text-[48px] font-[500] uppercase leading-[100%] tracking-[0] text-[#333333]">
        17 Years. Countless Stories. One Legacy.
        </h2>

        <p
          className={`${montserrat.className} m-0 mx-auto mt-6 max-w-[1100px] text-center text-[36px] font-normal leading-[100%] tracking-[0] text-[#333333]`}
        >
          From print to digital, campaigns to cultural impact, every milestone reflects our passion for creating work that matters.
        </p>

        <div className="mt-16 md:mt-20">
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
            <div className="absolute left-1/6 right-1/6 top-1/2 hidden h-px -translate-y-1/2 bg-[#D9D9D9] md:block" />
            {milestones.map((item) => (
              <p
                key={`${item.year}-label`}
                className="relative z-10 m-0 bg-white px-4 text-center font-league-spartan text-[30px] font-medium leading-[56px] tracking-[0] text-[#000000] md:mx-auto"
              >
                {item.year}
              </p>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {milestones.map((item) => (
              <div key={item.year} className="flex flex-col items-center text-center">
                <div className="relative z-10 flex h-[165px] w-[165px] items-center justify-center rounded-full border border-[#D9D9D9] opacity-100">
                  <div className="relative h-[147px] w-[147px] overflow-hidden rounded-full">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="147px"
                    />
                  </div>
                </div>

                <h3
                  className={`${montserrat.className} m-0 mt-3 text-center text-[22px] font-normal leading-[36px] tracking-[0] text-[#333333]`}
                >
                  {item.title}
                </h3>

                <p
                  className={`${montserrat.className} m-0 mt-2 max-w-[400px] text-center text-[16px] font-normal leading-[24px] tracking-[0] text-[#33333399]`}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;
