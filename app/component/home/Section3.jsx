"use client";

import React, { useEffect, useRef, useState } from "react";

const SECTION3_VIDEO_SRC =
  "https://otherassets.blob.core.windows.net/rmw/home-section2.mp4";

const Section3 = () => {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, [shouldLoad]);

  return (
    <section className="w-full bg-black">
      <video
        ref={videoRef}
        src={shouldLoad ? SECTION3_VIDEO_SRC : undefined}
        loop
        muted
        playsInline
        preload="none"
        className="block h-auto w-full object-cover"
      />
    </section>
  );
};

export default Section3;
