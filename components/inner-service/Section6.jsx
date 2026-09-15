import React from "react";

import {
  imgImage1008,
  imgImage1009,
} from "./figmaAssets";

const Section6 = () => {
  return (
    <section
      className="relative w-full bg-[#f1f1f1]"
      data-node-id="1:48"
    >
      <div className="mx-auto flex w-full max-w-[1135px] flex-col items-center px-5 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 xl:px-6 xl:py-16">
        <h2 className="m-0 w-full text-center text-[28px] font-semibold uppercase leading-[1.2] text-[#333] sm:text-[34px] sm:leading-[1.2] md:text-[40px] md:leading-[1.18] lg:text-[44px] lg:leading-[1.15] xl:text-[48px] xl:leading-[57px]">
          To connect Johnnie Walker Blue Label with a new generation of luxury
          drinkers.
        </h2>

        <p
          className="m-0 mt-5 max-w-[986px] text-center text-[15px] font-normal leading-[22px] text-[#333] sm:mt-6 sm:text-[17px] sm:leading-[24px] md:mt-7 md:text-[18px] md:leading-[26px] lg:text-[19px] lg:leading-[27px] xl:mt-8 xl:text-[20px] xl:leading-[28px]"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Today’s drinkers are more expressive, diverse – and female. Women now
          make up a third of whisky consumers, leaving the cigar lounges.Today’s
          drinkers are more expressive, diverse – and female. Women now make up a
          third of whisky consumers, leaving the cigar lounges.
        </p>

        <div
          className="mt-6 h-[240px] w-full max-w-[916px] overflow-hidden sm:mt-8 sm:h-[320px] md:mt-9 md:h-[400px] lg:h-[460px] xl:mt-10 xl:h-[512px]"
          style={{
            WebkitMaskImage: `url("${imgImage1008}")`,
            maskImage: `url("${imgImage1008}")`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        >
          <img
            src={imgImage1009}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Section6;
