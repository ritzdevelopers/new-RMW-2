"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { League_Spartan, Montserrat } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

// Update carousel image paths here
const hustleCarouselImages = [
  "/Deliver/firstimage.jpeg",
  "/Deliver/fourthimage.jpeg",
  "/Deliver/secondimage.jpeg",
  "/Deliver/thirdimage.jpeg",
  "/Deliver/firstimage.jpeg",
  "/Deliver/fourthimage.jpeg",
  "/Deliver/secondimage.jpeg",
  "/Deliver/thirdimage.jpeg",
  "/Deliver/firstimage.jpeg",
  "/Deliver/fourthimage.jpeg",
];

const getHustleImageConfig = (index) => {
  if (index % 4 === 2) {
    return { fixed: true, width: 320, height: 433 };
  }
  if (index % 4 === 3) {
    return { width: 750, height: 710, fixedWidth: 480, heightReduce: 50, opacity: 0.6 };
  }
  return { width: 750, height: 710, fixedWidth: 480, heightReduce: 50 };
};

const hustleImages = hustleCarouselImages.map((src, index) => ({
  type: "image",
  src,
  ...getHustleImageConfig(index),
  grayscale: index === 9,
}));

const carouselItems = [
  hustleImages[0],
  { type: "news" },
  ...hustleImages.slice(1),
];

const CAROUSEL_HEIGHT = 433;

const getImageSize = (item) => {
  if (item.fixed) {
    return { width: item.width, height: item.height };
  }
  if (item.fixedWidth) {
    return {
      width: item.fixedWidth,
      height: CAROUSEL_HEIGHT - (item.heightReduce ?? 0),
    };
  }
  const height = CAROUSEL_HEIGHT - (item.heightReduce ?? 0);
  return { width: Math.round(height * (item.width / item.height)), height };
};

