"use client";

import React, { useState } from "react";

const headingStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  color: "#111111",
};

const titleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 400,
  color: "#333333",
};

const descriptionStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  color: "#333333",
};

function ServiceDetailCarousel({ carousel }) {
  const slides = carousel?.slides ?? [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!slides.length) return null;

  const handleToggle = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="w-full bg-white px-6 py-16 md:px-12 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1340px]">
        <h2
          className="m-0 mb-10 text-center text-[28px] leading-tight tracking-[-0.02em] md:mb-14 md:text-[40px] lg:text-[43px]"
          style={headingStyle}
        >
          We Create Visuals
        </h2>

        <div className="w-full border-t border-[#E6E6E6]">
          {slides.map((slide, index) => {
            const isOpen = activeIndex === index;
            const title = slide.content || slide.title || `Service ${index + 1}`;
            const description = slide.paragraph || slide.description || "";

            return (
              <div key={`${title}-${index}`} className="border-b border-[#E6E6E6]">
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 bg-transparent py-5 text-left md:py-6"
                >
                  <span
                    className="text-[18px] leading-snug md:text-[22px] lg:text-[24px]"
                    style={titleStyle}
                  >
                    {title}
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    {description ? (
                      <p
                        className="m-0 pb-6 text-[14px] leading-[1.65] md:pb-8 md:text-[18px] md:leading-[1.7]"
                        style={descriptionStyle}
                      >
                        {description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServiceDetailCarousel;
