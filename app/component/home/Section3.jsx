"use client";

import { useEffect, useRef } from "react";
import { refreshFooterScroll } from "@/lib/footerRefresh";

const SECTION3_VIDEO_SRC =
  "https://otherassets.blob.core.windows.net/rmw/home-section2.mp4";

const Section3 = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let started = false;
    let cancelled = false;

    const notifyLayoutStable = () => {
      const video = videoRef.current;
      const wrapper = sectionRef.current?.firstElementChild;
      if (video?.videoWidth && video?.videoHeight && wrapper) {
        wrapper.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
        wrapper.style.minHeight = "";
      }
      refreshFooterScroll();
      window.dispatchEvent(new Event("rmw:layout-stable"));
    };

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

    video.addEventListener("loadedmetadata", notifyLayoutStable, { once: true });

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("rmw:loader-done", begin);
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
      video.removeEventListener("loadedmetadata", notifyLayoutStable);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate z-[1] w-full bg-black"
      data-home-section="section3"
    >
      <div className="relative w-full min-h-[420px] bg-black">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          disableRemotePlayback
          className="block h-auto w-full min-h-[420px] object-cover"
        />
      </div>
    </section>
  );
};

export default Section3;
