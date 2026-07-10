"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import BottomRevealText from "./BottomRevealText";
const ROW_WIDTH_DURATION = 0.95;
const ROW_TO_CONTENT_GAP = 0.14;
const CONTENT_HEIGHT_DURATION = 0.85;
const ELLIPSE_ZOOM_DURATION = 0.65;
const TEXT_REVEAL_DELAY = ROW_WIDTH_DURATION + ROW_TO_CONTENT_GAP;

function measureHeight(inner) {
  return inner.offsetHeight;
}

export default function Section1Row2() {
  const rowRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const textInnerRef = useRef(null);
  const ellipseRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const row = rowRef.current;
    const imageWrap = imageWrapRef.current;
    const imageInner = imageInnerRef.current;
    const textWrap = textWrapRef.current;
    const textInner = textInnerRef.current;
    const ellipse = ellipseRef.current;

    if (!row || !imageWrap || !imageInner || !textWrap || !textInner || !ellipse) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(row, { clearProps: "all" });
      gsap.set([imageWrap, textWrap, ellipse], { clearProps: "all" });
      setIsRevealed(true);
      return;
    }

    const imageHeight = measureHeight(imageInner);
    const textHeight = measureHeight(textInner);

    gsap.set(imageWrap, { height: 0 });
    gsap.set(textWrap, { height: 0 });

    gsap.set(row, { width: 0 });
    gsap.set(ellipse, { scale: 0.72, opacity: 0, transformOrigin: "center center" });

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .to(row, {
        width: "100%",
        duration: ROW_WIDTH_DURATION,
        ease: "power3.inOut",
      })
      .to(
        imageWrap,
        {
          height: imageHeight,
          duration: CONTENT_HEIGHT_DURATION,
          ease: "power3.out",
        },
        `+=${ROW_TO_CONTENT_GAP}`
      )
      .to(
        textWrap,
        {
          height: textHeight,
          duration: CONTENT_HEIGHT_DURATION,
          ease: "power3.out",
        },
        "<"
      )
      .to(
        ellipse,
        {
          scale: 1,
          opacity: 1,
          duration: ELLIPSE_ZOOM_DURATION,
          ease: "power3.out",
        },
        "-=0.22"
      )
      .eventCallback("onComplete", () => {
        setIsRevealed(true);
      });

    return () => {
      timeline.kill();
    };
  }, []);

  useEffect(() => {
    if (!isRevealed) return;

    const row = rowRef.current;
    const imageWrap = imageWrapRef.current;
    const textWrap = textWrapRef.current;
    const ellipse = ellipseRef.current;

    if (!row || !imageWrap || !textWrap || !ellipse) return;

    gsap.set([row, imageWrap, textWrap, ellipse], { clearProps: "all" });
  }, [isRevealed]);

  const revealOuterClass = isRevealed
    ? "h-auto"
    : "relative h-0 overflow-hidden";

  const imageInnerClass = isRevealed
    ? "w-[736px] h-auto max-xl:w-[580px] max-lg:w-full max-lg:max-w-[560px] max-md:max-w-full"
    : "absolute bottom-0 left-0 w-[736px] h-auto max-xl:w-[580px] max-lg:w-full max-lg:max-w-[560px] max-md:max-w-full";

  const textInnerClass = isRevealed
    ? "flex flex-col justify-end pb-[80px] z-10 max-xl:pb-[56px] max-lg:pb-0 max-lg:items-center max-lg:text-center max-md:pb-0"
    : "absolute bottom-0 left-0 right-0 flex flex-col justify-end pb-[80px] z-10 max-xl:pb-[56px] max-lg:pb-0 max-lg:items-center max-lg:text-center max-md:pb-0";

  return (
    <div
      ref={rowRef}
      className="w-full bg-[#D2D7F8] max-h-[571px] flex justify-end items-end relative pt-[44px] pr-[60px] max-xl:max-h-[500px] max-xl:pt-[36px] max-xl:pr-[40px] max-lg:max-h-none max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:pt-[32px] max-lg:pr-[32px] max-lg:pb-[32px] max-md:pt-[24px] max-md:pr-[24px] max-md:pb-[24px] max-md:px-4 max-sm:px-3 max-sm:pt-[20px] max-sm:pb-[20px] overflow-hidden"
      style={isRevealed ? undefined : { width: 0 }}
    >
      {/* Absolute Positioned Image */}
      <div className="absolute h-full w-auto left-[50%] top-[50%] translate-x-[-38%] translate-y-[-50%] z-0 max-lg:h-[85%] max-lg:translate-x-[-50%] max-md:h-[70%] max-md:opacity-60 max-sm:h-[60%] max-sm:opacity-40">
        <div ref={ellipseRef} className="h-full w-auto">
          <img
            src="/work/portfolio/s1/elips.png"
            alt="shape"
            className="w-auto h-full"
          />
        </div>
      </div>

      <div className="flex items-end gap-[50px] z-10 max-xl:gap-[36px] max-lg:flex-col max-lg:items-center max-lg:gap-[24px] max-md:gap-[20px]">
        {/* Left Side Container For Image */}
        <div ref={imageWrapRef} className={revealOuterClass}>
          <div ref={imageInnerRef} className={imageInnerClass}>
            <img
              src="/work/portfolio/s1/skelton.png"
              alt="skelton"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Right Side Container For Text */}
        <div ref={textWrapRef} className={revealOuterClass}>
          <div ref={textInnerRef} className={textInnerClass}>
            <BottomRevealText
              as="h2"
              text="Good design is a mirror"
              lineBreakBefore="mirror"
              delay={TEXT_REVEAL_DELAY}
              duration={0.8}
              stagger={0.055}
              className="font-montserrat font-[600] text-[43px] capitalize max-xl:text-[36px] max-lg:text-[32px] max-md:text-[26px] max-sm:text-[22px]"
            />
            <BottomRevealText
              as="p"
              text="We update you at every step"
              delay={TEXT_REVEAL_DELAY + 0.12}
              duration={0.75}
              stagger={0.05}
              className="font-montserrat font-[600] text-[18px] capitalize text-[#00000099] max-md:text-[16px] max-sm:text-[14px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
