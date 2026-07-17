"use client";
import React from "react";

function Section10() {
  return (
    <section className="flex w-full items-center justify-between bg-[#F4F2F0] px-5 py-[30px] sm:px-8  md:px-10  lg:px-4 md:py-[70px]">
      <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-[400] text-[22px]  md:text-[24px] lg:text-[28px]">
          Ready to take the next step?
        </h2>
        <p className="max-w-[600px] font-[300] lg:text-[18px] md:text-[16px] leading-[1.6] lg:leading-normal">
        Let's Create Something Your Brand Will Be Known For
        Have a project in mind? Let's bring your brand's creative vision to life.
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            onClick={() => {
              window.open("/contact", "_blank");
            }}
            className="h-[35px] w-full max-w-[230px] cursor-pointer border  bg-[#000000] text-[11px] hover:bg-[#F4F2F0] hover:text-[#000000] font-[500] text-white sm:w-[230px]"
          >
            Get in Touch
          </button>
         
        </div>
      </div>
    </section>
  );
}

export default Section10;
