"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredServices, getServiceHref } from "../../../data/services";

gsap.registerPlugin(ScrollTrigger);

const sideLabelStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#333333",
};

const headlineLineStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(56px, 8.5vw, 92px)",
  lineHeight: "1",
  letterSpacing: "0.01em",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const CARD_ASPECT = "69 / 73";
const HEADLINE_LINES = ["STA", "ND", "OUT"];

const ServicesGrid = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const hoverTweens = new Map();

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-svc-card]", section).forEach((card, index) => {
        const image = card.querySelector("[data-svc-image]");
        const overlay = card.querySelector("[data-svc-overlay]");
        const bottomScrim = card.querySelector("[data-svc-bottom-scrim]");
        const meta = card.querySelectorAll("[data-svc-meta]");
        const headlineLines = card.querySelectorAll("[data-svc-headline-text]");
        const arrow = card.querySelector("[data-svc-arrow]");

        gsap.set(card, { opacity: 0, y: 80, scale: 0.94 });
        gsap.set(meta, { opacity: 0, y: 16 });
        gsap.set(headlineLines, { opacity: 0, y: 28 });
        gsap.set(overlay, { opacity: 1 });
        gsap.set(bottomScrim, { opacity: 0.72 });
        gsap.set(arrow, { opacity: 0, scale: 0.6, rotation: -45 });

        const enterTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        enterTl
          .to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
          })
          .to(
            meta,
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
              stagger: 0.08,
            },
            "-=0.55",
          )
          .to(
            headlineLines,
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power4.out",
              stagger: 0.1,
            },
            "-=0.45",
          )
          .to(
            arrow,
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.7,
              ease: "back.out(1.7)",
            },
            "-=0.35",
          );

        const onEnter = () => {
          hoverTweens.get(card)?.kill();
          hoverTweens.set(
            card,
            gsap
              .timeline({ defaults: { ease: "power3.out", overwrite: "auto" } })
              .to(card, { y: -10, duration: 0.55 }, 0)
              .to(image, { scale: 1.08, duration: 0.85 }, 0)
              .to(bottomScrim, { opacity: 0.95, duration: 0.55 }, 0)
              .to(
                headlineLines,
                { x: 10, duration: 0.45, stagger: 0.05, ease: "power2.out" },
                0,
              )
              .to(arrow, { scale: 1.12, rotation: 45, duration: 0.45, ease: "back.out(2)" }, 0),
          );
        };

        const onLeave = () => {
          hoverTweens.get(card)?.kill();
          hoverTweens.set(
            card,
            gsap
              .timeline({ defaults: { ease: "power3.out", overwrite: "auto" } })
              .to(card, { y: 0, duration: 0.65 }, 0)
              .to(image, { scale: 1, duration: 0.75 }, 0)
              .to(bottomScrim, { opacity: 0.72, duration: 0.55 }, 0)
              .to(headlineLines, { x: 0, duration: 0.55, stagger: 0.04 }, 0)
              .to(arrow, { scale: 1, rotation: 0, duration: 0.45 }, 0),
          );
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        card._svcHoverCleanup = () => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        };

        if (index % 2 === 1) {
          enterTl.timeScale(1.05);
        }
      });

      const sideLabel = section.querySelector("[data-svc-side-label]");
      if (sideLabel) {
        gsap.from(sideLabel, {
          opacity: 0,
          x: -32,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, section);

    return () => {
      hoverTweens.forEach((tween) => tween.kill());
      hoverTweens.clear();
      gsap.utils.toArray("[data-svc-card]", section).forEach((card) => card._svcHoverCleanup?.());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5F5F5] px-4 py-12 md:px-8 md:py-16 md:pb-28 lg:px-12 lg:py-20 lg:pb-36"
    >
      <div className="mx-auto flex w-full max-w-[min(100%,1320px)] items-start gap-4 md:gap-8 lg:gap-12">
        <div
          data-svc-side-label
          className="sticky top-24 hidden shrink-0 lg:block"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          <span style={sideLabelStyle} className="text-[14px] xl:text-[18px]">
            Ritzmedia
          </span>
        </div>

        <div className="grid min-w-0 flex-1 grid-cols-1 items-start justify-items-center gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-0 lg:gap-x-8">
          {featuredServices.map((service, index) => (
            <Link
              key={service.slug}
              href={getServiceHref(service.slug)}
              data-svc-card
              className={`group relative block w-full max-w-[587px] overflow-hidden rounded-none bg-[#1D1D1B] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] will-change-transform md:h-[621px] md:w-[587px] md:max-w-none ${
                index % 2 === 1 ? "md:mt-20 lg:mt-28 xl:mt-36" : ""
              }`}
              style={{ aspectRatio: CARD_ASPECT }}
            >
              <img
                data-svc-image
                src={service.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-top will-change-transform"
                draggable={false}
              />
              <div
                data-svc-overlay
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent"
                aria-hidden
              />
              <div
                data-svc-bottom-scrim
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/70 to-transparent"
                aria-hidden
              />

              <div className="relative z-10 flex h-full flex-col p-5 md:p-6 lg:p-7">
                <div className="relative z-20 flex shrink-0 items-start justify-between gap-3">
                  <span
                    data-svc-meta
                    className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] md:text-[12px]"
                    style={{ fontFamily: '"Sequel Sans", sans-serif' }}
                  >
                    No. {service.number}
                  </span>
                  <span
                    data-svc-meta
                    className="text-right text-[10px] font-medium uppercase tracking-[0.14em] text-white/80 [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] md:text-[11px]"
                    style={{ fontFamily: '"Sequel Sans", sans-serif' }}
                  >
                    {service.category}
                  </span>
                </div>

                <div className="min-h-[38%] shrink-0" aria-hidden />

                <div className="mt-auto flex items-end justify-between gap-4">
                  <div className="max-w-[58%] select-none pb-1">
                    {HEADLINE_LINES.map((line) => (
                      <span key={line} className="block">
                        <span
                          data-svc-headline-text
                          className="block [text-shadow:0_2px_18px_rgba(0,0,0,0.35)]"
                          style={headlineLineStyle}
                        >
                          {line}
                        </span>
                      </span>
                    ))}
                  </div>

                  <span
                    data-svc-arrow
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm will-change-transform md:h-12 md:w-12"
                  >
                    <i className="ri-arrow-right-up-line text-[18px] text-white md:text-[20px]" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
