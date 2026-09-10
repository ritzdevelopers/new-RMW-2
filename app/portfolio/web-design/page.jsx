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
  title: "Web Design Portfolio | Creative Website Designs by Ritz Media World",
  description:
    "Explore our web design portfolio featuring creative, responsive, and user-friendly websites designed to help brands build a strong online presence.",
  keywords: [
    "Web Design Portfolio",
    "Website Design Portfolio",
    "Website Design Projects",
    "Creative Website Design",
    "Responsive Web Design",
    "Custom Website Design",
  ],
  alternates: {
    canonical: "https://ritzmediaworld.com/portfolio/web-design",
  },
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
      <div className="sr-only">
        <h2>Our Website Design Projects</h2>
        <h2>Creative & Custom Web Design</h2>
        <h2>Our Web Design Approach</h2>
        <h2>Why Choose Ritz Media World?</h2>
        <h2>Let’s Build Your Website</h2>
      </div>
    </main>
  );
}

export default page;
