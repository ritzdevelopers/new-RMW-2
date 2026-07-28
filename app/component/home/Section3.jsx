"use client";

import { useEffect, useRef } from "react";

const SECTION3_VIDEO_SRC =
  "https://otherassets.blob.core.windows.net/rmw/home-section2.mp4";

const Section3 = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let started = false;
    let cancelled = false;

    const playVideo = () => {
      if (cancelled) return;
      video.muted = true;
      video.play().catch(() => {});
    };

    // Buffer early so the first frame is ready when the section enters view.
    if (!video.getAttribute("src")) {
      video.src = SECTION3_VIDEO_SRC;
    }
    video.preload = "auto";
    if (video.readyState === 0) {
      video.load();
    }

    const begin = () => {
      if (started || cancelled) return;
      started = true;

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        playVideo();
      } else {
        video.addEventListener("loadeddata", playVideo, { once: true });
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
      { rootMargin: "200px 0px", threshold: 0.05 }
    );
    observer.observe(video);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("rmw:loader-done", begin);
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
    };
  }, []);

  return (
    <section className="w-full bg-black">
      <video
        ref={videoRef}
        src={SECTION3_VIDEO_SRC}
        loop
        muted
        playsInline
        preload="auto"
        disableRemotePlayback
        className="block h-auto w-full object-cover"
      />
    </section>
  );
};

export default Section3;
