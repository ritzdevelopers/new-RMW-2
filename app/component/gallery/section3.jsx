"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const headingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#000000",
};

const nameStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  fontSize: "28px",
  lineHeight: "100%",
  letterSpacing: "0",
  textAlign: "center",
  textTransform: "capitalize",
  color: "#000000",
};

const leaders = [
  {
    name: "Ritesh Malik",
    image: "/gallery/ritz-malik-boss.png",
    width: 331,
    height: 318,
  },
  {
    name: "Satvinder Kaur",
    image: "/gallery/kour-mam.png",
    width: 331,
    height: 318,
  },
  {
    name: "Nishi Malik",
    image: "/gallery/nishi-mam.png",
    width: 331,
    height: 318,
  },
];

const Section3 = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cards = gsap.utils.toArray("[data-leader-card]", section);
    const heading = section.querySelector("[data-leader-heading]");

    if (prefersReducedMotion) {
      gsap.set([heading, ...cards], { clearProps: "all", opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (heading) {
        gsap.from(heading, {
          y: 40,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }

      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 72,
          opacity: 0,
          scale: 0.94,
          duration: 0.9,
          ease: "power3.out",
          delay: index * 0.18,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAFAFA] px-6 py-[35px] md:px-10 md:py-[70px]"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <h2
          data-leader-heading
          style={headingStyle}
          className="m-0 text-center text-[30px] md:text-[50px] lg:text-[60px] xl:text-[80px]"
        >
          Our core Leadership
        </h2>

        <div className="mt-10 flex flex-col items-center justify-center gap-10 md:mt-15 md:flex-row md:items-start md:gap-8 lg:mt-20 lg:gap-12 xl:mt-25">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              data-leader-card
              className={`flex w-full max-w-[331px] flex-col items-center gap-4 will-change-transform ${
                leader.name === "Satvinder Kaur" ? "md:-translate-y-[50px]" : ""
              }`}
            >
              <div
                className="relative w-full overflow-hidden rounded-md bg-white"
                style={{ aspectRatio: `${leader.width} / ${leader.height}` }}
              >
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 280px, 331px"
                />
              </div>
              <p
                style={nameStyle}
                className="m-0 w-full text-[22px] md:text-[28px]"
              >
                {leader.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3;
