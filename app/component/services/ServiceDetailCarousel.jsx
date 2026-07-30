"use client";

import React, { useState } from "react";
import Link from "next/link";

const headingStyle = {
  fontFamily: '"League Spartan", sans-serif',
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

const detailLinkStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 500,
  color: "#111111",
};

function ServiceDetailCarousel({ carousel, serviceSlug }) {
  const slides = carousel?.slides ?? [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!slides.length) return null;

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="w-full bg-white px-6 py-16 md:px-12 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1340px]">
        <p
          className="m-0 mb-10 text-center text-[28px] leading-tight uppercase tracking-[-0.02em] md:mb-14 md:text-[40px] lg:text-[43px]"
          style={headingStyle}
        >
          Services We Provide
        </p>

        <div className="w-full border-t border-[#E6E6E6]">
          {slides.map((slide, index) => {
            const isOpen = activeIndex === index;
            const title = slide.content || slide.title || `Service ${index + 1}`;
            const description = slide.paragraph || slide.description || "";
            const detailHref =
              serviceSlug && slide.subSlug
                ? `/services/${serviceSlug}/${slide.subSlug}`
                : null;

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
                  <span
                    aria-hidden
                    className="inline-flex h-6 w-6 shrink-0 items-center justify-center text-[22px] leading-none text-[#333333] md:h-7 md:w-7 md:text-[26px]"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    {description || detailHref ? (
                      <div className="pb-6 md:pb-8">
                        {description ? (
                          <p
                            className="m-0 whitespace-pre-line text-[14px] leading-[1.65] md:text-[18px] md:leading-[1.7]"
                            style={descriptionStyle}
                          >
                            {description}
                          </p>
                        ) : null}
                        {detailHref ? (
                          <Link
                            href={detailHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1 text-[14px] underline underline-offset-4 transition-opacity duration-300 hover:opacity-70 md:mt-4 md:text-[16px]"
                            style={detailLinkStyle}
                          >
                            Learn more
                          </Link>
                        ) : null}
                      </div>
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
