"use client";

import React, { useState } from "react";

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

const INLINE_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const linkClassName =
  "underline underline-offset-[3px] decoration-[1px] transition-opacity hover:opacity-70";

function renderInline(text) {
  const nodes = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  INLINE_LINK_RE.lastIndex = 0;

  while ((match = INLINE_LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    nodes.push(
      <a
        key={key++}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {match[1]}
      </a>,
    );

    lastIndex = INLINE_LINK_RE.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length ? nodes : text;
}

function renderDescription(description) {
  return description.split("\n").map((line, index) => {
    const trimmed = line.trimStart();

    if (trimmed.startsWith("•")) {
      return (
        <span key={index} className="flex items-start gap-2.5 md:gap-3">
          <span
            aria-hidden
            className="mt-[0.55em] inline-block h-[0.35em] w-[0.35em] shrink-0 rounded-full bg-current md:mt-[0.6em] md:h-[0.4em] md:w-[0.4em]"
          />
          <span>{renderInline(trimmed.slice(1).trimStart())}</span>
        </span>
      );
    }

    if (line === "") {
      return <span key={index}>{"\n"}</span>;
    }

    return (
      <span key={index}>
        {renderInline(line)}
        {"\n"}
      </span>
    );
  });
}
function ServiceDetailCarousel({ carousel }) {
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
            const title =
              slide.content || slide.title || `Service ${index + 1}`;
            const description = slide.paragraph || slide.description || "";

            return (
              <div
                key={`${title}-${index}`}
                className="border-b border-[#E6E6E6]"
              >
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
                    {description ? (
                      <div className="pb-6 md:pb-8">
                        <p
                          className="m-0 whitespace-pre-line text-[14px] leading-[1.65] md:text-[18px] md:leading-[1.7]"
                          style={descriptionStyle}
                        >
                          {renderDescription(description)}
                        </p>
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
