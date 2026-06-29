"use client";

import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const eyebrowStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "20.7px",
  letterSpacing: "0px",
  color: "#FFFFFF",
};

const headingStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  letterSpacing: "0px",
  color: "#FFFFFF",
};

const Section3 = () => {
  return (
    <div className={`${montserrat.className} bg-[#F1F1F1] pb-[35px] md:pb-[70px]`}>

    <section className={`${montserrat.className} bg-[#0B0E23] py-8 sm:h-[300px] sm:overflow-hidden sm:py-0`}>
      <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col items-center justify-center gap-3 px-6 sm:flex-row sm:items-center sm:gap-8 sm:px-10 md:gap-12 md:px-[50px] lg:gap-16 xl:gap-20">
        <div className="flex w-full shrink-0 items-center justify-center sm:h-full sm:w-[36%] lg:w-[40%]">
          <img
            src="/blog/zoom.png"
            alt=""
            className="block h-auto max-h-[140px] w-auto max-w-full object-contain object-center sm:max-h-[200px]"
          />
        </div>

        <div className="flex w-full min-w-0 flex-col items-center justify-center text-center sm:flex-1 sm:items-start sm:text-left">
          <p className="m-0 uppercase" style={eyebrowStyle}>
            Subscribe our newsletter
          </p>

          <h2
            className="m-0 mt-1 line-clamp-2 text-[18px] leading-[22px] sm:mt-2 sm:text-[30px] sm:leading-[36px] md:text-[40px] md:leading-[46px]"
            style={headingStyle}
          >
            Get stories in your inbox twice a month.
          </h2>

          <form
            className="mt-3 mx-auto flex w-full max-w-[400px] items-center justify-center overflow-hidden rounded-sm bg-white p-1 sm:mt-5 sm:mx-0 sm:p-0.5"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              aria-label="Your email address"
              className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-[13px] font-normal leading-none text-[#000000] outline-none placeholder:text-[#919191] sm:px-4 sm:py-2.5 sm:text-[14px]"
            />
            <button
              type="submit"
              className="shrink-0 cursor-pointer rounded-sm border-0 bg-[#0B0E23] px-4 py-2 text-[13px] font-normal leading-none text-white transition-opacity duration-300 hover:opacity-90 sm:px-5 sm:py-2.5 sm:text-[14px]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Section3;
