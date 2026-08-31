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

    const attachSource = () => {
      if (cancelled) return;
      if (!video.getAttribute("src")) {
        video.src = SECTION3_VIDEO_SRC;
      }
      video.preload = "metadata";
      if (video.readyState === 0) {
        video.load();
      }
    };

    const begin = () => {
      if (started || cancelled) return;
      started = true;
      attachSource();

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        playVideo();
      } else {
        video.addEventListener("loadeddata", playVideo, { once: true });
      }
      video.addEventListener("canplay", playVideo);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (window.__rmwLoaderDone) begin();
          else window.addEventListener("rmw:loader-done", begin, { once: true });
          if (started) playVideo();
        } else if (started) {
          video.pause();
        }
      },
      { rootMargin: "280px 0px", threshold: 0.01 }
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
    <section className="w-full bg-black [content-visibility:auto] [contain-intrinsic-size:auto_420px]">
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        disableRemotePlayback
        className="block h-auto w-full object-cover"
      />
    </section>
  );
};

export default Section3;
