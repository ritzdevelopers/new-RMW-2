"use client";

import React from "react";
import Image from "next/image";

const SERVICES = [
  {
    src: "/portfolio/brand-design-1.jpg",
    alt: "Brand design review on desk",
    label: "Brand Design",
  },
  {
    src: "/portfolio/website-design.jpg",
    alt: "Website design work on laptop",
    label: "Website Design",
  },
  {
    src: "/portfolio/content.jpg",
    alt: "Photography and content studio setup",
    label: "Photography & Content",
  },
  {
    src: "/portfolio/social-media.jpg",
    alt: "Social media management on phone",
    label: "Social Media Management",
  },
];

const Section2 = () => {
  return (
    <section className="w-full bg-[#FAFAFA] py-[72px] max-xl:py-[60px] max-md:py-[48px] max-sm:py-[40px]">
      <div className="mx-auto flex w-full max-w-[1340px] flex-col items-center gap-[48px] px-6 max-md:gap-[32px] max-md:px-4 max-sm:gap-[28px]">
        <h2
          className="m-0 text-center text-[32px] font-normal leading-[1.2] tracking-[-0.01em] text-black max-xl:text-[28px] max-lg:text-[26px] max-md:text-[24px] max-sm:text-[22px]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Explore our service offerings
        </h2>

        <div className="grid w-full grid-cols-4 gap-[15px] max-lg:grid-cols-2 max-sm:grid-cols-1 lg:gap-[20px] xl:gap-[30px]">
          {SERVICES.map((service) => (
            <article
              key={service.label}
              className="flex w-full flex-col bg-white p-[10px] pb-[18px] shadow-[0_12px_28px_rgba(0,0,0,0.18)] max-md:p-[12px] max-md:pb-[16px]"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#f3f3f3]">
                <Image
                  src={service.src}
                  alt={service.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>

              <div className="mx-auto mt-[14px] flex w-[calc(90%-20px)] max-w-full items-center justify-center bg-black px-5 py-[7.5px] max-md:mt-[1px] max-md:px-4 max-md:py-[6.5px]">
                <span className="text-center font-league-spartan text-[13px] font-[500] leading-tight tracking-[0.02em] text-white max-xl:text-[12px] max-md:text-[11px]">
                  {service.label}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;
