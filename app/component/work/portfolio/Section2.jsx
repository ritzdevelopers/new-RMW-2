"use client";

import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ServiceDetailMediaButton from "../../services/ServiceDetailMediaButton";

const SERVICES = [
  {
    src: "/portfolio/logo-design.png",
    alt: "Brand Identity ",
    label: "Brand Identity ",
    href: "/portfolio/brand-identity",
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
    label: "Brand Films",
    href: "/portfolio/brand-films",
  },
  {
    src: "/portfolio/website-design.png",
    alt: "Walk-Through Videos",
    label: "Walk-Through",
    href: "/portfolio/walk-through-videos",
  },
  {
    src: "/portfolio/website-design.png",
    alt: "Influencer Marketing Videos",
    label: "Influencer Marketing",
    href: "/portfolio/influencer-marketing-videos",
  },
];

const GAP_PX = 24;
const SPEED = 40; // px per second — continuous RTL marquee

const getVisibleCount = (width) => {
  if (width < 640) return 1;
  if (width < 900) return 2;
  if (width < 1200) return 3;
  if (width < 1600) return 4;
  return 5;
};

const Section2 = () => {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const loopWidthRef = useRef(0);
  const isHoveringRef = useRef(false);

  const [cardWidth, setCardWidth] = useState(0);

  const visibleServices = useMemo(() => {
    const path = (pathname || "").replace(/\/$/, "") || "/";
    if (path === "/portfolio") return SERVICES;
    return SERVICES.filter((service) => service.href !== path);
  }, [pathname]);

  const loopSlides = useMemo(
    () => [...visibleServices, ...visibleServices],
    [visibleServices]
  );

  const syncMetrics = useCallback(() => {
    const width = containerRef.current?.clientWidth || 0;
    const visibleCount = getVisibleCount(window.innerWidth);
    const nextWidth =
      visibleCount > 0
        ? Math.floor((width - GAP_PX * (visibleCount - 1)) / visibleCount)
        : Math.floor(width);
    setCardWidth(nextWidth);
    return nextWidth;
  }, []);

  const startMarquee = useCallback(() => {
    const track = trackRef.current;
    const loopWidth = loopWidthRef.current;
    if (!track || loopWidth <= 0 || isHoveringRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      gsap.set(track, { x: 0 });
      return;
    }

    tweenRef.current?.kill();

    const wrap = gsap.utils.wrap(-loopWidth, 0);
    const currentX = Number(gsap.getProperty(track, "x")) || 0;
    gsap.set(track, { x: wrap(currentX) });

    tweenRef.current = gsap.to(track, {
      x: `-=${loopWidth}`,
      duration: loopWidth / SPEED,
      ease: "none",
      repeat: -1,
      force3D: true,
      modifiers: {
        x: (v) => `${wrap(parseFloat(v))}px`,
      },
    });
  }, []);

  useLayoutEffect(() => {
    syncMetrics();
    const onResize = () => syncMetrics();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [syncMetrics]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || cardWidth <= 0 || visibleServices.length === 0) return;

    const loopWidth = visibleServices.length * (cardWidth + GAP_PX);
    loopWidthRef.current = loopWidth;

    gsap.set(track, { x: 0, force3D: true });
    startMarquee();

    return () => {
      tweenRef.current?.kill();
    };
  }, [cardWidth, visibleServices.length, startMarquee]);

  const pauseMarquee = () => {
    isHoveringRef.current = true;
    tweenRef.current?.pause();
  };

  const resumeMarquee = () => {
    isHoveringRef.current = false;
    if (tweenRef.current?.paused()) tweenRef.current.resume();
    else startMarquee();
  };

  return (
    <section className="w-full bg-[#FAFAFA] py-[72px] max-xl:py-[60px] max-md:py-[48px] max-sm:py-[40px]">
      <div className="mx-auto flex w-full max-w-[1560px] flex-col items-center gap-[48px] px-6 max-md:gap-[32px] max-md:px-4 max-sm:gap-[28px]">
        <h2
          className="m-0 text-center text-[42px] font-[600] uppercase leading-[1.2] tracking-[-0.01em] text-black max-xl:text-[28px] max-lg:text-[26px] max-md:text-[24px] max-sm:text-[22px]"
          style={{ fontFamily: "League Spartan, sans-serif" }}
        >
          Explore our latest work
        </h2>

        <div
          ref={containerRef}
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={pauseMarquee}
          onMouseLeave={resumeMarquee}
        >
          <div
            ref={trackRef}
            className="flex w-max will-change-transform [backface-visibility:hidden]"
            style={{ gap: `${GAP_PX}px` }}
          >
            {loopSlides.map((service, index) => (
              <article
                key={`${service.label}-${index}`}
                className="flex shrink-0 flex-col bg-white p-[10px] pb-[18px]  [backface-visibility:hidden] [transform:translateZ(0)] max-md:p-[12px] max-md:pb-[16px]"
                style={{ width: cardWidth || "100%" }}
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[#f3f3f3]">
                  <Image
                    src={service.src}
                    alt={service.alt}
                    fill
                    className="pointer-events-none object-cover object-center select-none"
                    sizes="(min-width: 1600px) 20vw, (min-width: 1200px) 25vw, (min-width: 900px) 33vw, (min-width: 640px) 50vw, 100vw"
                    draggable={false}
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
      </div>
    </section>
  );
};

export default Section2;
