"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const titleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 700,
  textTransform: "uppercase",
  color: "#1D1D1B",
};

const bodyStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  color: "#333333",
};

function SubServiceSectionCard({ card, index }) {
  const imageFirst = index % 2 === 0;

  return (
    <article
      data-sub-section
      className="w-full"
    >
      <div
        className={`flex w-full flex-col gap-6 lg:h-[470px] lg:gap-14 ${
          imageFirst ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        <div
          data-sub-section-image
          className="relative aspect-[653/470] w-full overflow-hidden bg-[#E8E8E8] lg:aspect-auto lg:h-full lg:w-[min(100%,653px)] lg:shrink-0"
        >
          <img
            src={card.image}
            alt={`${card.title} – Ritz Media World`}
            className="h-full w-full object-cover object-center"
            draggable={false}
          />
        </div>

        <div
          data-sub-section-copy
          className={`flex flex-col justify-center gap-4 lg:max-w-[470px] lg:flex-1 ${
            imageFirst
              ? "items-center text-center lg:items-start lg:text-left"
              : "items-center text-center lg:items-end lg:text-right"
          }`}
        >
          <h2
            className="m-0 w-full text-[22px] leading-tight md:text-[28px] lg:text-[30px]"
            style={titleStyle}
          >
            {card.title}
          </h2>
          <p
            className="m-0 w-full text-[15px] leading-[26px] md:text-[16px] md:leading-[28px]"
            style={bodyStyle}
          >
            {card.description}
          </p>
        </div>
      </div>
    </article>
  );
}

const SubServiceSections = ({ cards = [] }) => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !cards.length) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-sub-section]", section).forEach((item) => {
        const image = item.querySelector("[data-sub-section-image]");
        const copy = item.querySelector("[data-sub-section-copy]");

        gsap.set([image, copy], { opacity: 0, y: 40 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          })
          .to(image, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power4.out",
          })
          .to(
            copy,
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
            },
            "-=0.55",
          );
      });
    }, section);

    return () => ctx.revert();
  }, [cards]);

  if (!cards.length) {
    return (
      <section className="bg-[#F5F5F5] px-4 py-16 text-center">
        <p className="m-0 text-[16px] text-[#333333]" style={bodyStyle}>
          Service content is currently unavailable.
        </p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-[#F5F5F5] px-4 py-10 sm:px-6 md:py-[70px] lg:px-12">
      <div className="mx-auto flex w-full max-w-[1300px] flex-col gap-10 md:gap-12 lg:gap-16">
        {cards.map((card, index) => (
          <SubServiceSectionCard key={card.id || `${card.title}-${index}`} card={card} index={index} />
        ))}
      </div>
    </section>
  );
};

export default SubServiceSections;
