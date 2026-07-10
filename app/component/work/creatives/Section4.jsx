"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BRAND_FILM_SLIDES = [
  { src: "/work/creatives/s2/video.jpg", alt: "Brand film 1" },
  { src: "/work/creatives/s2/i1.jpg", alt: "Brand film 2" },
  { src: "/work/creatives/s2/i2.jpg", alt: "Brand film 3" },
  { src: "/work/creatives/s2/i3.jpg", alt: "Brand film 4" },
];

function Section4() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="w-full flex justify-center items-center mb-[45px] max-xl:mb-[40px] max-md:mb-[36px] max-sm:mb-[28px]">
      {/* Centered Align Container  */}
      <div className="w-full max-w-[1340px] flex flex-col gap-[43px] max-xl:gap-[36px] max-md:gap-[28px] max-xl:px-6 max-md:px-4">
        {/* Row 1  */}
        <div
          data-creatives-header
          className="w-full"
        >
          <h2 className="font-league-spartan font-[700] text-[48px] capitalize max-xl:text-[40px] max-lg:text-[34px] max-md:text-[28px] max-sm:text-[24px]">
          3d walkthrough
          </h2>
        </div>

        {/* Row 2  */}
        <div className="relative w-full group/brand-films">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            slidesPerView={1}
            spaceBetween={0}
            loop
            speed={700}
            grabCursor
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (!swiper.params.navigation) return;
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onInit={(swiper) => {
              if (!swiper.params.navigation) return;
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="brand-films-swiper w-full overflow-hidden [&_.swiper-pagination]:!bottom-3 max-md:[&_.swiper-pagination]:!bottom-2 [&_.swiper-pagination-bullet]:!bg-[#0D6FAA]/35 [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet-active]:!bg-[#0D6FAA]"
          >
            {BRAND_FILM_SLIDES.map((slide, index) => (
              <SwiperSlide key={`${slide.src}-${index}`}>
                <div className="relative w-full aspect-[1340/538] max-xl:aspect-[16/7] max-lg:aspect-[16/9] max-md:aspect-[4/3] max-sm:aspect-[3/2] overflow-hidden">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={prevRef}
            type="button"
            aria-label="Previous brand film"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 max-xl:left-2 max-xl:h-10 max-xl:w-10 max-md:left-2 max-md:h-9 max-md:w-9 max-sm:left-1.5 max-sm:h-8 max-sm:w-8"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5 max-md:h-4 max-md:w-4"
              aria-hidden="true"
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <button
            ref={nextRef}
            type="button"
            aria-label="Next brand film"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 max-xl:right-2 max-xl:h-10 max-xl:w-10 max-md:right-2 max-md:h-9 max-md:w-9 max-sm:right-1.5 max-sm:h-8 max-sm:w-8"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5 max-md:h-4 max-md:w-4"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Section4;
