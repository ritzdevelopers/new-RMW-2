"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const headingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 700,
  fontSize: "clamp(36px, 5vw, 56px)",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#000000",
};

const introStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "29px",
  letterSpacing: "0",
  color: "#000000",
};

const quoteStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 500,
  fontSize: "22px",
  lineHeight: "30px",
  letterSpacing: "0",
  color: "#000000",
};

const authorStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  fontSize: "28px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#000000",
};

const roleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#00000099",
};

const SLIDER_IMAGE = "/home/slider-image-1.png";

const slides = [
  {
    quote:
      "They not only make sure that they deliver on their promises, but also educate you on what exactly is needed to be done for your brand, thereby preventing you from under or over spending your precious money.",
    author: "Eldeco Group",
    role: "Managing Director",
    image: SLIDER_IMAGE,
  },
  {
    quote:
      "Ritz Media World brought clarity to our marketing spend. Their team explained every step, aligned campaigns with our goals, and helped us reach the right audience without wasting budget on channels that did not work for us.",
    author: "DLF Limited",
    role: "Chief Marketing Officer",
    image: SLIDER_IMAGE,
  },
  {
    quote:
      "From creative direction to media planning, the partnership felt strategic from day one. They do not just execute briefs — they challenge assumptions and recommend what is genuinely best for the brand.",
    author: "M3M India",
    role: "Head of Brand Communications",
    image: SLIDER_IMAGE,
  },
  {
    quote:
      "What stood out was transparency. We always knew where our money was going, what results to expect, and what needed to change. That level of honesty is rare in this industry.",
    author: "Godrej Properties",
    role: "Vice President, Marketing",
    image: SLIDER_IMAGE,
  },
  {
    quote:
      "Their content and digital campaigns helped us build stronger recall in a crowded market. The team is responsive, detail-oriented, and consistently delivers work that feels premium and purposeful.",
    author: "Signature Global",
    role: "Director, Sales & Marketing",
    image: SLIDER_IMAGE,
  },
];

const Section5 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const isFirstRender = useRef(true);
  const slide = slides[activeIndex];

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const content = contentRef.current;
    const image = imageRef.current;
    if (!content || !image) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(
        image,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.08 }
      );
    });

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section className="bg-[#FAFAFA] px-8 py-[35px] md:px-12 md:py-[70px]">
      <div className="mx-auto grid w-full max-w-8xl grid-cols-1 gap-10 overflow-hidden lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14 xl:gap-20">
        <div className="min-w-0">
          <h2
            className="m-0 text-[30px] md:text-[clamp(36px,5vw,56px)] text-center md:text-left"
            style={{
              fontFamily: headingStyle.fontFamily,
              fontWeight: headingStyle.fontWeight,
              lineHeight: headingStyle.lineHeight,
              letterSpacing: headingStyle.letterSpacing,
              textTransform: headingStyle.textTransform,
              color: headingStyle.color,
            }}
          >
            WHAT CLIENTS SAY
          </h2>

          <p className="m-0 mx-auto mt-4" style={introStyle}>
            The world&apos;s largest independent brand agency. We drive growth,
          </p>

          <div className="mt-10 overflow-hidden md:mt-12">
            <img
              src="/home/double-quotes.svg"
              alt=""
              className="block h-[72px] w-[72px] md:h-[88px] md:w-[88px]"
              aria-hidden
            />

            <div ref={contentRef}>
              <p
                className="m-0 mt-0 max-w-[900px] text-[16px] leading-[22px] md:text-[22px] md:leading-[30px]"
                style={{
                  fontFamily: quoteStyle.fontFamily,
                  fontWeight: quoteStyle.fontWeight,
                  letterSpacing: quoteStyle.letterSpacing,
                  color: quoteStyle.color,
                }}
              >
                {slide.quote}
              </p>

              <p className="m-0 mt-8" style={authorStyle}>
                {slide.author}
              </p>

              <p className="m-0 mt-2" style={roleStyle}>
                {slide.role}
              </p>
            </div>
          </div>

          <div className="mt-10 flex gap-2 md:mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full bg-[#00000033] transition-all duration-300 ${
                  index === activeIndex ? "w-8 bg-[#000000]" : "w-2"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[420px] shrink-0 overflow-hidden lg:mx-0 lg:max-w-[460px]">
          <img
            ref={imageRef}
            src={SLIDER_IMAGE}
            alt={slide.author}
            className="lg:mt-35 mt-3 block h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Section5;
