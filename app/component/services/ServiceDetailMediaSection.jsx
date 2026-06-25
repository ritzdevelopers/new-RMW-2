"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import ServiceDetailMediaButton from "./ServiceDetailMediaButton";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const titleStyle = {
  color: "#333333",
  textAlign: "center",
  fontFamily: '"League Spartan", sans-serif',
  fontStyle: "normal",
  fontWeight: 500,
  textTransform: "uppercase",
};

const bodyStyle = {
  color: "#333333",
  textAlign: "center",
  fontFamily: "Montserrat, sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
};

const imageContentHeadingStyle = {
  color: "#333333",
  textAlign: "center",
  fontFamily: '"League Spartan", sans-serif',
  fontStyle: "normal",
  fontWeight: 600,
  textTransform: "uppercase",
};

const imageContentBodyStyle = {
  color: "#333333",
  textAlign: "center",
  fontFamily: "Montserrat, sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
};

const ServiceDetailMediaSection = ({ mediaSection }) => {
  if (!mediaSection) return null;

  const { title, video, description, image, container, grid, imageContent } = mediaSection;

  return (
    <section className={`${montserrat.className} overflow-x-clip bg-[#F1F1F1] py-12 md:py-16 lg:py-20`}>
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 md:px-[50px]">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8 xl:gap-16">
          <div className="flex w-full min-w-0 flex-col items-center lg:max-w-[48%] xl:max-w-[561px] xl:shrink-0">
            {title ? (
              <h2
                className="m-0 mt-0 w-full uppercase text-center text-[28px] leading-[42px] sm:text-[44px] sm:leading-[50px] lg:text-[54px] lg:leading-[62px] xl:mt-25 xl:max-w-[456px] xl:text-[65px] xl:leading-[74px]"
                style={titleStyle}
              >
                {title}
              </h2>
            ) : null}

            {video?.src ? (
              <video
                src={video.src}
                width={video.width ?? 561}
                height={video.height ?? 342}
                className="mt-6 block w-full max-w-full object-cover object-center lg:mt-10 xl:mt-15 xl:h-[342px] xl:w-[561px] xl:max-w-[561px]"
                style={{
                  aspectRatio: `${video.width ?? 561} / ${video.height ?? 342}`,
                }}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : null}

            {description ? (
              <p className="m-0 mt-6 w-full text-center text-[16px] leading-6 lg:mt-9 lg:text-[18px] lg:leading-7 xl:max-w-[509px] xl:text-[20px] xl:leading-[28px]" style={bodyStyle}>
                {description}
              </p>
            ) : null}
          </div>

          {image?.src ? (
            <div
              className="relative w-full min-w-0 overflow-hidden lg:max-w-[48%] lg:ml-auto xl:w-[720.953px] xl:max-w-[720.953px] xl:shrink-0"
              style={{
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

        {/* {container ? (
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
        ) : null} */}

        {grid?.items?.length ? (
          <div
            className="mx-auto mt-12 grid w-full max-w-full grid-cols-1 gap-3 md:mt-16  lg:grid-cols-[336fr_336fr_613fr] lg:grid-rows-[auto_auto] xl:gap-[25px] "
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
          <div className="mx-auto mt-12 flex w-full max-w-full flex-col items-center md:mt-16 xl:max-w-[1135px]">
            <div className="flex w-full flex-col items-center px-6 sm:px-10 max-lg:px-0 max-lg:sm:px-4">
              {imageContent.heading ? (
                <h2
                  className="m-0 w-full uppercase text-center text-[24px] leading-[34px]  sm:leading-[42px] lg:text-[35px] md:text-[30px] md:leading-[38px] lg:leading-[48px] xl:max-w-[1135px] xl:text-[48px] xl:leading-[57px]"
                  style={imageContentHeadingStyle}
                >
                  {imageContent.heading}
                </h2>
              ) : null}
              {imageContent.body ? (
                <p className="m-0 mt-6 w-full text-center text-[16px] leading-6 lg:text-[18px] lg:leading-7 xl:max-w-[986px] xl:text-[20px] xl:leading-[28px]" style={imageContentBodyStyle}>
                  {imageContent.body}
                </p>
              ) : null}
              <ServiceDetailMediaButton />
            </div>
            {/* {imageContent.background ? (
              <img
                src={imageContent.background}
                alt=""
                className="mx-auto mt-8 block h-auto w-auto max-w-full xl:mt-20 md:mt-10"
              />
            ) : null} */}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ServiceDetailMediaSection;
