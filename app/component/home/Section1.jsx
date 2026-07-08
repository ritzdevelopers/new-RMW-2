"use client";

import React, { useEffect, useRef, useState } from "react";

const HOME_VIDEO_SRC =
  "https://otherassets.blob.core.windows.net/rmw/home-website.mp4";

const Section1 = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;
    video.play().catch(() => {
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {});
    });
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    if (!nextMuted) {
      video.volume = 1;
      video.play().catch(() => {});
    }
    setIsMuted(nextMuted);
  };

  return (
    <section className="relative w-full bg-black">
      <video
        ref={videoRef}
        src={HOME_VIDEO_SRC}
        autoPlay
        loop
        playsInline
        className="block h-auto w-full object-cover lg:max-h-[calc(100vh-100px)] md:max-h-[calc(100vh-200px)]"
      />

      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        className="absolute right-4 top-5 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65 md:right-6 md:h-10 md:w-10"
      >
        <i
          className={`text-lg md:text-xl ${isMuted ? "ri-volume-mute-line" : "ri-volume-down-line"}`}
          aria-hidden
        />
      </button>
    </section>
  );
};

export default Section1;
