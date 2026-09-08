import React from "react";
import dynamic from "next/dynamic";

import Header from "./common/Header";
import Section1 from "./component/home/Section1";
import Section4 from "./component/home/Section4Deferred";
import Section5 from "./component/home/Section5Deferred";
import Footer from "./component/home/FooterDeferred";
import WebLoader from "./component/loader/WebLoader";

const Section2 = dynamic(() => import("./component/home/Section2"), {
  loading: () => (
    <section
      className="relative w-full overflow-hidden px-8 py-[35px] md:px-12 md:py-[70px] min-h-[420px] bg-[#0F0E14]"
      aria-hidden
    />
  ),
});

const Section3 = dynamic(() => import("./component/home/Section3"), {
  loading: () => (
    <section className="relative w-full min-h-[420px] bg-black" aria-hidden />
  ),
});

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
      {/* Warm the hero-video origin only — no hero video preload. */}
      <link rel="preconnect" href={HOME_VIDEO_HOST} />

      <Header />
      <Section1 />

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
      <Section5 />
      <Footer />
    </WebLoader>
  );
}
