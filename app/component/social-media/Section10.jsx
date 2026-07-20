"use client";
import React from "react";
import ServiceDetailMediaButton from "../services/ServiceDetailMediaButton";

function Section10() {
  return (
    <section className="flex w-full items-center justify-between bg-[#F4F2F0] px-5 py-[30px] sm:px-8  md:px-10  lg:px-4 md:py-[70px]">
      <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-[400] text-[22px]  md:text-[24px] lg:text-[35px]">
          Ready to take the next step?
        </h2>
        <p className="max-w-[600px] font-[300] lg:text-[20px] md:text-[16px] leading-[1.6] lg:leading-normal">
        Let's Create Something Your Brand Will Be Known For
        Have a project in mind? Let's bring your brand's creative vision to life.
        </p>
        <ServiceDetailMediaButton
          label="Get in Touch"
          href="/contact"
          className="mt-1"
        />
      </div>
    </section>
  );
}

export default Section10;
