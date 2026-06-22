"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, getServiceHref } from "../../../data/services";

gsap.registerPlugin(ScrollTrigger);

const sideLabelStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  fontSize: "94px",
  fontStyle: "normal",
  lineHeight: "normal",
  textTransform: "uppercase",
  color: "#333",
  whiteSpace: "nowrap",
};

const headlineBaseStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

function splitHeadlineParts(words) {
  const upper = words.map((word) => word.toUpperCase());

  if (upper.length >= 3) {
    return [upper[0], upper[1], upper.slice(2).join(" ")];
  }

  if (upper.length === 2) {
    return [upper[0], upper[1], null];
  }

  return [upper[0] || "", null, null];
}

function CardHeadline({ words }) {
  const parts = splitHeadlineParts(words);
  const singleLine = words.map((word) => word.toUpperCase()).join(" ");

  return (
    <div
      data-svc-headline
      className="relative origin-bottom-left pb-1 transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1"
    >
      <p
        data-svc-headline-compact
        style={headlineBaseStyle}
        className="m-0 whitespace-nowrap text-[clamp(17px,3.8vw,26px)] leading-[1.05] [text-shadow:0_2px_18px_rgba(0,0,0,0.35)]"
      >
        {singleLine}
      </p>

      <p
        data-svc-headline-scattered
        style={headlineBaseStyle}
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 m-0 flex flex-col gap-y-[0.55em] text-[clamp(40px,8.5vw,56px)] leading-[1.05] opacity-0 [text-shadow:0_2px_18px_rgba(0,0,0,0.35)] lg:gap-y-[0.65em] lg:text-[clamp(48px,7.2vw,72px)] lg:leading-[1.08]"
      >
        <span data-svc-headline-line className="block whitespace-nowrap">
          {parts[0]}
        </span>
        {parts[1] ? (
          <span data-svc-headline-line className="block whitespace-nowrap pl-[1.1em]">
            {parts[1]}
          </span>
        ) : null}
        {parts[2] ? (
          <span data-svc-headline-line className="block whitespace-nowrap">
            {parts[2]}
          </span>
        ) : null}
      </p>
    </div>
  );
}

