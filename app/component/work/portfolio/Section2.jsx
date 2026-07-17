"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    src: "/portfolio/logo-design.png",
    alt: "Logo Design",
    label: "Logo Design",
    href: "/portfolio-page/logo",
  },
  {
    src: "/portfolio/creative.png",
    alt: "Creative Design",
    label: "Creative Design",
    href: "/portfolio-page/creative",
  },
  {
    src: "/portfolio/website-design.png",
    alt: "Website Design",
    label: "Website Design",
    href: "/portfolio-page/web-design",
  },
  {
    src: "/portfolio/ai-video.png",
    alt: "AI Video Generation",
    label: "AI Video",
    href: "/portfolio-page/ai-videos",
  },
];

const Section2 = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cards = gsap.utils.toArray("[data-service-card]", section);

    if (prefersReducedMotion) {
      gsap.set(cards, { clearProps: "all", opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        gsap.from(card, {
          x: 80,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          delay: index * 0.12,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
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
      className="w-full bg-[#FAFAFA] py-[72px] max-xl:py-[60px] max-md:py-[48px] max-sm:py-[40px]"
    >
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
              data-service-card
              className="flex w-full flex-col bg-white p-[10px] pb-[18px] shadow-[0_12px_28px_rgba(0,0,0,0.18)] will-change-transform max-md:p-[12px] max-md:pb-[16px]"
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

              <Link
                href={service.href}
                className="group/btn relative mx-auto mt-[14px] flex w-[calc(90%-20px)] max-w-full items-center justify-center overflow-hidden border-[0.5px] border-black bg-black px-5 py-[7.5px] max-md:mt-3 max-md:px-4 max-md:py-[6.5px]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover/btn:scale-x-100"
                />
                <span className="relative z-10 text-center font-league-spartan text-[13px] font-[500] leading-tight tracking-[0.02em] text-white transition-colors duration-500 group-hover/btn:text-black max-xl:text-[12px] max-md:text-[11px]">
                  {service.label}
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;
