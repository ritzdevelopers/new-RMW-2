import React from "react";

const titleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const storyStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 500,
  lineHeight: "100%",
  letterSpacing: "0",
  color: "#FFFFFF",
};

const Section1 = () => {
  return (
    <section className="bg-[#0D1334] px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14 lg:px-12 lg:py-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 md:gap-12 lg:gap-14">
        <h1
          style={titleStyle}
          className="m-0 w-full text-center text-[30px] leading-[100%]  md:text-[50px] lg:text-[60px] xl:text-[94px]"
        >
          Memories Gallery Reliving
          <br />
          Moments
        </h1>

        <div className="relative w-full max-w-[1200px]">
          <p
            style={storyStyle}
            className="mb-4 w-full text-center text-[22px] leading-[100%] sm:text-[28px] md:absolute md:top-1/2 md:right-0 md:m-0 md:mb-0 md:-translate-y-1/2 md:text-right md:text-[30px] md:translate-x-[5%] lg:text-[42px] lg:translate-x-[0%] xl:translate-x-[10%]"
          >
            The ritzmediaworld Story
          </p>
          <div className="mx-auto aspect-[851/443] w-full max-w-[851px] rounded-[24px] bg-black md:rounded-[32px] lg:h-[443px] lg:w-[851px] lg:max-w-[851px]" />
        </div>
      </div>
    </section>
  );
};

export default Section1;
