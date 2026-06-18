"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});
const deliverImage = "/Deliver/Deliver1.jpg";
const ACTIVE_WIDTH = 878;
const INACTIVE_WIDTH = 282;
const CARD_HEIGHT = 768;

const headingStyle = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 600,
  fontSize: "48px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#333333",
  textAlign: "center",
};

const sideCardLabelStyle = {
  fontWeight: 500,
  fontSize: "28px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const StaggeredLabel = ({ lines, style, indentEm = 1.1 }) => (
  <div style={style} className="m-0">
    {lines.map((line, index) => (
      <span
        key={index}
        // className="block whitespace-nowrap"
        // style={{ paddingLeft: index === 0 ? 0 : `${index * indentEm}em` }}
      >
        {line}
      </span>
    ))}
  </div>
);

const cardLabelStyle = {
  fontWeight: 370,
  fontSize: "56px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const standOutStyle = {
  fontWeight: 600,
  fontSize: "56px",
  lineHeight: "60px",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const caseStudyStyle = {
  fontWeight: 600,
  fontSize: "24px",
  lineHeight: "30px",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#FFFFFF99",
};

const caseStudyLabelStyle = {
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "100%",
  letterSpacing: "0",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const DeliverCard = ({ isActive, onMouseEnter, children }) => (
  <div
    onMouseEnter={onMouseEnter}
    className="relative shrink-0 overflow-hidden rounded-[16px] transition-[width] duration-500 ease-in-out"
    style={{
      width: isActive ? ACTIVE_WIDTH : INACTIVE_WIDTH,
      height: CARD_HEIGHT,
    }}
  >
    <Image src={deliverImage} alt="" fill className="object-cover" sizes="878px" />
    <div className="absolute inset-0 bg-black/15" />
    {children}
  </div>
);

const Section2 = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <>
      <style>{`
        @font-face {
          font-family: "Sequel Sans";
          src: url("/fonts/Sequel-Sans-Font-Family/Sequel-Sans-Font-Family-DEMO/Sequel Sans OTF/Sequel Sans Semi Bold Body.otf")
            format("opentype");
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Sequel Sans";
          src: url("/fonts/Sequel-Sans-Font-Family/Sequel-Sans-Font-Family-DEMO/Sequel Sans OTF/Sequel Sans Semi Bold Body.otf")
            format("opentype");
          font-weight: 320;
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

      <section className="bg-[#F1F1F1] px-8 py-16 md:px-12 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1500px]">
          <h2 style={headingStyle} className="m-0">
            What we Deliver
          </h2>

          <div className="mt-10 overflow-x-auto md:mt-12 lg:mt-14">
            <div
              className="mx-auto flex w-max justify-center gap-4"
              onMouseLeave={() => setActiveIndex(1)}
            >
              <DeliverCard
                isActive={activeIndex === 0}
                onMouseEnter={() => setActiveIndex(0)}
              >
                <div className={`${montserrat.className} absolute inset-0 flex flex-col justify-end p-8`}>
                  <StaggeredLabel lines={["Gro", "Wth"]} style={sideCardLabelStyle} />
                </div>
              </DeliverCard>

              <DeliverCard
                isActive={activeIndex === 1}
                onMouseEnter={() => setActiveIndex(1)}
              >
                <div className={`${montserrat.className} absolute inset-0 flex flex-col justify-end p-8`}>
                  <div className="flex w-full items-end justify-between gap-6">
                    <p style={standOutStyle} className="m-0 whitespace-nowrap">
                      Sta
                      <br />
                      <span style={{ display: "block", paddingLeft: "1.1em" }}>Nd</span>
                      <br />
                      Out
                    </p>

                    <div
                      className={`flex flex-col items-start gap-4 transition-opacity duration-300 ${
                        activeIndex === 1 ? "opacity-100" : "pointer-events-none opacity-0"
                      }`}
                    >
                      <p style={caseStudyStyle} className="m-0 text-left">
                        How Toblerone
                        <br />
                        Supercharged Brand
                        <br />
                        Recall By <span style={{ color: "#FFFFFF" }}>29%</span>
                      </p>
                      <div className="flex items-center gap-3">
                        <span style={caseStudyLabelStyle} className="m-0">
                          Case Study
                        </span>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5A623]">
                          <span className="ml-0.5 block h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </DeliverCard>

              <DeliverCard
                isActive={activeIndex === 2}
                onMouseEnter={() => setActiveIndex(2)}
              >
                <div className={`${montserrat.className} absolute inset-0 flex flex-col justify-end p-8`}>
                  <StaggeredLabel lines={["Fan", "Dom"]} style={sideCardLabelStyle} />
                </div>
              </DeliverCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section2;
