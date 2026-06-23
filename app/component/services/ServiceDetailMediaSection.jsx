"use client";

import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const titleStyle = {
  width: "456px",
  maxWidth: "100%",
  color: "#333333",
  textAlign: "center",
  fontFamily: '"League Spartan", sans-serif',
  fontSize: "65px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "74px",
  textTransform: "uppercase",
};

const bodyStyle = {
  width: "509px",
  maxWidth: "100%",
  color: "#333333",
  textAlign: "center",
  fontFamily: "Montserrat, sans-serif",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "28px",
};

const imageContentHeadingStyle = {
  width: "1135px",
  maxWidth: "100%",
  color: "#333333",
  textAlign: "center",
  fontFamily: '"League Spartan", sans-serif',
  fontSize: "48px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "57px",
  textTransform: "uppercase",
};

const imageContentBodyStyle = {
  width: "986px",
  maxWidth: "100%",
  color: "#333333",
  textAlign: "center",
  fontFamily: "Montserrat, sans-serif",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "28px",
};

const ServiceDetailMediaSection = ({ mediaSection }) => {
  if (!mediaSection) return null;

  const { title, video, description, image, container, grid, imageContent } = mediaSection;

  return (
    <section className={`${montserrat.className} overflow-x-clip bg-[#F1F1F1] py-12 md:py-16 lg:py-20`}>
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 md:px-[50px]">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12 xl:gap-16">
          <div className="flex w-full max-w-[561px] flex-col items-center lg:shrink-0">
            {title ? (
              <h2 className="m-0 uppercase" style={titleStyle}>
                {title}
              </h2>
            ) : null}

            {video?.src ? (
              <video
                src={video.src}
                width={video.width ?? 561}
                height={video.height ?? 342}
                className="mt-6 block w-full max-w-[561px] object-cover object-center"
                style={{
                  width: video.width ?? 561,
                  height: video.height ?? 342,
                  maxWidth: "100%",
                  aspectRatio: `${video.width ?? 561} / ${video.height ?? 342}`,
                }}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : null}

            {description ? (
              <p className="m-0 mt-6" style={bodyStyle}>
                {description}
              </p>
            ) : null}
          </div>

          {image?.src ? (
            <div
              className="relative w-full shrink-0 overflow-hidden lg:ml-auto"
              style={{
                maxWidth: image.width ?? 720.953,
                width: image.width ?? 720.953,
                aspectRatio: image.aspectRatio ?? "69 / 73",
              }}
            >
              <img
                src={image.src}
                alt=""
                width={image.width ?? 720.953}
                height={image.height ?? 762.712}
                className="block h-full w-full object-cover object-center"
              />
            </div>
          ) : null}
        </div>

        {container ? (
          <div
            className="relative mt-12 w-full max-w-[1154px] overflow-hidden md:mt-16"
            style={{
              width: container.width ?? 1154,
              height: container.height ?? 666,
              borderRadius: container.borderRadius ?? 16,
              background: container.background ?? "#D9D9D9",
            }}
          >
            {container.leftImage?.src ? (
              <div
                className="absolute left-0 top-0 overflow-hidden"
                style={{
                  width: container.leftImage.width ?? 509,
                  height: container.leftImage.height ?? 277,
                  aspectRatio: container.leftImage.aspectRatio ?? "147 / 80",
                }}
              >
                <img
                  src={container.leftImage.src}
                  alt=""
                  width={container.leftImage.width ?? 509}
                  height={container.leftImage.height ?? 277}
                  className="block h-full w-full object-contain object-left-top"
                />
              </div>
            ) : null}

            {container.rightImage?.src ? (
              <div className="absolute right-0 top-0">
                <img
                  src={container.rightImage.src}
                  alt=""
                  width={container.rightImage.width}
                  height={container.rightImage.height}
                  className="block object-contain object-right-top"
                  style={{
                    width: container.rightImage.width ?? 509,
                    height: container.rightImage.height ?? "auto",
                    maxWidth: container.rightImage.width ?? 509,
                  }}
                />
              </div>
            ) : null}
          </div>
        ) : null}

        {grid?.items?.length ? (
          <div
            className="mt-12 grid w-full max-w-[1154px] grid-cols-1 gap-3 md:mt-16 lg:grid-cols-[336fr_336fr_613fr] lg:grid-rows-[auto_auto] lg:gap-[12px]"
          >
            {grid.items.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                className={`relative overflow-hidden ${item.className ?? ""}`}
                style={{
                  aspectRatio: item.aspectRatio,
                }}
              >
                <img
                  src={item.src}
                  alt=""
                  className="block h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        ) : null}

        {imageContent ? (
          <div className="mx-auto mt-12 flex w-full max-w-[1135px] flex-col items-center md:mt-16">
            <div className="flex w-full flex-col items-center px-6 sm:px-10">
              {imageContent.heading ? (
                <h2 className="m-0 uppercase" style={imageContentHeadingStyle}>
                  {imageContent.heading}
                </h2>
              ) : null}
              {imageContent.body ? (
                <p className="m-0 mt-6" style={imageContentBodyStyle}>
                  {imageContent.body}
                </p>
              ) : null}
            </div>
            {imageContent.background ? (
              <img
                src={imageContent.background}
                alt=""
                className="mt-8 block h-auto w-full object-cover object-center md:mt-10"
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ServiceDetailMediaSection;
