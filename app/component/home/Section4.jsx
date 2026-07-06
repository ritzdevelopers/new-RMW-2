"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const numberStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  fontSize: "clamp(24px, 3vw, 36px)",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
};

const titleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
};

const SLIDER_IMAGE = "/home/slider-image-1.png";
const HOVER_IMAGE = "/home/digital-hover.jpg";
const IMAGE_CLIP_WIDTH = "min(300px, 26vw)";
const IMAGE_CLIP_INSET = `calc(50% - min(150px, 13vw))`;
const ROW_CLIP_MASK = `linear-gradient(to right, #000 0, #000 calc(50% - min(150px, 13vw)), transparent calc(50% - min(150px, 13vw)), transparent calc(50% + min(150px, 13vw)), #000 calc(50% + min(150px, 13vw)), #000 100%)`;
const imageOverlayTextStyle = {
  color: "transparent",
  WebkitTextStroke: "0.5px gray",
  backgroundSize: `${IMAGE_CLIP_WIDTH} auto`,
  backgroundPosition: "center center",
  backgroundAttachment: "fixed",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
};

const linkRowClass =
  "inline-flex items-baseline justify-center gap-4 md:gap-6 lg:gap-10";

const services = [
  { number: "01", title: "GULSHAN", slug: "gulshan", image: SLIDER_IMAGE },
  { number: "02", title: "VEDVAN", slug: "vedvan", image: HOVER_IMAGE },
  { number: "03", title: "EXOTICA", slug: "exotica", image: SLIDER_IMAGE },
  { number: "04", title: "SPLENDOR ONYX", slug: "splendor-onyx", image: HOVER_IMAGE },
  { number: "05", title: "LUMORA", slug: "lumora", image: SLIDER_IMAGE },
  { number: "06", title: "SANSKAR", slug: "sanskar", image: HOVER_IMAGE },
  { number: "07", title: "VVIP MADHUBAN", slug: "vvip-madhuban", image: SLIDER_IMAGE },
  { number: "08", title: "GHD", slug: "ghd", image: HOVER_IMAGE },
  { number: "09", title: "MANSHA GROUP", slug: "mansha-group", image: SLIDER_IMAGE },
  { number: "10", title: "EON FAIRFOX", slug: "eon-fairfox", image: HOVER_IMAGE },
];

const Section4 = () => {
  const [activeSlug, setActiveSlug] = useState(services[0].slug);
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);

  const activeService =
    services.find((service) => service.slug === activeSlug) ?? services[0];

  useLayoutEffect(() => {
    let frame = 0;

    const updateActive = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestSlug = services[0].slug;
      let closestDistance = Infinity;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSlug = services[index].slug;
        }
      });

      setActiveSlug((current) => (current === closestSlug ? current : closestSlug));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const section = sectionRef.current;
    const pin = pinRef.current;
    const list = listRef.current;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (!section || !pin || !list) return;

      const getTravel = () => {
        const items = itemRefs.current.filter(Boolean);
        if (items.length < 2) return 0;

        const first = items[0];
        const last = items[items.length - 1];
        const firstCenter = first.offsetTop + first.offsetHeight / 2;
        const lastCenter = last.offsetTop + last.offsetHeight / 2;

        return lastCenter - firstCenter;
      };

      const getStartY = () => {
        const first = itemRefs.current[0];
        if (!first) return 0;

        return pin.offsetHeight / 2 - (first.offsetTop + first.offsetHeight / 2);
      };

      const applyStartY = () => {
        gsap.set(list, { y: getStartY() });
      };

      applyStartY();

      const tween = gsap.to(list, {
        y: () => getStartY() - getTravel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(getTravel(), window.innerHeight)}`,
          scrub: true,
          pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: applyStartY,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(list, { clearProps: "transform" });
      };
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-8 py-[35px] md:px-12 md:py-[0px]"
    >
      <style>{`
        @media (min-width: 768px) {
          .section4-row-link-active {
            -webkit-mask-image: ${ROW_CLIP_MASK};
            mask-image: ${ROW_CLIP_MASK};
          }
        }
      `}</style>
      <div
        ref={pinRef}
        className="relative isolate mx-auto flex w-full max-w-8xl flex-col items-center overflow-hidden md:h-[100dvh]"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <img
            key={activeService.slug}
            src={activeService.image}
            alt=""
            className="block h-auto w-[min(300px,26vw)] object-contain shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
          />
        </div>

        <ul
          ref={listRef}
          className="relative z-[30] m-0 flex w-full list-none flex-col items-center gap-2 p-0 md:gap-2 lg:gap-2"
        >
          {services.map((service, index) => {
            const isActive = activeSlug === service.slug;

            return (
              <li
                key={service.slug}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                className="relative w-full text-center"
              >
                <div className={`relative ${linkRowClass}`}>
                  <Link
                    href={`/services/${service.slug}`}
                    className={`relative z-10 ${linkRowClass}${
                      isActive ? " section4-row-link-active" : ""
                    }`}
                  >
                    <span
                      className="shrink-0 transition-colors duration-300"
                      style={{
                        ...numberStyle,
                        color: isActive ? "#000000" : "#00000033",
                      }}
                    >
                      {service.number}
                    </span>
                    <span
                      className="text-[30px] transition-colors duration-300 md:text-[50px] lg:text-[60px] xl:text-[96px]"
                      style={{
                        ...titleStyle,
                        color: isActive ? "#000000" : "#00000033",
                      }}
                    >
                      {service.title}
                    </span>
                  </Link>

                  {isActive ? (
                    <div
                      className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-center md:flex"
                      style={{
                        clipPath: `inset(0 ${IMAGE_CLIP_INSET} 0 ${IMAGE_CLIP_INSET})`,
                        WebkitClipPath: `inset(0 ${IMAGE_CLIP_INSET} 0 ${IMAGE_CLIP_INSET})`,
                      }}
                    >
                      <span className={linkRowClass}>
                        <span
                          className="shrink-0"
                          style={{
                            ...numberStyle,
                            ...imageOverlayTextStyle,
                            backgroundImage: `url(${service.image})`,
                          }}
                        >
                          {service.number}
                        </span>
                        <span
                          className="text-[30px] md:text-[50px] lg:text-[60px] xl:text-[96px]"
                          style={{
                            ...titleStyle,
                            ...imageOverlayTextStyle,
                            backgroundImage: `url(${service.image})`,
                          }}
                        >
                          {service.title}
                        </span>
                      </span>
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Section4;
