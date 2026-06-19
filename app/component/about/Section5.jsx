"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { League_Spartan, Montserrat } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const awards = [
  {
    year: "2024",
    image: "/award/awardsecion1.jpeg",
    description: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
  },
  {
    year: "2024",
    image: "/award/awardnew.jpeg",
    description: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
  },
  {
    year: "2024",
    image: "/award/awardsection3.jpeg",
    description: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
  },
  {
    year: "2024",
    image: "/award/awardnew1.jpeg",
    description: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
  },
  {
    year: "2025",
    image: "/award/awardsecion5.jpeg",
    description: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
  },
  {
    year: "2025",
    image: "/award/awardsecion6.jpeg",
    description: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
  },
  {
    year: "2025",
    image: "/award/awardsecion7.jpeg",
    description: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
  },
  {
    year: "2025",
    image: "/award/awardsecion8.jpeg",
    description: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
  },
  {
    year: "2025",
    image: "/award/awardnew2.jpeg",
    description: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
  },
];

const Section5 = () => {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const renderAwardCard = (award, index) => (
    <article
      key={`${award.year}-${award.image}-${index}`}
      className="flex min-h-[420px] flex-col rounded-[20px] border border-[#1F275A] bg-[#11173D] px-6 pb-8 pt-6 transition-all duration-500 md:min-h-auto md:px-8"
    >
      <div className="flex items-center justify-between">
        <span
          className={`${montserrat.className} text-[16px] font-medium leading-none text-white md:text-[18px]`}
        >
          {award.year}
        </span>
        <button
          type="button"
          aria-label="View award details"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white"
        >
          <i className="ri-add-line text-[20px] leading-none" aria-hidden />
        </button>
      </div>

      <div className="relative mx-auto my-15 flex w-full items-center justify-center">
        <Image
          src={award.image}
          alt=""
          width={260}
          height={260}
          className="object-contain"
        />
      </div>

      <p
        className={`${montserrat.className} m-0 text-center text-[16px] font-medium leading-[28px] tracking-[0] text-white md:text-[18px]`}
      >
        {award.description}
      </p>
    </article>
  );

  return (
    <>
      <style>{`
        .awards-coverflow-swiper {
          width: 100%;
          padding-top: 12px;
          padding-bottom: 12px;
          overflow: hidden;
        }
        .awards-coverflow-swiper .swiper-slide {
          width: min(88vw, 320px);
          transition: filter 0.6s ease, opacity 0.6s ease;
          filter: brightness(0.75);
          opacity: 0.85;
        }
        .awards-coverflow-swiper .swiper-slide-active {
          filter: none;
          opacity: 1;
        }
        @media (min-width: 768px) {
          .awards-coverflow-swiper .swiper-slide {
            width: auto;
          }
        }
        .awards-coverflow-swiper .swiper-pagination {
          position: static;
          margin-top: 1.5rem;
        }
        .awards-coverflow-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.35);
          opacity: 1;
        }
        .awards-coverflow-swiper .swiper-pagination-bullet-active {
          background: #ffffff;
        }
      `}</style>
      <section className="bg-[#0D1334] px-8 py-[35px] md:px-12 md:py-[70px]">
        <div className="mx-auto w-full max-w-[1400px] overflow-hidden">
          <h2
            className={`${leagueSpartan.className} m-0 text-center text-[30px] font-semibold uppercase leading-[100%] tracking-[0] text-white lg:text-[86px] md:text-[60px]`}
          >
            HONOURS &amp; RECOGNITION
          </h2>

          <Swiper
            className="awards-coverflow-swiper mt-12 md:mt-16"
            modules={[EffectCoverflow, Autoplay, Pagination]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView={1}
            loop
            speed={500}
            spaceBetween={100}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 80,
              modifier: 1.8,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 100,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 0,
                  depth: 120,
                  modifier: 2.2,
                  slideShadows: false,
                },
              },
            }}
          >
            {awards.map((award, index) => (
              <SwiperSlide key={`${award.image}-${index}`}>
                {renderAwardCard(award, index)}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-10 flex items-center justify-center gap-4 md:mt-12">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous awards"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#161C3D] text-white transition-opacity hover:opacity-80"
            >
              <i className="ri-arrow-left-line text-[20px]" aria-hidden />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next awards"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#161C3D] text-white transition-opacity hover:opacity-80"
            >
              <i className="ri-arrow-right-line text-[20px]" aria-hidden />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section5;
