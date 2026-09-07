import React from "react";
import Header from "@/app/component/social-media/Header";
import Hero from "@/app/component/social-media/Hero";
import Section10 from "@/app/component/social-media/Section10";
import DynamicSlider from "@/app/component/social-media/DynamicSlider";
import Section2 from "@/app/component/work/portfolio/Section2";
/** Webflow Editor's Note Light custom font stack */
const editorsNoteLight =
  "wfont_e6fa52_d03d36fc891b44ea946b083dc8504aac, wf_d03d36fc891b44ea946b083dc, orig_editors_note_light, serif";

const website_images = [
  {
    src: "/portfolio-website/website-1.jpg",
    fullSrc: "/portfolio-website/wesbite-1-full-image.jpg",
    label: "Website 1",
  },
  {
    src: "/portfolio-website/website-2.jpg",
    fullSrc: "/portfolio-website/website-2-full-image.jpg",
    label: "Website 2",
  },
  {
    src: "/portfolio-website/website-3.jpg",
    fullSrc: "/portfolio-website/website-3-full-image.jpg",
    label: "Website 3",
  },
  {
    src: "/portfolio-website/website-4.jpg",
    fullSrc: "/portfolio-website/website-4-full-image.jpg",
    label: "Website 4",
  },
  {
    src: "/portfolio-website/website-6.jpg",
    fullSrc: "/portfolio-website/website-5-full-image.jpg",
    label: "Website 5",
  },
  {
    src: "/portfolio-website/website-5.jpg",
    fullSrc: "/portfolio-website/website-6-full-image.jpg",
    label: "Website 6",
  },
];

export const metadata = {
  alternates: {
    title: "Creative Website Design Portfolio | Ritz Media World",
    description:
      "Discover thoughtfully designed websites by Ritz Media World, combining creativity, functionality, and user experience to help brands stand out and grow online.",
  
    canonical: "https://ritzmediaworld.com/portfolio/web-design",
  },
};

const seoHeadingStyle = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

function page() {
  return (
    <main style={{ fontFamily: editorsNoteLight }}>
      <Header />
      <Hero />
      <DynamicSlider
        heading="Website Design"
        images={website_images}
        enableLightbox
      />
      <Section2 />
      <Section10 />
      <div aria-hidden="false">
        <h2 style={seoHeadingStyle}>Website Design Portfolio</h2>

        <h2 style={seoHeadingStyle}>
          Creative Website Designs That Make an Impact
        </h2>

        <h2 style={seoHeadingStyle}>Explore Our Website Design Work</h2>

        <h3 style={seoHeadingStyle}>Business Websites</h3>
        <h3 style={seoHeadingStyle}>E-commerce Websites</h3>
        <h3 style={seoHeadingStyle}>Corporate Websites</h3>
        <h3 style={seoHeadingStyle}>Custom Website Designs</h3>

        <h2 style={seoHeadingStyle}>
          Websites Designed Around Your Brand
        </h2>

        <h2 style={seoHeadingStyle}>Our Approach to Website Design</h2>

        <h3 style={seoHeadingStyle}>Understanding Your Business</h3>
        <h3 style={seoHeadingStyle}>Creating a Better User Experience</h3>
        <h3 style={seoHeadingStyle}>Designing for Performance</h3>

        <h2 style={seoHeadingStyle}>Let’s Build Your Next Website</h2>
      </div>
    </main>
  );
}

export default page;
