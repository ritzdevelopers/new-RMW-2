import React from "react";
import {
  imgImage1006,
  imgImage1005,
} from "./figmaAssets";

const Section1 = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      data-node-id="1:5"
    >
      <div className="relative flex w-full items-stretch">
        {/* LEFT IMAGE */}
        <div
          className="relative w-[47.22%] min-h-[min(878px,70vw)] overflow-hidden"
          data-node-id="1:6"
        >
          <img
            src={imgImage1006}
            alt=""
            className="absolute inset-0 h-full w-full max-w-none object-cover"
          />
        </div>

        {/* WHITE DIVIDER */}
        <div
          className="relative z-10 w-3 shrink-0 self-stretch bg-white"
          data-node-id="1:8"
        />

        {/* RIGHT IMAGE */}
        <div
          className="relative min-h-[min(825px,65vw)] flex-1 overflow-hidden"
          data-node-id="1:7"
        >
          <img
            src={imgImage1005}
            alt=""
            className="absolute inset-0 h-full w-full max-w-none object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Section1;
