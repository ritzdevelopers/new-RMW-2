"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesContactCta } from "@/data/services";
import ServiceDetailMediaButton from "@/app/component/services/ServiceDetailMediaButton";

gsap.registerPlugin(ScrollTrigger);

const headingStyle = {
  color: "#333333",
  textAlign: "center",
  fontFamily: '"League Spartan", sans-serif',
  fontStyle: "normal",
  fontWeight: 600,
  textTransform: "uppercase",
};

const bodyStyle = {
  color: "#333333",
  textAlign: "center",
  fontFamily: "Montserrat, sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
};

const Service4 = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const block = section.querySelector("[data-portfolio-cta-block]");
      const items = gsap.utils.toArray("[data-portfolio-cta-reveal]", section);

      if (!block || !items.length) return;

      if (prefersReducedMotion) {
        gsap.set(items, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 32 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: block,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex justify-center items-center py-14 md:py-20"
    >
      <div className="w-full max-w-[1340px] flex flex-col items-center max-xl:px-6 max-md:px-4">
        <div
          data-portfolio-cta-block
          className="mx-auto flex w-full flex-col items-center xl:max-w-[1135px]"
        >
          <div
            data-portfolio-cta-reveal
            className="mb-10 h-px w-full max-w-[220px] bg-[#0D1334]/20 md:mb-12"
          />

          <div className="flex w-full flex-col items-center px-6 sm:px-10 max-lg:px-0 max-lg:sm:px-4">
            <h2
              data-portfolio-cta-reveal
              className="m-0 w-full text-center uppercase text-[24px] leading-[34px] sm:leading-[42px] md:text-[30px] md:leading-[38px] lg:text-[38px] lg:leading-[48px] xl:max-w-[1135px] xl:text-[48px] xl:leading-[57px]"
              style={headingStyle}
            >
              {servicesContactCta.heading}
            </h2>

            <p
              data-portfolio-cta-reveal
              className="m-0 mt-5 w-full text-center text-[16px] leading-7 md:mt-6 lg:text-[18px] lg:leading-8 xl:max-w-[986px] xl:text-[20px] xl:leading-[30px]"
              style={bodyStyle}
            >
              {servicesContactCta.body}
            </p>

            <div data-portfolio-cta-reveal className="mt-8 md:mt-10">
              <ServiceDetailMediaButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service4;
