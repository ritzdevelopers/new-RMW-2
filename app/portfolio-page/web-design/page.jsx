import React from "react";
import Header from "@/app/component/social-media/Header";
import Hero from "@/app/component/social-media/Hero";
import Section10 from "@/app/component/social-media/Section10";
import DynamicSlider from "@/app/component/social-media/DynamicSlider";

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
    src: "/portfolio-website/website-5.jpg",
    fullSrc: "/portfolio-website/website-5-full-image.jpg",
    label: "Website 5",
  },
  {
    src: "/portfolio-website/website-6.jpg",
    fullSrc: "/portfolio-website/website-6-full-image.jpg",
    label: "Website 6",
  },
];

function page() {
  return (
    <main style={{ fontFamily: editorsNoteLight }}>
      <Header />
      <Hero />
      <DynamicSlider heading="Web Design" images={website_images} />
      <Section10 />
    </main>
  );
}

export default page;
