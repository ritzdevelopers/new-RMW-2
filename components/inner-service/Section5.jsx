import React from "react";

import {
  imgImage1013,
  imgImage1014,
  imgImage1015,
  imgImage1016,
  imgImage1005,
} from "./figmaAssets";

const Section5 = () => {
  return (
    <section
      className="relative w-full bg-[#f1f1f1]"
      data-node-id="1:58"
    >
      <div className="mx-auto grid w-full max-w-[1340px] grid-cols-1 gap-3 px-5 py-10 sm:gap-4 sm:px-8 sm:py-12 md:px-10 md:py-14 lg:gap-4 lg:px-8 lg:py-14 xl:grid-cols-[696px_613px] xl:items-stretch xl:gap-4 xl:px-[50px] xl:py-16">
        {/* LEFT — image grid */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-[336px_336px] xl:gap-4">
          {/* TOP LEFT */}
          <div
            className="h-[220px] w-full overflow-hidden sm:h-[260px] md:h-[300px] xl:h-[355px] xl:w-[336px]"
            style={{
              WebkitMaskImage: `url("${imgImage1013}")`,
              maskImage: `url("${imgImage1013}")`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
            }}
          >
            <img
              src={imgImage1014}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          {/* TOP MIDDLE */}
          <div
            className="h-[220px] w-full overflow-hidden sm:h-[260px] md:h-[300px] xl:h-[355px] xl:w-[336px]"
            style={{
              WebkitMaskImage: `url("${imgImage1013}")`,
              maskImage: `url("${imgImage1013}")`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
            }}
          >
            <img
              src={imgImage1016}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          {/* BOTTOM LEFT — spans full left width */}
          <div
            className="h-[280px] w-full overflow-hidden sm:col-span-2 sm:h-[360px] md:h-[420px] xl:col-span-2 xl:h-[572px] xl:w-[696px]"
            style={{
              WebkitMaskImage: `url("${imgImage1015}")`,
              maskImage: `url("${imgImage1015}")`,
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

        {/* RIGHT — same height as left via grid stretch */}
        <div className="relative h-[420px] w-full overflow-hidden sm:h-[520px] md:h-[580px] xl:h-auto xl:min-h-full xl:w-[613px]">
          <img
            src="/inner-service/s5-img.jpg"
            alt=""
            className="h-full w-full object-cover xl:absolute xl:inset-0 xl:h-full xl:w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Section5;
