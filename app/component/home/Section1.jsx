"use client";

import React, { useEffect, useRef, useState } from "react";

const HOME_VIDEO_SRC =
  "https://otherassets.blob.core.windows.net/rmw/home-website.mp4";

const Section1 = () => {
  const videoRef = useRef(null);
  const isMutedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoSrc, setVideoSrc] = useState(undefined);

  useEffect(() => {
    const begin = () => setVideoSrc(HOME_VIDEO_SRC);

    if (window.__rmwLoaderDone) {
      begin();
    } else {
      window.addEventListener("rmw:loader-done", begin, { once: true });
    }

    return () => {
      window.removeEventListener("rmw:loader-done", begin);
    };
  }, []);

  useEffect(() => {
    if (!videoSrc) return;

    const video = videoRef.current;
    if (!video) return;

    let unlockBound = false;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    const unlockSound = () => {
      if (isMutedRef.current) return;
      video.muted = false;
      video.volume = 1;
      playVideo();
    };

    const bindUnlockListeners = () => {
      if (unlockBound || isMutedRef.current) return;
      unlockBound = true;
      ["pointerdown", "click", "touchstart", "keydown"].forEach((eventName) => {
        document.addEventListener(eventName, unlockSound, { once: true, capture: true });
      });
    };

    const startPlayback = async () => {
      video.volume = 1;
      video.muted = false;

      try {
        await video.play();
      } catch {
        video.muted = true;
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
  }, [videoSrc]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    if (!nextMuted) {
      video.volume = 1;
      video.play().catch(() => {});
    }
    isMutedRef.current = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section className="relative w-full bg-black">
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        playsInline
        preload="metadata"
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
