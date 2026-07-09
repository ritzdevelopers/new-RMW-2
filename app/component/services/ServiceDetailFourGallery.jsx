"use client";

import React, { useLayoutEffect, useRef } from "react";
import { Montserrat } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceDetailMediaButton from "./ServiceDetailMediaButton";

gsap.registerPlugin(ScrollTrigger);

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const titleStyle = {
  color: "#333333",
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  textTransform: "uppercase",
};

const bodyStyle = {
  color: "#555555",
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
};

const imageContentHeadingStyle = {
  color: "#333333",
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  textTransform: "uppercase",
};

const imageContentBodyStyle = {
  color: "#555555",
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
};

const Reveal = ({ children, className = "", group = "header" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <span
      data-four-gallery-reveal={group}
      className="block w-full will-change-transform"
    >
      {children}
    </span>
  </span>
);

const MediaTile = ({ item, index }) => {
  const isVideo = item.src.includes(".mp4");
  const label = String(index + 1).padStart(2, "0");

  return (
    <article
      data-four-gallery-card
      className={`group relative ${item.className ?? ""}`}
    >
      <div
        data-four-gallery-frame
        className="relative h-full w-full overflow-hidden rounded-[20px] bg-[#E4E4E4] shadow-[0_20px_50px_rgba(13,19,52,0.08)] ring-1 ring-black/5 transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_60px_rgba(13,19,52,0.14)]"
        style={{ aspectRatio: item.aspectRatio ?? "1 / 1" }}
      >
        <div data-four-gallery-media className="absolute inset-0 overflow-hidden">
          {isVideo ? (
            <video
              src={item.src}
              className="block h-full w-full object-cover object-center"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={item.src}
              alt=""
              className="block h-full w-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
            />
          )}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1334]/55 via-[#0D1334]/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 md:p-5">
          <span className="font-sequel text-[11px] font-[310] uppercase tracking-[0.22em] text-white/85 md:text-xs">
            {item.label ?? `Project ${label}`}
          </span>
          <span className="font-league-spartan text-[28px] font-semibold leading-none text-white/90 md:text-[34px]">
            {label}
          </span>
        </div>

        <div className="pointer-events-none absolute left-0 top-0 h-[3px] w-0 bg-[#FFD188] transition-all duration-500 ease-out group-hover:w-full" />
      </div>
    </article>
  );
};

const ServiceDetailFourGallery = ({ mediaSection }) => {
  const sectionRef = useRef(null);
  const { title, description, gallery, imageContent } = mediaSection;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headerReveals = gsap.utils.toArray("[data-four-gallery-reveal='header']", section);
      const footerReveals = gsap.utils.toArray("[data-four-gallery-reveal='footer']", section);
      const cards = gsap.utils.toArray("[data-four-gallery-card]", section);
      const footerCta = section.querySelector("[data-four-gallery-footer-cta]");
      const divider = section.querySelector("[data-four-gallery-divider]");
      const footerBlock = section.querySelector("[data-four-gallery-footer-block]");

      gsap.set(headerReveals, { yPercent: 110 });
      gsap.set(footerReveals, { yPercent: 110 });
      gsap.set(cards, { y: 80, opacity: 0, scale: 0.92 });
      if (footerCta) gsap.set(footerCta, { y: 28, opacity: 0 });
      if (divider) gsap.set(divider, { scaleX: 0, transformOrigin: "left center" });

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      });

      introTl
        .to(headerReveals, {
          yPercent: 0,
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.1,
        })
        .to(
          cards,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.15,
          },
          "-=0.55"
        );

      if (footerBlock) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: footerBlock,
              start: "top 88%",
              toggleActions: "play none none reset",
            },
          })
          .to(divider, {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.inOut",
          })
          .to(
            footerReveals,
            {
              yPercent: 0,
              duration: 0.95,
              ease: "power4.out",
              stagger: 0.1,
            },
            "-=0.45"
          )
          .to(
            footerCta,
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power4.out",
            },
            "-=0.35"
          );
      }

      cards.forEach((card) => {
        const media = card.querySelector("[data-four-gallery-media]");
        if (!media) return;

        gsap.fromTo(
          media,
          { yPercent: 6 },
          {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  if (!gallery?.length) return null;

  return (
    <section
      ref={sectionRef}
      className={`${montserrat.className} relative overflow-x-clip bg-[#F1F1F1] py-14 md:py-20 lg:py-24`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-[#FFD188]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-32 h-64 w-64 rounded-full bg-[#0D1334]/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-10 md:px-[50px]">
        <div className="mx-auto flex w-full max-w-[900px] flex-col items-center text-center">
          {title ? (
            <Reveal>
              <h2
                className="m-0 w-full text-center uppercase text-[30px] leading-[38px] sm:text-[42px] sm:leading-[48px] lg:text-[56px] lg:leading-[64px] xl:text-[65px] xl:leading-[74px]"
                style={titleStyle}
              >
                {title}
              </h2>
            </Reveal>
          ) : null}

          {description ? (
            <Reveal className="mt-5 md:mt-6">
              <p
                className="m-0 w-full text-center text-[16px] leading-7 lg:text-[18px] lg:leading-8 xl:max-w-[760px] xl:text-[20px] xl:leading-[30px]"
                style={bodyStyle}
              >
                {description}
              </p>
            </Reveal>
          ) : null}
        </div>

        <div className="mx-auto mt-12 grid w-full max-w-[1200px] grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 md:gap-5 lg:grid-cols-12 lg:grid-rows-[minmax(220px,1fr)_minmax(220px,1fr)_minmax(200px,auto)] lg:gap-6">
          {gallery.map((item, index) => (
            <MediaTile key={`${item.src}-${index}`} item={item} index={index} />
          ))}
        </div>

        {imageContent ? (
          <div
            data-four-gallery-footer-block
            className="mx-auto mt-14 flex w-full max-w-full flex-col items-center md:mt-20 xl:max-w-[1135px]"
          >
            <div
              data-four-gallery-divider
              className="mb-10 h-px w-full max-w-[220px] bg-[#0D1334]/20 md:mb-12"
            />

            <div className="flex w-full flex-col items-center px-6 sm:px-10 max-lg:px-0 max-lg:sm:px-4">
              {imageContent.heading ? (
                <Reveal group="footer">
                  <h2
                    className="m-0 w-full text-center uppercase text-[24px] leading-[34px] sm:leading-[42px] md:text-[30px] md:leading-[38px] lg:text-[38px] lg:leading-[48px] xl:max-w-[1135px] xl:text-[48px] xl:leading-[57px]"
                    style={imageContentHeadingStyle}
                  >
                    {imageContent.heading}
                  </h2>
                </Reveal>
              ) : null}

              {imageContent.body ? (
                <Reveal group="footer" className="mt-5 md:mt-6">
                  <p
                    className="m-0 w-full text-center text-[16px] leading-7 lg:text-[18px] lg:leading-8 xl:max-w-[986px] xl:text-[20px] xl:leading-[30px]"
                    style={imageContentBodyStyle}
                  >
                    {imageContent.body}
                  </p>
                </Reveal>
              ) : null}

              <div data-four-gallery-footer-cta className="mt-8 md:mt-10">
                <ServiceDetailMediaButton />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ServiceDetailFourGallery;
