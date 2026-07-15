"use client";

import React, { useEffect, useRef, useState } from "react";

const titleStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const Section1 = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let unlockBound = false;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    const unlockSound = () => {
      video.muted = false;
      video.volume = 1;
      setIsMuted(false);
      playVideo();
    };

    const bindUnlockListeners = () => {
      if (unlockBound) return;
      unlockBound = true;
      ["pointerdown", "click", "touchstart", "keydown"].forEach((eventName) => {
        document.addEventListener(eventName, unlockSound, {
          once: true,
          capture: true,
        });
      });
    };

    const startPlayback = async () => {
      video.volume = 1;
      video.muted = false;

      try {
        await video.play();
        setIsMuted(false);
      } catch {
        video.muted = true;
        setIsMuted(true);
        playVideo();
        bindUnlockListeners();
      }
    };

    startPlayback();
    video.addEventListener("loadeddata", playVideo);
    video.addEventListener("canplay", playVideo);

    return () => {
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
      ["pointerdown", "click", "touchstart", "keydown"].forEach((eventName) => {
        document.removeEventListener(eventName, unlockSound, { capture: true });
      });
    };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    if (!nextMuted) {
      video.volume = 1;
      video.play().catch(() => {});
    }
    setIsMuted(nextMuted);
  };

  return (
    <section className="bg-[#0D1334] px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14 lg:px-12 lg:py-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 md:gap-12 lg:gap-14">
        <h1
          style={titleStyle}
          className="m-0 w-full text-center text-[30px] leading-[100%] md:text-[50px] lg:text-[60px] xl:text-[94px]"
        >
          Memories Gallery Reliving
          <br />
          Moments
        </h1>

        <div className="relative w-full max-w-[1200px]">
          <div className="relative mx-auto aspect-[851/443] w-full max-w-[851px] overflow-hidden rounded-[24px] bg-black md:rounded-[32px] lg:h-[443px] lg:w-[851px] lg:max-w-[851px]">
            <video
              ref={videoRef}
              src="/gallery/nuv-video.mp4"
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              playsInline
            />
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65 md:right-5 md:top-5 md:h-10 md:w-10"
            >
              <i
                className={`text-lg md:text-xl ${
                  isMuted ? "ri-volume-mute-line" : "ri-volume-down-line"
                }`}
                aria-hidden
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
