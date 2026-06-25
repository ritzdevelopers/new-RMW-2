"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Montserrat } from "next/font/google";
import { services, getServiceHref } from "../../../data/services";

gsap.registerPlugin(ScrollTrigger);

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const eyebrowStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "24px",
  fontWeight: 500,
  lineHeight: "normal",
  color: "rgba(51, 51, 51, 0.60)",
};

const bodyTextStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  color: "#333333",
};

const sidebarLabelStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "normal",
  color: "rgba(51, 51, 51, 0.60)",
};

const serviceLinkStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "28px",
  color: "#333333",
};

const Reveal = ({ children, className = "" }) => (
  <span className={`block overflow-hidden py-[2px] ${className}`}>
    <span data-svc-intro-reveal className="block w-full">
      {children}
    </span>
  </span>
);

const sidebarServices = services.map((item) => ({
  label: item.title.toUpperCase(),
  href: getServiceHref(item.slug),
}));

const normalizeIntroImage = (image) =>
  typeof image === "string"
    ? { src: image, width: 1, height: 1, aspectRatio: "1 / 1" }
    : image;

const ServiceDetailIntro = ({ intro, activeSlug }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-svc-intro-reveal]", content);
      gsap.set(items, { yPercent: 110 });

      gsap.timeline({
        scrollTrigger: {
          trigger: content,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }).to(items, {
        yPercent: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
      });
    }, content);

    return () => ctx.revert();
  }, []);

  if (!intro) return null;

  const introImages = intro.images.map(normalizeIntroImage);
  const bodyCopy = Array.isArray(intro.body) ? intro.body.join(" ") : intro.body;

  return (
    <section ref={sectionRef} className="m-0 overflow-x-clip bg-[#F1F1F1] pt-0">
      <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-start">
        {introImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="flex w-full min-w-0 items-center justify-center sm:flex-1"
            style={image.height ? { height: `${image.height}px` } : undefined}
          >
            <img
              src={image.src}
              alt=""
              width={image.width}
              height={image.height}
              className="block h-full w-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div
        ref={contentRef}
        className={`${montserrat.className} mx-auto flex w-full max-w-[1440px] items-center justify-center px-6 sm:px-10  md:px-[50px] py-[35px] md:py-[70px] `}
      >
        <div className="w-full">
          <Reveal>
            <p className="m-0 self-stretch uppercase" style={eyebrowStyle}>
              {intro.eyebrow}
            </p>
          </Reveal>

          <div className="mt-5 flex flex-col gap-10 md:mt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12 xl:gap-16">
            <Reveal className="min-w-0 flex-1 lg:max-w-[780px] xl:max-w-[860px]">
              <p
                className="m-0 self-stretch capitalize text-[22px] leading-[34px] sm:text-[28px] sm:leading-[44px] md:text-[32px] md:leading-[52px] xl:text-[36px] lg:text-[26px] xl:leading-[61px] lg:leading-[40px]"
                style={bodyTextStyle}
              >
                {bodyCopy}
              </p>
            </Reveal>

            <aside className="min-w-0 w-full shrink-0 lg:ml-auto lg:w-[280px] xl:w-[320px]">
              <Reveal>
                <p className="m-0 text-right uppercase" style={sidebarLabelStyle}>
                  {intro.sidebarLabel ?? "Services"}
                </p>
              </Reveal>

              <ul className="mt-5 space-y-0 sm:mt-6">
                {sidebarServices.map((item) => (
                  <li key={item.label}>
                    <Reveal>
                      <Link
                        href={item.href}
                        className="block text-right uppercase transition-opacity duration-300 hover:opacity-70"
                        style={serviceLinkStyle}
                      >
                        {item.label}
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailIntro;
