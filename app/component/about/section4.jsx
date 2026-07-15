"use client";

import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const milestones = [
  {
    year: "2008",
    image: "/create/r-logo-1.png",
    title: "Foundation",
    description:
      "Ritz Media World launched with a mission to reimagine brand communication for India's growth markets.",
  },
  {
    year: "2012",
    image: "/create/award2.jpeg",
    title: "Innovation Leadership",
    description:
      "Pioneered centrespread storytelling in Hindustan Times, setting new creative benchmarks for print.",
  },
  {
    year: "2016",
    image: "/create/award3.jpeg",
    title: "Digital Expansion",
    description:
      "Scaled into 360° digital marketing, unifying performance, content, and automation for premium brands.",
  },
  {
    year: "2020",
    image: "/create/award1.jpg",
    title: "Premium Positioning",
    description:
      "Strengthened premium brand partnerships and elevated positioning across high-impact campaigns.",
  },
  {
    year: "2026",
    image: "/create/award.png",
    title: "AI-Powered 3D Rendering at 5X",
    description:
      "Delivering next-gen AI-powered 3D rendering at 5X speed — transforming vision into photoreal reality faster than ever.",
  },
];

function MilestoneCard({ item }) {
  return (
    <div className="flex w-[280px] shrink-0 flex-col items-center text-center md:w-[320px]">
      <p className="m-0 bg-white px-4 text-center font-league-spartan text-[30px] font-medium leading-[56px] tracking-[0] text-[#000000]">
        {item.year}
      </p>
      <div className="relative z-10 flex h-[165px] w-[165px] items-center justify-center rounded-full border border-[#D9D9D9] opacity-100">
        <div className="relative flex h-[147px] w-[147px] items-center justify-center overflow-hidden rounded-full">
          <img
            src={item.image}
            alt=""
            className={item.year === "2008" ? "h-[80%]" : "h-[100%]"}
          />
        </div>
      </div>

      <h3
        className={`${montserrat.className} m-0 mt-3 text-center text-[22px] font-normal leading-[36px] tracking-[0] text-[#333333]`}
      >
        {item.title}
      </h3>

      <p
        className={`${montserrat.className} m-0 mt-2 max-w-[280px] text-center text-[16px] font-normal leading-[24px] tracking-[0] text-[#33333399] md:max-w-[300px]`}
      >
        {item.description}
      </p>
    </div>
  );
}

const Section4 = () => {
  const track = [...milestones, ...milestones];

  return (
    <section className="bg-white py-[35px] md:py-[70px]">
      <div className="mx-auto w-full max-w-[1200px] px-8 md:px-12">
        <h2 className="m-0 text-center font-league-spartan xl:text-[48px] lg:text-[40px] md:text-[32px] text-[20px] font-[500] uppercase md:leading-[100%] tracking-[0] text-[#333333] leading-[25px]">
          18 Years. Countless Stories. One Legacy.
        </h2>

        <p
          className={`${montserrat.className} m-0 mx-auto xl:mt-6 md:mt-3 max-w-[1100px] text-center lg:text-[24px] xl:text-[36px] font-normal xl:leading-[45px] lg:leading-[30px] tracking-[0] text-[#333333]`}
        >
          From print to digital, campaigns to cultural impact, every milestone reflects our passion for creating work that matters.
        </p>
      </div>

      <div className="relative mt-8 w-full overflow-hidden md:mt-20">
        <style>{`
          @keyframes about-milestones-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }

          .about-milestones-track {
            display: flex;
            width: max-content;
            gap: 48px;
            animation: about-milestones-marquee 40s linear infinite;
          }

          .about-milestones-track:hover {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .about-milestones-track {
              animation: none;
            }
          }
        `}</style>

        <div className="about-milestones-track px-8 md:px-12" aria-label="Company milestones">
          {track.map((item, index) => (
            <MilestoneCard key={`${item.year}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section4;
