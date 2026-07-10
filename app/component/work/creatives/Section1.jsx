"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

function Section1() {
  const titleRef = useRef(null);
  const rowRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const row = rowRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!title || !row || !image || !text) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    gsap.set(title, { opacity: 0, y: 24 });
    gsap.set(row, { opacity: 0, y: 32 });
    gsap.set([image, text], { opacity: 0, y: 20 });

    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

    timeline
      .to(title, { opacity: 1, y: 0, duration: 0.6 })
      .to(row, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
      .to(image, { opacity: 1, y: 0, duration: 0.55 }, "-=0.35")
      .to(text, { opacity: 1, y: 0, duration: 0.55 }, "-=0.4");

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section className="w-full flex justify-center items-center py-[55px] max-xl:py-[44px] max-lg:py-[36px] max-md:py-[28px]">
      {/* Centered Align Container  */}
      <div className="w-full max-w-[1336px] flex flex-col gap-[55px] max-xl:gap-[40px] max-lg:gap-[32px] max-md:gap-[24px] max-xl:px-6 max-md:px-4">
        {/* Row 1  */}
        <div ref={titleRef} className="w-full">
          <h1 className="font-league-spartan font-[600] text-[56px] uppercase max-xl:text-[44px] max-lg:text-[36px] max-md:text-[28px] max-sm:text-[24px]">
            Creatives
          </h1>
        </div>
        {/* Row 2  */}
        <div
          ref={rowRef}
          className="w-full bg-gradient-to-r from-[#0D6FAA] to-[#052C44] max-h-[571px] flex justify-end items-end gap-[60px] pr-[60px] max-xl:max-h-[500px] max-xl:gap-[40px] max-xl:pr-[40px] max-lg:max-h-none max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:gap-[32px] max-lg:pt-[32px] max-lg:pr-[32px] max-lg:pb-[32px] max-md:gap-[24px] max-md:pt-[24px] max-md:pr-[24px] max-md:pb-[24px] max-md:px-4 max-sm:px-3 max-sm:pt-[20px] max-sm:pb-[20px] overflow-hidden"
        >
          {/* Left Side Container For Image  */}
          <div
            ref={imageRef}
            className="h-full w-auto max-w-[595px] max-xl:max-w-[480px] max-lg:w-full max-lg:max-w-[560px] max-md:max-w-full"
          >
            <img
              src="/work/creatives/s1/s1-img.png"
              alt="creatives"
              className="w-full h-full max-lg:h-auto"
            />
          </div>

          {/* Right Side Container For Text  */}
          <div
            ref={textRef}
            className="flex flex-col justify-end pb-[40px] max-xl:pb-[32px] max-lg:pb-0 max-lg:items-center max-lg:text-center max-md:pb-0"
          >
            <h2 className="font-[600] text-[43px] capitalize text-[#FFFFFF] max-xl:text-[36px] max-lg:text-[32px] max-md:text-[26px] max-sm:text-[22px]">
              We create visuals
            </h2>
            <p className="font-[600] text-[18px] text-[#FFFFFF99] max-md:text-[16px] max-sm:text-[14px]">
              We create art with a combination of{" "}
              <br className="max-md:hidden" /> ideas and technology
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section1;
