"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const headingStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  letterSpacing: "0",
  textTransform: "capitalize",
  color: "#333333",
};

const galleryImages = [
  { src: "/gallery/gallery-1.png", width: 720, height: 1280, displayHeight: 380 },
  { src: "/gallery/gallery-2.png", width: 364, height: 370, displayHeight: 280 },
  { src: "/gallery/gallery-3.png", width: 364, height: 646, displayHeight: 480 },
  { src: "/gallery/gallery-5.png", width: 400, height: 400, displayHeight: 320 },
];

const GALLERY_TRACK_HEIGHT = 480;
const trackImages = [...galleryImages, ...galleryImages];

const Section2 = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
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
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    const getTrackOverflow = () =>
      Math.max(0, track.scrollWidth - window.innerWidth);

    const ctx = gsap.context(() => {
      const buildTimeline = () => {
        const trackOverflow = getTrackOverflow();
        const scrollDistance = trackOverflow;

        gsap.set(track, { x: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "gallery-section2-carousel",
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(scrollDistance, 1)}`,
            pin: pin,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const slideIndex = Math.round(
                self.progress * Math.max(trackImages.length - 1, 1)
              );
              setActiveIndex(slideIndex % galleryImages.length);
            },
          },
        });

        if (trackOverflow > 0) {
          tl.to(track, { x: -trackOverflow, ease: "none", duration: 1 }, 0);
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
    const st = ScrollTrigger.getById("gallery-section2-carousel");
    if (!st) return;

    const scrollProgress = index / Math.max(trackImages.length - 1, 1);
    const scrollPos = st.start + (st.end - st.start) * scrollProgress;

    window.scrollTo({ top: scrollPos, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <section ref={sectionRef} className="relative z-10 bg-white">
      <div
        ref={pinRef}
        className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white pb-12 pt-10 md:pb-16"
      >
        <div className="shrink-0">
          <div
            className={`${montserrat.className}  max-w-[1200px] px-6 md:text-left text-center md:px-10`}
          >
            <p
              style={headingStyle}
              className="m-0 text-[22px] leading-[32px] md:text-[30px] md:leading-[40px] lg:text-[28px] lg:leading-[47px] xl:text-[36px] xl:leading-[61px]"
            >
              To connect Johnnie Walker Blue Label with a new generation of luxury
              drinkers, we turned whisky cues on
            </p>
          </div>
        </div>

        <div className="relative z-30 mt-8 w-full md:mt-12">
          <div
            className="w-full overflow-hidden"
            style={{ height: GALLERY_TRACK_HEIGHT }}
          >
            <div
              ref={trackRef}
              className="flex h-full w-max flex-nowrap items-center gap-3 px-6 will-change-transform md:gap-4 md:px-10"
            >
              {trackImages.map((item, index) => {
                const displayWidth = Math.round(
                  item.displayHeight * (item.width / item.height)
                );

                return (
                  <div
                    key={`${item.src}-${index}`}
                    className="relative shrink-0 overflow-hidden"
                    style={{ width: displayWidth, height: item.displayHeight }}
                  >
                    <Image
                      src={item.src}
                      alt={`Gallery image ${(index % galleryImages.length) + 1}`}
                      fill
                      onLoad={() => handleImageLoad(index)}
                      onLoadingComplete={() => handleImageLoad(index)}
                      className="object-cover"
                      sizes={`${displayWidth}px`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2 px-6 md:px-10">
            {galleryImages.map((_, index) => (
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

export default Section2;
