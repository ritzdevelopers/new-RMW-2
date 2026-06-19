"use client";

import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const headingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#333333",
};

const buttonStyle = {
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
};

const galleryImages = [
  { src: "/create/first-image.jpeg", width: 547, height: 806 },
  { src: "/create/second-image.jpeg", width: 376, height: 340 },
  { src: "/create/third-image.jpeg", width: 376, height: 340 },
  { src: "/create/fourth-image.jpeg", width: 773, height: 447 },
];

const GalleryImage = ({ src, alt = "", width, height, className = "", fill = false }) => (
  <div
    className={`relative shrink-0 overflow-hidden rounded-[16px] ${className}`}
    style={fill ? { aspectRatio: `${width} / ${height}` } : { width: `${width}px`, height: `${height}px`, maxWidth: "100%" }}
  >
    <Image src={src} alt={alt} fill className="object-cover" sizes={fill ? "100vw" : `${width}px`} />
  </div>
);

const Section3 = () => {
  return (
    <>
      <style>{`
        @font-face {
          font-family: "Sequel Sans";
          src: url("/fonts/Sequel-Sans-Font-Family/Sequel-Sans-Font-Family-DEMO/Sequel Sans OTF/Sequel Sans Roman Body.otf")
            format("opentype");
          font-weight: 310;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Sequel Sans";
          src: url("/fonts/Sequel-Sans-Font-Family/Sequel-Sans-Font-Family-DEMO/Sequel Sans OTF/Sequel Sans Semi Bold Head.otf")
            format("opentype");
          font-weight: 370;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

      <section className="bg-[#F1F1F1] pb-[35px] md:pb-[70px]">
        <div className="mx-auto w-full max-w-8xl px-8 md:px-12 lg:max-w-[1500px]">
          <h2
            style={headingStyle}
            className="m-0 text-center text-[30px] md:text-[48px] lg:text-[60px] xl:text-[86px]"
          >
          BUILD. BELIEVE. BECOME
          </h2>

          <div className="mt-4 flex flex-col gap-4 md:mt-5 md:gap-5 lg:hidden">
            {galleryImages.map((image) => (
              <GalleryImage
                key={image.src}
                src={image.src}
                width={image.width}
                height={image.height}
                fill
                className="w-full"
              />
            ))}
          </div>

          <div className="mt-4 hidden flex-wrap justify-center gap-5 lg:mt-8 lg:flex xl:mt-14">
            <GalleryImage src="/create/first-image.jpeg" width={547} height={806} />

            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap justify-center gap-5">
                <GalleryImage src="/create/second-image.jpeg" width={376} height={340} />
                <GalleryImage src="/create/third-image.jpeg" width={376} height={340} />
              </div>
              <GalleryImage src="/create/fourth-image.jpeg" width={773} height={447} />
            </div>
          </div>

          <div className="mt-12 flex justify-center md:mt-14">
            <button
              type="button"
              className={`${montserrat.className} group relative cursor-pointer overflow-hidden border border-black bg-transparent px-[15px] py-2 md:px-[42px] md:py-4`}
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
              <span
                style={buttonStyle}
                className="relative z-10 flex items-center gap-3 text-black transition-colors duration-300 group-hover:text-white"
              >
                Load More Images
                <i className="ri-arrow-right-up-line text-[18px] leading-none" aria-hidden />
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section3;
