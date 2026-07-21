import React from "react";
import Header from "@/app/component/social-media/Header";
import Hero from "@/app/component/social-media/Hero";
import Section2 from "@/app/component/social-media/Section2";
import Section3 from "@/app/component/social-media/Section3";
import Section4 from "@/app/component/social-media/Section4";
import Section5 from "@/app/component/social-media/Section5";
import Section6 from "@/app/component/social-media/Section6";
import Section8 from "@/app/component/social-media/Section8";
import Section10 from "@/app/component/social-media/Section10";
import DynamicSlider from "@/app/component/social-media/DynamicSlider";

/** Webflow Editor's Note Light custom font stack */
const editorsNoteLight =
  "wfont_e6fa52_d03d36fc891b44ea946b083dc8504aac, wf_d03d36fc891b44ea946b083dc, orig_editors_note_light, serif";

const brand_film_images = [
  {
    src: "/brand-film/brand-film-1.jpg",
    label: "Brand Film 1",
    href: "https://youtu.be/iiEgYU72mWg",
  },
  {
    src: "/brand-film/brand-film-2.jpg",
    label: "Brand Film 2",
    href: "https://youtu.be/X-i-iN7urcM",
  },
  {
    src: "/brand-film/brand-film-3.jpg",
    label: "Brand Film 3",
    href: "https://youtu.be/OT4Dc214r3Q",
  },
  {
    src: "/brand-film/brand-film-4.jpg",
    label: "Brand Film 4",
    href: "https://youtu.be/-ih5T6UnZBw",
  },
  {
    src: "/brand-film/brand-film-5.jpg",
    label: "Brand Film 5",
    href: "https://youtu.be/Lp3i_u7O79o",
  },
  {
    src: "/brand-film/brand-film-6.jpg",
    label: "Brand Film 6",
    href: "https://youtu.be/a1Q9U0ezsyQ",
  },
];

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
    canonical: "https://ritzmediaworld.com/portfolio/ai-videos",
  },
};

function page() {
  return (
    <main style={{ fontFamily: editorsNoteLight }}>
      <Header title="AI Videos Portfolio" />
      <Hero title="Bringing stories to motion & ideas to screen<br />with AI-Powered Video Creation" />
      <DynamicSlider heading="Brand Films" images={brand_film_images} />
      {/* <Section3 />  */}
      {/* <Section4 />  */}
      <DynamicSlider heading="Walk-Through Videos" images={walkthrough_images} />
      {/* <Section5 />  */}
      {/* <Section6 /> */}
      {/* <Section8 /> */}
      <Section10 />
    </main>
  );
}

export default page;
