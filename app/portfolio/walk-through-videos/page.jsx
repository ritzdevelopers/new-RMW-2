import React from "react";
import Header from "@/app/component/social-media/Header";
import Hero from "@/app/component/social-media/Hero";
import Section10 from "@/app/component/social-media/Section10";
import DynamicSlider from "@/app/component/social-media/DynamicSlider";

import Section2 from "@/app/component/work/portfolio/Section2";
/** Webflow Editor's Note Light custom font stack */
const editorsNoteLight =
  "wfont_e6fa52_d03d36fc891b44ea946b083dc8504aac, wf_d03d36fc891b44ea946b083dc, orig_editors_note_light, serif";

const walkthrough_images = [
  {
    src: "/walkthrough/Walkthrougg-image-1.jpg",
    label: "Walkthrough 1",
    href: "https://youtu.be/LMz36aAXPus",
  },
  {
    src: "/walkthrough/walkthrough-image-2.jpg",
    label: "Walkthrough 2",
    href: "https://youtu.be/qWkW1VoC1Sk",
  },
  {
    src: "/walkthrough/walkthrough-image-3.jpg",
    label: "Walkthrough 3",
    href: "https://youtu.be/30CNbp-KwY4",
  },
  {
    src: "/walkthrough/walkthrough-image-4.jpg",
    label: "Walkthrough 4",
    href: "https://youtu.be/PW4wdsxYFMU",
  },
  {
    src: "/walkthrough/walkthrought-image-5.jpg",
    label: "Walkthrough 5",
    href: "https://youtu.be/kzE_FfxJrdM",
  },
  {
    src: "/walkthrough/walk-throught-6.jpg",
    label: "Walkthrough 6",
    href: "https://youtu.be/SA4H1oMFQOU",
  },
];

export const metadata = {
  alternates: {
    canonical: "https://ritzmediaworld.com/portfolio/walk-through-videos",
  },
};

function page() {
  return (
    <main style={{ fontFamily: editorsNoteLight }}>
      <Header title="Walk-Through Videos" />
      <Hero title="Bringing stories to motion & ideas to screen<br />with AI-Powered Video Creation" />
     
 
    <DynamicSlider
        heading="Walk-Through Videos"
        images={walkthrough_images}
      /> 

      <Section2 />
      <Section10 />
    </main>
  );
}

export default page;