const Section6 = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const headlineWrapRef = useRef(null);
  const headlineRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesReady, setImagesReady] = useState(0);
  const loadedImageIndexesRef = useRef(new Set());

  const handleImageLoad = (index) => {
    if (loadedImageIndexesRef.current.has(index)) return;
    loadedImageIndexesRef.current.add(index);
    setImagesReady((count) => count + 1);
  };

  useEffect(() => {
    const imgs = trackRef.current?.querySelectorAll("img");
    if (!imgs?.length) return;

    const alreadyLoaded = Array.from(imgs).filter((img) => img.complete).length;
    if (alreadyLoaded > 0) {
      setImagesReady((count) => Math.max(count, alreadyLoaded));
    }
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const headline = headlineRef.current;
    const headlineWrap = headlineWrapRef.current;
    const track = trackRef.current;
    if (!section || !pin || !headline || !headlineWrap || !track) return;

    const getHeadlineOverflow = () =>
      Math.max(0, headline.scrollWidth - headlineWrap.clientWidth);
    const getTrackOverflow = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const ctx = gsap.context(() => {
      const buildTimeline = () => {
        const headlineOverflow = getHeadlineOverflow();
        const trackOverflow = getTrackOverflow();
        const scrollDistance = Math.max(headlineOverflow, trackOverflow);

        gsap.set(headline, { x: 0, y: 0 });
        gsap.set(track, { x: 0, y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "section6-carousel",
            trigger: section,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            pin: pin,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setActiveIndex(
                Math.round(self.progress * Math.max(carouselItems.length - 1, 1)),
              );
            },
          },
        });

        if (scrollDistance > 0) {
          if (headlineOverflow > 0) {
            tl.to(headline, { x: -headlineOverflow, ease: "none", duration: 1 }, 0);
          }
          if (trackOverflow > 0) {
            tl.to(track, { x: -trackOverflow, ease: "none", duration: 1 }, 0);
          }
        }
      };

      buildTimeline();

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }, section);

    return () => ctx.revert();
  }, [imagesReady]);

  const scrollToIndex = (index) => {
    const st = ScrollTrigger.getById("section6-carousel");
    const track = trackRef.current;
    if (!st || !track) return;

    const overflow = Math.max(0, track.scrollWidth - window.innerWidth);
    const scrollProgress = index / Math.max(carouselItems.length - 1, 1);
    const scrollPos = st.start + (st.end - st.start) * scrollProgress;

    window.scrollTo({ top: scrollPos, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <section ref={sectionRef} className="relative z-10 bg-white">
      <div
        ref={pinRef}
        className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white pb-12 pt-20 md:pb-16 md:pt-10"
      >
        <div className="relative z-10 shrink-0">
          <div className="mx-auto w-full max-w-8xl px-8 md:px-12">
            <div
              ref={headlineWrapRef}
              className="overflow-x-hidden overflow-y-visible"
            >
              <h2
                ref={headlineRef}
                className={`${leagueSpartan.className} m-0 inline-flex w-max flex-nowrap items-baseline gap-x-[50px] py-1 uppercase leading-[1.05] tracking-[0] will-change-transform text-[80px] md:text-[120px] lg:text-[180px]`}
              >
              {"CONNECT".split("").map((letter, index) => (
                <span key={`connect-${index}`} className="text-[#000000]">
                  {letter}
                </span>
              ))}
              <span className="text-[#33333366]">&amp;</span>
              {"CREATE".split("").map((letter, index) => (
                <span key={`create-${index}`} className="text-[#33333366]">
                  {letter}
                </span>
              ))}
            </h2>
            </div>
          </div>

          <p
            className={`${montserrat.className} m-0 mx-auto mt-6 max-w-[800px] px-8 text-center text-[20px] font-medium leading-[100%] tracking-[0] text-[#333333] md:mt-0 md:px-12 md:text-[28px] lg:text-[36px]`}
          >
            Where ideas, culture, and creativity come to life. 
          </p>
        </div>

        <div className="relative z-30 mt-8 w-full xl:mt-10">
          <div className="h-[433px] w-full overflow-hidden">
            <div
              ref={trackRef}
              className="flex h-full w-max flex-nowrap items-center gap-5 px-8 will-change-transform md:px-12"
            >
              {carouselItems.map((item, index) => {
                if (item.type === "news") {
                  return (
                    <div
                      key="news"
                      data-carousel-item
                      className="relative z-10 flex shrink-0 flex-col items-center justify-center gap-8 overflow-hidden rounded-[16px] bg-[#0D1334] p-8"
                      style={{ width: 320, height: 320 }}
                    >
                      <p
                        className={`${leagueSpartan.className} m-0 text-center text-[28px] font-semibold uppercase leading-[100%] tracking-[0] text-white md:text-[36px]`}
                      >
                        News
                        <br />
                        &amp; Views
                      </p>

                      <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${montserrat.className} group relative inline-flex w-fit cursor-pointer overflow-hidden border border-white bg-transparent px-5 py-3`}
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100"
                        />
                        <span className="relative z-10 flex items-center gap-2 text-[14px] font-medium uppercase leading-[100%] tracking-[0] text-white transition-colors duration-300">
                          Linkedin
                          <i className="ri-arrow-right-up-line text-[16px] leading-none" aria-hidden />
                        </span>
                      </a>
                    </div>
                  );
                }

                const { width: itemWidth, height: itemHeight } = getImageSize(item);

                return (
                  <div
                    key={`carousel-image-${index}`}
                    data-carousel-item
                    className="relative z-10 shrink-0 overflow-hidden"
                    style={{ height: itemHeight, width: itemWidth }}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      onLoad={() => handleImageLoad(index)}
                      onLoadingComplete={() => handleImageLoad(index)}
                      className={`object-cover ${item.grayscale ? "grayscale" : ""}`}
                      style={item.opacity != null ? { opacity: item.opacity } : undefined}
                      sizes={`${itemWidth}px`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2 px-8 md:px-12">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "w-8 bg-[#333333]" : "w-2 bg-[#D9D9D9]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section6;
