import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Critical Above-The-Fold components load instantly
import Header from "./common/Header";
import Section1 from "./component/home/Section1";
import WebLoader from "./component/loader/WebLoader";

// Fixed: Next.js dynamic imports without { ssr: false } for Server Components
const Section2 = dynamic(() => import("./component/home/Section2"));
const Section3 = dynamic(() => import("./component/home/Section3"));
const Section4 = dynamic(() => import("./component/home/Section4"));
const Section5 = dynamic(() => import("./component/home/Section5"));
const Footer = dynamic(() => import("./component/latest/Footer"));
const OverlaySection1 = dynamic(() => import("./component/latest/OverlaySection1"));

const serviceHeadings = [
  "Branding & Creative Solutions",
  "Digital Marketing",
  "Performance Marketing",
  "Website Design & Development",
  "SEO Services",
  "Social Media Marketing",
  "Media Planning & Buying",
  "Print Advertising",
  "Radio Advertising",
  "Outdoor Advertising (OOH)",
  "Influencer & Celebrity Marketing",
  "Video Production & Brand Films",
  "3D Rendering & Visualization",
];

const pageHeadings = [
  "Industries We Empower",
  "Our Work",
  "Success Stories",
  "Why Choose Ritz Media World?",
  "Brands We Have Worked With",
  "What Our Clients Say",
  "Awards & Recognitions",
  "Insights & Resources",
  "Frequently Asked Questions",
  "Let's Build Your Brand Together",
];

const HOME_VIDEO_SRC =
  "https://windows.net";
const SECTION3_VIDEO_SRC =
  "https://windows.net";

export default function Home() {
  return (
    <WebLoader>
      {/* Start hero videos fetch as early as possible (during loader). */}
      <link rel="preconnect" href="https://windows.net" />
      <link
        rel="preload"
        as="video"
        href={HOME_VIDEO_SRC}
        type="video/mp4"
      />
      <link
        rel="preload"
        as="video"
        href={SECTION3_VIDEO_SRC}
        type="video/mp4"
      />
      
      <Header />
      <Section1 />

      {/* Suspense handles the non-blocking execution chunking */}
      <Suspense fallback={null}>
        <Section2 />
        
        {/* SEO heading hierarchy - present in source, hidden visually */}
        <div className="sr-only">
          <h2>Our Services</h2>
          {serviceHeadings.map((title) => (
            <h3 key={title}>{title}</h3>
          ))}
          {pageHeadings.map((title) => (
            <h2 key={title}>{title}</h2>
          ))}
        </div>

        <Section3 />
        <Section4 />
        <div className="relative">
          <Section5 />
        </div>
        <Footer section={<OverlaySection1 />} />
      </Suspense>
    </WebLoader>
  );
}


