import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Critical Above-The-Fold components load instantly
import Header from "./common/Header";
import Section1 from "./component/home/Section1";
import Section3 from "./component/home/Section3";
import Section4 from "./component/home/Section4";
import OverlaySection1 from "./component/latest/OverlaySection1";
import WebLoader from "./component/loader/WebLoader";

const Section2 = dynamic(() => import("./component/home/Section2"));
const Section5 = dynamic(() => import("./component/home/Section5"));
const Footer = dynamic(() => import("./component/latest/Footer"));

function Section2Fallback() {
  return (
    <section
      className="relative w-full overflow-hidden px-8 py-[35px] md:px-12 md:py-[70px] min-h-[min(520px,85vh)] bg-[#0F0E14]"
      aria-hidden
    />
  );
}

function Section5Fallback() {
  return (
    <section
      className="bg-[#FAFAFA] px-8 py-[35px] md:px-12 md:py-[70px] min-h-[720px]"
      aria-hidden
    />
  );
}

function FooterFallback() {
  return (
    <footer
      className="relative w-full min-h-[100dvh] bg-[#0E1125]"
      aria-hidden
    />
  );
}

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

const HOME_VIDEO_HOST = "https://otherassets.blob.core.windows.net";

export default function Home() {
  return (
    <WebLoader>
      {/* Warm the hero-video origin only — do not preload the below-fold clip. */}
      <link rel="preconnect" href={HOME_VIDEO_HOST} />
      <link
        rel="preload"
        as="image"
        href="/loder/loader_i6.jpg"
        fetchPriority="high"
      />

      <Header />
      <Section1 />

      <Suspense fallback={<Section2Fallback />}>
        <Section2 />
      </Suspense>

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
        <Suspense fallback={<Section5Fallback />}>
          <Section5 />
        </Suspense>
      </div>

      <Suspense fallback={<FooterFallback />}>
        <Footer section={<OverlaySection1 />} />
      </Suspense>
    </WebLoader>
  );
}
