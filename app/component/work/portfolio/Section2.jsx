"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceDetailMediaButton from "../../services/ServiceDetailMediaButton";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    src: "/portfolio/logo-design.png",
    alt: "Brand Identity ",
    label: "Brand Identity ",
    href: "/portfolio/logo",
  },
  {
    src: "/portfolio/creative.png",
    alt: "Creative Design",
    label: "Creative Design",
    href: "/portfolio/creative",
  },
  {
    src: "/portfolio/website-design.png",
    alt: "Website Design",
    label: "Website Design",
    href: "/portfolio/web-design",
  },
  {
    src: "/portfolio/ai-video.png",
    alt: "AI Video Generation",
    label: "AI Video",
    href: "/portfolio/brand-films",
  },
  {
    src: "/portfolio/website-design.png",
    alt: "Walk-Through Videos",
    label: "Walk-Through",
    href: "/portfolio/walk-through-videos",
  },
];

const Section2 = () => {
  const sectionRef = useRef(null);
  const pathname = usePathname();

  const visibleServices = useMemo(() => {
    const path = (pathname || "").replace(/\/$/, "") || "/";
    if (path === "/portfolio") return SERVICES;
    return SERVICES.filter((service) => service.href !== path);
  }, [pathname]);

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
  }, [visibleServices]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#FAFAFA] py-[72px] max-xl:py-[60px] max-md:py-[48px] max-sm:py-[40px]"
    >
      <div className="mx-auto flex w-full max-w-[1560px] flex-col items-center gap-[48px] px-6 max-md:gap-[32px] max-md:px-4 max-sm:gap-[28px]">
        <h2
          className="m-0 text-center text-[42px] font-[600] uppercase leading-[1.2] tracking-[-0.01em] text-black max-xl:text-[28px] max-lg:text-[26px] max-md:text-[24px] max-sm:text-[22px]"
          style={{ fontFamily: "League Spartan, sans-serif" }}
        >
          Explore our latest work
        </h2>

        <div className="flex w-full flex-wrap justify-center gap-[15px] lg:gap-[20px] xl:gap-[24px]">
          {visibleServices.map((service) => (
            <article
              key={service.label}
              data-service-card
              className="flex w-full flex-col bg-white p-[10px] pb-[18px] shadow-[0_12px_28px_rgba(0,0,0,0.18)] will-change-transform max-md:p-[12px] max-md:pb-[16px] sm:w-[calc(50%-7.5px)] lg:w-[calc(33.333%-14px)] xl:w-[calc((100%-96px)/5)]"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#f3f3f3]">
                <Image
                  src={service.src}
                  alt={service.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>

              <ServiceDetailMediaButton
                label={service.label}
                href={service.href}
                className="mt-[14px] max-md:mt-3"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;
