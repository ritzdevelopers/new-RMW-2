import React from "react";

import {
  imgImage1007,
  changingGameExport,
  imgImage1005,
} from "./figmaAssets";

const Section4 = () => {
  return (
    <section
      className="relative w-full bg-[#f1f1f1]"
      data-node-id="section-4"
    >
      <div className="mx-auto flex w-full max-w-[1340px] flex-col gap-10 px-5 py-10 sm:gap-12 sm:px-8 sm:py-12 md:gap-16 md:px-10 md:py-14 lg:gap-24 lg:px-8 lg:py-14 xl:gap-[120px] xl:px-[50px] xl:py-16 min-[1265px]:gap-[160px]">
        {/* TOP ROW */}
        <div className="relative flex w-full flex-col items-center gap-8 sm:gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8 xl:gap-12">
          {/* CHANGING THE GAME — bottom on desktop, centered on mobile */}
          <div
            className="relative z-10 w-full max-w-[561px] max-[1023px]:mb-0 lg:mb-[-64px] lg:self-end xl:mb-[-80px] min-[1265px]:mb-[-96px]"
            data-node-id="1:44"
          >
            <h2 className="m-0 mx-auto w-full max-w-[456px] text-center text-[32px] font-medium uppercase leading-[1.15] text-[#333] sm:text-[40px] sm:leading-[1.15] md:text-[48px] md:leading-[1.12] lg:text-[42px] lg:leading-[1.12] xl:text-[52px] xl:leading-[1.12] min-[1265px]:text-[65px] min-[1265px]:leading-[74px]">
              Changing the Game
            </h2>

            <div className="relative mx-auto mt-5 h-[200px] w-full max-w-[561px] overflow-hidden sm:mt-6 sm:h-[260px] md:mt-7 md:h-[300px] lg:mt-8 lg:h-[280px] xl:h-[320px] min-[1265px]:h-[342px]">
              <img
                src={changingGameExport}
                alt=""
                className="h-full w-full object-cover object-[center_35%]"
              />
            </div>

            <p
              className="m-0 mx-auto mt-5 max-w-[509px] text-center text-[15px] font-normal leading-[22px] text-[#333] sm:mt-6 sm:text-[17px] sm:leading-[24px] md:mt-7 md:text-[18px] md:leading-[26px] lg:mt-8 lg:text-[17px] lg:leading-[24px] xl:text-[18px] xl:leading-[26px] min-[1265px]:text-[20px] min-[1265px]:leading-[28px]"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Today’s drinkers are more expressive, diverse – and female. Women
              now make up a third of whisky consumers, leaving the cigar
              lounges.Today’s drinkers are more expressive, diverse – and female.
              Women now make up a third of whisky consumers, leaving the cigar
              lounges.
            </p>
          </div>

          {/* FLOATING RIGHT IMAGE — top on desktop */}
          <div
            className="relative z-0 h-[420px] w-full max-w-[420px] shrink-0 overflow-hidden sm:h-[520px] sm:max-w-[480px] md:h-[600px] md:max-w-[520px] lg:h-[620px] lg:max-w-[480px] lg:self-start xl:h-[700px] xl:max-w-[540px] min-[1265px]:h-[765px] min-[1265px]:max-w-[590px]"
            data-node-id="1:41"
          >
            <div
              className="h-full w-full overflow-hidden"
              style={{
                WebkitMaskImage: `url("${imgImage1007}")`,
                maskImage: `url("${imgImage1007}")`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
            >
              <img
                src={imgImage1005}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* WHITE CARD */}
        <div
          className="relative lg:mx-auto z-0 w-full max-w-[1154px] overflow-hidden rounded-[12px] bg-white sm:rounded-[14px] lg:rounded-[16px] lg:mt-0"
          data-node-id="1:54"
        >
          <img
            src="/inner-service/s4-img.jpg"
            alt=""
            className="block h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Section4;
