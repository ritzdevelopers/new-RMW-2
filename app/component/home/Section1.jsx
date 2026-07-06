import React from "react";

const HOME_VIDEO_SRC =
  "https://otherassets.blob.core.windows.net/rmw/home-website.mp4";

const Section1 = () => {
  return (
    <section className="w-full bg-black">
      <video
        src={HOME_VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        className="block h-auto w-full object-cover lg:max-h-[calc(100vh-100px)] md:max-h-[calc(100vh-200px)]"
      />
    </section>
  );
};

export default Section1;
