"use client";

import { useEffect, useRef, useState } from "react";

const HOME_VIDEO_SRC =
  "https://otherassets.blob.core.windows.net/rmw/home-website.mp4";

const Section1 = () => {
  const videoRef = useRef(null);
  const isMutedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let unlockBound = false;
    let started = false;
    let cancelled = false;

    const playVideo = () => {
      if (cancelled) return;
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
        document.addEventListener(eventName, unlockSound, {
          once: true,
          capture: true,
        });
      });
    };

    const tryPlayWithSound = async () => {
      if (cancelled) return;

      video.volume = 1;
      video.muted = false;

      try {
        await video.play();
      } catch {
        video.muted = true;
        isMutedRef.current = true;
        setIsMuted(true);
        playVideo();
        bindUnlockListeners();
      }
    };

    // Buffer during the intro loader so the first frame is ready on reveal.
    if (!video.getAttribute("src")) {
      video.src = HOME_VIDEO_SRC;
    }
    video.preload = "auto";
    if (video.readyState === 0) {
      video.load();
    }

    const begin = () => {
      if (started || cancelled) return;
      started = true;

      // Play as soon as a frame is available (may already be buffered).
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        tryPlayWithSound();
      } else {
        video.addEventListener("loadeddata", tryPlayWithSound, { once: true });
      }
      video.addEventListener("canplay", playVideo);
    };

    if (window.__rmwLoaderDone) {
      begin();
    } else {
      window.addEventListener("rmw:loader-done", begin, { once: true });
    }

    // Pause off-screen to cut decode/CPU after the user scrolls away.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!started) return;
        if (entry.isIntersecting) playVideo();
        else video.pause();
      },
      { rootMargin: "100px 0px", threshold: 0.05 }
    );
    observer.observe(video);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("rmw:loader-done", begin);
      video.removeEventListener("loadeddata", tryPlayWithSound);
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
    isMutedRef.current = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section className="relative w-full bg-black">
      <video
        ref={videoRef}
        src={HOME_VIDEO_SRC}
        loop
        playsInline
        preload="auto"
        disableRemotePlayback
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
