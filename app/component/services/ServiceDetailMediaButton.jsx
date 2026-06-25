"use client";

import React from "react";
import Link from "next/link";

const ServiceDetailMediaButton = ({
  label = "Contact Us",
  href = "/contact",
}) => (
  <div className="mt-8 flex justify-center md:mt-10">
    <Link
      href={href}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 shadow-[0_6px_24px_rgba(0,0,0,0.22)] transition-opacity duration-300 hover:opacity-90 md:gap-2.5 md:py-2 md:pl-6 md:pr-2"
    >
      <span className="font-league-spartan text-[12px] font-medium uppercase tracking-[0.08em] text-[#1D1D1B] md:text-[14px]">
        {label}
      </span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1D1B] text-white md:h-9 md:w-9">
        <i className="ri-arrow-right-up-line text-[14px] md:text-[16px]" aria-hidden />
      </span>
    </Link>
  </div>
);

export default ServiceDetailMediaButton;
