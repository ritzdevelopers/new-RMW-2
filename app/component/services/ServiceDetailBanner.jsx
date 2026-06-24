"use client";

import React from "react";

const ServiceDetailBanner = ({ banner }) => {
  if (!banner?.src) return null;

  return (
    <section className="overflow-x-clip bg-[#F1F1F1]">
      <div className="mx-auto w-full max-w-[1440px]">
        <img
          src={banner.src}
          alt=""
          width={banner.width ?? 1440}
          height={banner.height ?? 887}
          className="block aspect-[1440/887] h-auto w-full max-h-[887px] object-cover object-center"
        />
      </div>
    </section>
  );
};

export default ServiceDetailBanner;
