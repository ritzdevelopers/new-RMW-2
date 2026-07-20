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

const newsHeadingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  fontSize: "48px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
};

const carouselItems = [
  {
    type: "image",
    src: "/Deliver/firstimage.jpeg",
    width: 750,
    height: 710,
    fixedWidth: 480,
    heightReduce: 50,
  },
  { type: "news", href: "https://www.linkedin.com", label: "Linkedin" },
  {
    type: "image",
    src: "/Deliver/secondimage.jpeg",
    fixed: true,
    width: 320,
    height: 433,
  },

  {
    type: "image",
    src: "/Deliver/thirdimage.jpeg",
    width: 750,
    height: 710,
    fixedWidth: 480,
    heightReduce: 50,
  },
  { type: "news", href: "https://www.instagram.com", label: "Instagram", subtitle: "the creative side" },
  {
    type: "image",
    src: "/Deliver/fourthimage.jpeg",
    fixed: true,
    width: 320,
    height: 433,
  },
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

const Letter = ({ children, from, className = "" }) => (
  <span className={`inline-block shrink-0 overflow-hidden align-bottom ${className}`}>
    <span data-letter-reveal={from} className="inline-block">
      {children}
    </span>
  </span>
);

const ConnectLetters = () => (
  <>
    {"CONNECT".split("").map((letter, index) => (
      <Letter key={`connect-${index}`} from="left" className="text-[#000000]">
        {letter}
      </Letter>
    ))}
  </>
);

const CreateLetters = () => (
  <>
    <Letter from="left" className="text-[#33333366]">
      &amp;
    </Letter>
    {"CREATE".split("").map((letter, index) => (
      <Letter key={`create-${index}`} from="right" className="text-[#33333366]">
        {letter}
      </Letter>
    ))}
  </>
);

const NewsCard = ({
  item,
  onMouseEnter,
  onMouseLeave,
  className = "",
  style,
  compact = false,
  ...props
}) => (
  <div
    data-carousel-item
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    {...props}
    className={`group relative z-10 flex shrink-0 cursor-pointer flex-col overflow-hidden border border-[#0D1334] ${
      compact
        ? "items-center justify-center gap-3 rounded-[12px] p-4 text-center"
        : "items-start justify-center gap-8 rounded-[16px] p-8"
    } ${className}`}
    style={style}
  >
    <span
      aria-hidden
      className="absolute inset-0 origin-bottom scale-y-0 bg-[#0D1334] transition-transform duration-300 ease-out group-hover:scale-y-100"
    />
    <p
      className={`${leagueSpartan.className} relative z-10 m-0 text-[#0D1334] transition-colors duration-300 group-hover:text-white ${
        compact ? "text-center text-[20px] leading-[100%]" : "text-left"
      }`}
      style={compact ? undefined : newsHeadingStyle}
    >
      {compact && item.subtitle ? (
        <>
          {item.subtitle.split(" ").slice(0, -1).join(" ")}
          <br />
          {item.subtitle.split(" ").slice(-1)}
        </>
      ) : item.subtitle ? (
        item.subtitle
      ) : (
        <>
          News &amp;
          <br />
          Views
        </>
      )}
    </p>

    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative z-10 inline-flex cursor-pointer items-center rounded-full bg-white shadow-[0_6px_24px_rgba(0,0,0,0.22)] ${
        compact
          ? "gap-1.5 py-0.5 pl-3 pr-1"
          : "gap-2 py-1 pl-5 pr-2 md:gap-2.5 md:py-1 md:pl-6 md:pr-2"
      }`}
    >
      <span
        className={`font-league-spartan font-medium uppercase tracking-[0.08em] text-[#1D1D1B] ${
          compact ? "text-[9px]" : "text-[12px] md:text-[14px]"
        }`}
      >
        {item.label}
      </span>
      <span
        className={`flex items-center justify-center rounded-full bg-[#1D1D1B] text-white ${
          compact ? "h-5 w-5" : "h-8 w-8 md:h-9 md:w-9"
        }`}
      >
        <i
          className={`ri-arrow-right-up-line ${compact ? "text-[10px]" : "text-[14px] md:text-[16px]"}`}
          aria-hidden
        />
      </span>
    </a>
  </div>
);

const CarouselImage = ({
  item,
  index,
  onLoad,
  isRevealed,
  className = "",
  style,
  ...props
}) => {
  const { width: itemWidth, height: itemHeight } = getImageSize(item);

  return (
    <div
      data-carousel-item
      {...props}
      className={`relative z-10 shrink-0 overflow-hidden ${className}`}
      style={{ height: itemHeight, width: itemWidth, ...style }}
    >
     <Image
  src={item.src}
  alt=""
  width={itemWidth}
  height={itemHeight}
  onLoad={() => onLoad(index)}
  onLoadingComplete={() => onLoad(index)}
  className={`h-auto w-full transition-all duration-300 md:object-cover object-contain ${
    isRevealed ? "opacity-100 grayscale-0" : "opacity-60 grayscale"
  }`}
/>
    </div>
  );
};

const mobileBlocks = [
  { type: "headline-connect" },
  { type: "row", indices: [0, 1] },
  { type: "headline-create" },
  { type: "row", indices: [4, 3] },
];

const MOBILE_ROW_ITEM_WIDTH = 148;
const MOBILE_SCROLL_DISTANCE = 15;

const Section6 = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const mobileContentRef = useRef(null);
  const headlineWrapRef = useRef(null);
  const headlineRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredNewsIndex, setHoveredNewsIndex] = useState(null);
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
    if (!section) return;

    const ctx = gsap.context(() => {
      const leftLetters = gsap.utils.toArray("[data-letter-reveal='left']", section);
      const rightLetters = gsap.utils.toArray("[data-letter-reveal='right']", section);

      gsap.set(leftLetters, { x: "105%" });
      gsap.set(rightLetters, { x: "-105%" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
        })
        .to(leftLetters, { x: "0%", duration: 0.55, ease: "power4.out", stagger: 0.06 }, 0)
        .to(rightLetters, { x: "0%", duration: 0.55, ease: "power4.out", stagger: 0.06 }, 0);

      if (section.getBoundingClientRect().top < window.innerHeight * 0.85) {
        gsap.set(leftLetters, { x: "0%" });
        gsap.set(rightLetters, { x: "0%" });
      }
    }, section);

    return () => ctx.revert();
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
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
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
      });
    }, section);

    return () => ctx.revert();
  }, [imagesReady]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mobileContent = mobileContentRef.current;
    if (!section || !mobileContent) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        const enterItems = gsap.utils.toArray("[data-mobile-scroll-enter]", mobileContent);
        const exitItems = gsap.utils.toArray("[data-mobile-scroll-exit]", mobileContent);
        if (!enterItems.length && !exitItems.length) return;

        const distance = MOBILE_SCROLL_DISTANCE;

        if (enterItems.length) gsap.set(enterItems, { y: distance, force3D: true });
        if (exitItems.length) gsap.set(exitItems, { y: 0, force3D: true });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mobileContent,
            start: "top bottom",
            end: "bottom top",
            scrub: 2.5,
            invalidateOnRefresh: true,
          },
        });

        if (enterItems.length) {
          tl.to(enterItems, { y: 0, ease: "none", force3D: true, duration: 0.45 }, 0);
        }

        if (exitItems.length) {
          tl.to(exitItems, { y: distance, ease: "none", force3D: true, duration: 0.55 }, 0.45);
        }

        ScrollTrigger.refresh();
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const isImageRevealed = (imageIndex) => {
    if (hoveredNewsIndex == null) return false;
    return imageIndex === hoveredNewsIndex - 1 || imageIndex === hoveredNewsIndex + 1;
  };

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

  const renderMobileCarouselItem = (index) => {
    const item = carouselItems[index];
    const isEnterItem = index === 0 || index === 4;
    const isExitItem = index === 1 || index === 3;
    const shouldWrap = isEnterItem || isExitItem;

    const content =
      item.type === "news" ? (
        <NewsCard
          item={item}
          compact
          className="h-full min-w-0 w-full self-stretch"
          style={{ width: MOBILE_ROW_ITEM_WIDTH }}
        />
      ) : (
        <CarouselImage
          item={item}
          index={index}
          onLoad={handleImageLoad}
          isRevealed={false}
          className="w-full self-stretch rounded-[10px]"
          style={{ width: MOBILE_ROW_ITEM_WIDTH, height: "auto" }}
        />
      );

    if (!shouldWrap) {
      return (
        <div key={`mobile-item-${index}`} className="flex min-w-0 flex-1 justify-center self-stretch">
          {content}
        </div>
      );
    }

    return (
      <div
        key={`mobile-item-${index}`}
        {...(isEnterItem ? { "data-mobile-scroll-enter": "" } : {})}
        {...(isExitItem ? { "data-mobile-scroll-exit": "" } : {})}
        className="flex min-w-0 flex-1 justify-center self-stretch will-change-transform"
      >
        {content}
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="relative z-10 bg-white">
      <div
        ref={pinRef}
        className="relative flex w-full flex-col overflow-x-hidden bg-white pb-12 pt-10 md:min-h-screen md:pb-16 md:pt-10"
      >
        {/* Mobile layout */}
        <div
          ref={mobileContentRef}
          className="relative z-10 flex flex-col items-center gap-6 px-5 md:hidden"
        >
          {mobileBlocks.map((block, blockIndex) => {
            if (block.type === "headline-connect") {
              return (
                <div key={`mobile-connect-${blockIndex}`} className="flex w-full justify-center overflow-x-hidden">
                  <h2
                    className={`${leagueSpartan.className} m-0 inline-flex w-max flex-nowrap items-baseline uppercase leading-[1.05] tracking-[0] text-[54px] text-[#000000]`}
                  >
                    <ConnectLetters />
                  </h2>
                </div>
              );
            }

            if (block.type === "headline-create") {
              return (
                <div key={`mobile-create-${blockIndex}`} className="flex w-full justify-center overflow-x-hidden">
                  <h2
                    className={`${leagueSpartan.className} m-0 inline-flex w-max flex-nowrap items-baseline uppercase leading-[1.05] tracking-[0] text-[54px]`}
                  >
                    <CreateLetters />
                  </h2>
                </div>
              );
            }

            if (block.type === "row") {
              return (
                <div
                  key={`mobile-row-${blockIndex}`}
                  data-mobile-row
                  className="flex w-full items-stretch justify-center gap-3"
                >
                  {block.indices.map((index) => renderMobileCarouselItem(index))}
                </div>
              );
            }

            return null;
          })}

          <p
            className={`${montserrat.className} m-0 text-center text-[16px] font-medium leading-[120%] tracking-[0] text-[#333333]`}
          >
            Where ideas, culture, and creativity come to life.
          </p>
        </div>

        {/* Desktop layout */}
        <div className="relative z-10 hidden shrink-0 md:block">
          <div className="mx-auto w-full max-w-8xl px-8 md:px-12">
            <div
              ref={headlineWrapRef}
              className="overflow-x-hidden overflow-y-visible"
            >
              <h2
                ref={headlineRef}
                className={`${leagueSpartan.className} m-0 inline-flex w-max flex-nowrap items-baseline gap-x-[50px] py-1 uppercase leading-[1.05] tracking-[0] will-change-transform text-[80px] md:text-[120px] lg:text-[180px]`}
              >
                <ConnectLetters />
                <CreateLetters />
              </h2>
            </div>
          </div>

          <p
            className={`${montserrat.className} m-0 mx-auto mt-6 max-w-[800px] px-8 text-center text-[20px] font-medium leading-[100%] tracking-[0] text-[#333333] md:mt-0 md:px-12 md:text-[28px] lg:text-[36px]`}
          >
            Where ideas, culture, and creativity come to life.
          </p>
        </div>

        <div className="relative z-30 mt-8 hidden w-full xl:mt-0 md:block">
          <div className="h-[433px] w-full overflow-hidden">
            <div
              ref={trackRef}
              className="flex h-full w-max flex-nowrap items-center gap-5 px-8 will-change-transform md:px-12"
            >
              {carouselItems.map((item, index) => {
                if (item.type === "news") {
                  return (
                    <NewsCard
                      key={`news-${index}`}
                      item={item}
                      onMouseEnter={() => setHoveredNewsIndex(index)}
                      onMouseLeave={() => setHoveredNewsIndex(null)}
                      style={{ width: 320, height: 320 }}
                    />
                  );
                }

                return (
                  <CarouselImage
                    key={`carousel-image-${index}`}
                    item={item}
                    index={index}
                    onLoad={handleImageLoad}
                    isRevealed={isImageRevealed(index)}
                  />
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
