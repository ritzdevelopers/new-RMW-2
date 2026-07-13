"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import "swiper/css";

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

const Section4 = () => {
  return (
    <section className="bg-white px-8 py-[35px] md:px-12 md:py-[70px]">
      <div className="mx-auto w-full max-w-[1200px]">
        <h2 className="m-0 text-center font-league-spartan xl:text-[48px] lg:text-[40px] md:text-[32px] text-[20px] font-[500] uppercase md:leading-[100%] tracking-[0] text-[#333333] leading-[25px]">
          18 Years. Countless Stories. One Legacy.
        </h2>

        <p
          className={`${montserrat.className} m-0 mx-auto xl:mt-6 md:mt-3 max-w-[1100px] text-center lg:text-[24px] xl:text-[36px] font-normal xl:leading-[45px] lg:leading-[30px] tracking-[0] text-[#333333]`}
        >
          From print to digital, campaigns to cultural impact, every milestone reflects our passion for creating work that matters.
        </p>

        <div className="relative mt-8 md:mt-20">
          <Swiper
            modules={[A11y, Autoplay]}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 32 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
            className="!overflow-visible"
          >
            {milestones.map((item) => (
              <SwiperSlide key={item.year}>
                <div className="flex flex-col items-center text-center">
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
                    className={`${montserrat.className} m-0 mt-2 max-w-[400px] text-center text-[16px] font-normal leading-[24px] tracking-[0] text-[#33333399]`}
                  >
                    {item.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Section4;
