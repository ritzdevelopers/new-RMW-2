"use client";

import React, { useState } from "react";
import Link from "next/link";

const numberStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(24px, 3vw, 36px)",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
};

const titleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
};

const HOVER_IMAGE = "/home/digital-hover.jpg";

const services = [
  {
    number: "01",
    title: "Digital Marketing",
    slug: "digital-marketing",
  },
  {
    number: "02",
    title: "Creative Services",
    slug: "creative-services",
  },
  {
    number: "03",
    title: "Print Advertising",
    slug: "print-advertising",
  },
  {
    number: "04",
    title: "Radio Advertising",
    slug: "radio-advertising",
  },
  {
    number: "05",
    title: "Content Marketing",
    slug: "contents-marketing",
  },
  {
    number: "06",
    title: "Celebrity Endorsements",
    slug: "celebrity-endorsements",
  },
];

const Section4 = () => {
  const [activeSlug, setActiveSlug] = useState(null);

  return (
    <section className="bg-white px-8 py-16 md:px-12 md:py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-8xl flex-col items-center">
        <ul className="m-0 flex w-full list-none flex-col items-center gap-6 p-0 md:gap-8 lg:gap-10">
          {services.map((service) => {
            const isActive = activeSlug === service.slug;

            return (
              <li
                key={service.slug}
                className="relative w-full text-center"
                onMouseEnter={() => setActiveSlug(service.slug)}
                onMouseLeave={() => setActiveSlug(null)}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="relative z-10 inline-flex items-baseline justify-center gap-4 md:gap-6 lg:gap-10"
                >
                  <span
                    className="shrink-0 transition-colors duration-300"
                    style={{
                      ...numberStyle,
                      color: isActive ? "#000000" : "#00000033",
                    }}
                  >
                    {service.number}
                  </span>
                  <span
                    className="text-[30px] transition-colors duration-300 md:text-[50px] lg:text-[60px] xl:text-[96px]"
                    style={{
                      ...titleStyle,
                      color: isActive ? "#000000" : "#00000033",
                    }}
                  >
                    {service.title}
                  </span>
                </Link>

                {isActive ? (
                  <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-y-1/2 translate-x-[clamp(140px,22vw,360px)] md:block">
                    <img
                      src={HOVER_IMAGE}
                      alt=""
                      className="block h-auto w-[min(300px,26vw)] object-contain shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
                    />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Section4;
