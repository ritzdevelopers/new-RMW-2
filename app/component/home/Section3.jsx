import React from "react";

const SECTION3_VIDEO_SRC =
  "https://otherassets.blob.core.windows.net/rmw/home-section2.mp4";

const Section3 = () => {
  return (
    <section className="w-full bg-black">
      <video
        src={SECTION3_VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        className="block h-auto w-full object-cover"
      />
    </section>
  );
};

export default Section3;