const ServicesGrid = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const hoverTweens = new Map();
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-svc-card]", section).forEach((card, index) => {
        const image = card.querySelector("[data-svc-image]");
        const overlay = card.querySelector("[data-svc-overlay]");
        const bottomScrim = card.querySelector("[data-svc-bottom-scrim]");
        const meta = card.querySelectorAll("[data-svc-meta]");
        const headlineCompact = card.querySelector("[data-svc-headline-compact]");
        const headlineScattered = card.querySelector("[data-svc-headline-scattered]");
        const headlineLines = card.querySelectorAll("[data-svc-headline-line]");
        const headlineWrap = card.querySelector("[data-svc-headline]");
        const arrow = card.querySelector("[data-svc-arrow]");

        gsap.set(card, { opacity: 0, y: 80, scale: 0.94 });
        gsap.set(meta, { opacity: 0, y: 16 });
        gsap.set(headlineCompact, { opacity: 0, y: 20 });
        gsap.set(headlineScattered, { opacity: 0 });
        gsap.set(headlineLines, { opacity: 0, y: 18 });
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
            headlineCompact,
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power4.out",
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
          if (!canHover) return;

          hoverTweens.get(card)?.kill();
          hoverTweens.set(
            card,
            gsap
              .timeline({ defaults: { ease: "power3.out", overwrite: "auto" } })
              .to(card, { y: -10, duration: 0.55 }, 0)
              .to(image, { scale: 1.08, duration: 0.85 }, 0)
              .to(bottomScrim, { opacity: 0.95, duration: 0.55 }, 0)
              .to(headlineWrap, { y: -8, duration: 0.55 }, 0)
              .to(headlineCompact, { opacity: 0, y: -10, duration: 0.35 }, 0)
              .set(headlineScattered, { pointerEvents: "auto" }, 0.1)
              .to(headlineScattered, { opacity: 1, duration: 0.15 }, 0.1)
              .fromTo(
                headlineLines,
                { y: 22, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.6,
                  stagger: 0.09,
                  ease: "power4.out",
                },
                0.14,
              )
              .to(arrow, { scale: 1.12, rotation: 45, duration: 0.45, ease: "back.out(2)" }, 0),
          );
        };

        const onLeave = () => {
          if (!canHover) return;

          hoverTweens.get(card)?.kill();
          hoverTweens.set(
            card,
            gsap
              .timeline({ defaults: { ease: "power3.out", overwrite: "auto" } })
              .to(card, { y: 0, duration: 0.65 }, 0)
              .to(image, { scale: 1, duration: 0.75 }, 0)
              .to(bottomScrim, { opacity: 0.72, duration: 0.55 }, 0)
              .to(headlineWrap, { y: 0, duration: 0.55 }, 0)
              .to(
                headlineLines,
                {
                  opacity: 0,
                  y: 14,
                  duration: 0.35,
                  stagger: 0.05,
                },
                0,
              )
              .to(headlineScattered, { opacity: 0, duration: 0.25 }, 0.12)
              .set(headlineScattered, { pointerEvents: "none" }, 0.35)
              .to(headlineCompact, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.18)
              .to(arrow, { scale: 1, rotation: 0, duration: 0.45 }, 0),
          );
        };

        if (canHover) {
          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);
          card._svcHoverCleanup = () => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
          };
        }

        if (index % 2 === 1) {
          enterTl.timeScale(1.05);
        }
      });

      const sideLabel = section.querySelector("[data-svc-side-label-text]");
      if (sideLabel) {
        gsap.from(sideLabel, {
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const refreshFooterScroll = () => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      };

      let refreshTimer = null;
      const scheduleRefresh = () => {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(refreshFooterScroll, 200);
      };

      scheduleRefresh();
      window.addEventListener("load", scheduleRefresh, { once: true });

      gsap.utils.toArray("[data-svc-image]", section).forEach((img) => {
        if (img.complete) return;
        img.addEventListener("load", scheduleRefresh, { once: true });
      });

      return () => {
        window.clearTimeout(refreshTimer);
      };
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
      className="relative overflow-x-clip bg-[#F5F5F5] px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-12 lg:py-20 lg:pb-36"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[min(100%,1320px)] items-start gap-4 overflow-x-clip md:gap-8 lg:gap-12">
        <div
          data-svc-side-label
          className="sticky top-24 hidden h-[621px] w-[94px] shrink-0 items-center justify-center self-start overflow-visible lg:flex"
        >
          <span
            data-svc-side-label-text
            className="inline-block"
            style={{
              ...sideLabelStyle,
              transform: "rotate(-90deg)",
              transformOrigin: "center center",
            }}
          >
            Our Services
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 md:flex-row md:flex-wrap md:content-start md:gap-x-8 md:gap-y-4">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              href={getServiceHref(service.slug)}
              data-svc-card
              className={`group relative block w-full overflow-hidden rounded-none bg-[#1D1D1B] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] will-change-transform max-lg:aspect-[69/73] md:w-[calc(50%-1rem)] lg:h-[621px] ${
                index % 2 === 1 ? "md:mt-12 lg:mt-12" : ""
              }`}
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

              <div className="relative z-10 flex h-full flex-col p-5 sm:p-6 md:p-7 lg:p-8">
                <div className="relative z-20 flex shrink-0 items-start justify-between gap-3">
                  <span
                    data-svc-meta
                    className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] sm:text-[11px] sm:tracking-[0.18em] md:text-[12px]"
                    style={{ fontFamily: '"Sequel Sans", sans-serif' }}
                  >
                    No. {service.number}
                  </span>
                  <span
                    data-svc-meta
                    className="max-w-[58%] text-right text-[9px] font-medium uppercase leading-tight tracking-[0.12em] text-white/80 [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] sm:max-w-none sm:text-[10px] sm:tracking-[0.14em] md:text-[11px]"
                    style={{ fontFamily: '"Sequel Sans", sans-serif' }}
                  >
                    {service.category}
                  </span>
                </div>

                <div className="min-h-[38%] shrink-0 sm:min-h-[42%]" aria-hidden />

                <div className="relative mt-auto min-h-[88px] sm:min-h-[96px] lg:min-h-[112px]">
                  <div className="absolute bottom-0 left-0 max-w-[calc(100%-3.5rem)] select-none sm:max-w-[calc(100%-4rem)]">
                    <CardHeadline words={service.headline.split(/\s+/)} />
                  </div>

                  <span
                    data-svc-arrow
                    className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm will-change-transform sm:h-11 sm:w-11 md:h-12 md:w-12"
                  >
                    <i className="ri-arrow-right-up-line text-[16px] text-white sm:text-[18px] md:text-[20px]" aria-hidden />
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
