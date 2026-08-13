import React from "react";
import Header from "@/app/component/social-media/Header";
import Hero from "@/app/component/social-media/Hero";
import Section10 from "@/app/component/social-media/Section10";
import DynamicSlider from "@/app/component/social-media/DynamicSlider";
import Section2 from "@/app/component/work/portfolio/Section2";
/** Webflow Editor's Note Light custom font stack */
const editorsNoteLight =
  "wfont_e6fa52_d03d36fc891b44ea946b083dc8504aac, wf_d03d36fc891b44ea946b083dc, orig_editors_note_light, serif";
const ooh_images = [
  "/portfolio-page/creatives/ooh_i1.jpg",
  "/portfolio-page/creatives/ooh_i2.jpg",
  "/portfolio-page/creatives/ooh_i3.jpg",
  "/portfolio-page/creatives/ooh_i4.jpg",
  "/portfolio-page/creatives/ooh_i5.jpg",
  "/portfolio-page/creatives/ooh_i6.jpg",
  "/portfolio-page/creatives/ooh_i7.jpg",
  "/portfolio-page/creatives/ooh_i8.jpg",
  "/portfolio-page/creatives/ooh_i9.jpg",
  "/portfolio-page/creatives/ooh_i10.jpg",
  "/portfolio-page/creatives/ooh_i11.jpg",
  "/portfolio-page/creatives/ooh_i12.jpg",
];

const stationary_images = [
  "/portfolio-page/creatives/stationary_i1.jpg",
  "/portfolio-page/creatives/stationary_i2.jpg",
  "/portfolio-page/creatives/stationary_i3.jpg",
  "/portfolio-page/creatives/stationary_i4.jpg",
  "/portfolio-page/creatives/stationary_i5.jpg",
  "/portfolio-page/creatives/stationary_i6.jpg",
  "/portfolio-page/creatives/stationary_i7.jpg",
  "/portfolio-page/creatives/stationary_i8.jpg",
  "/portfolio-page/creatives/stationary_i9.jpg",
  "/portfolio-page/creatives/stationary_i10.jpg",
  "/portfolio-page/creatives/stationary_i11.jpg",
  "/portfolio-page/creatives/stationary_i12.jpg",
  "/portfolio-page/creatives/stationary_i13.jpg",
  "/portfolio-page/creatives/stationary_i14.jpg",
];

const paper_prints = [
  "/portfolio-page/creatives/paper_prints_i1.jpg",
  "/portfolio-page/creatives/paper_prints_i2.jpg",
  "/portfolio-page/creatives/paper_prints_i3.jpg",
  "/portfolio-page/creatives/paper_prints_i4.jpg",
  "/portfolio-page/creatives/paper_prints_i5.jpg",
  "/portfolio-page/creatives/paper_prints_i6.jpg",
  "/portfolio-page/creatives/paper_prints_i7.jpg",
  "/portfolio-page/creatives/paper_prints_i8.jpg",
  "/portfolio-page/creatives/paper_prints_i9.jpg",
  "/portfolio-page/creatives/paper_prints_i10.jpg",
];

const brochures_adaptations_images = [
  "/portfolio-page/creatives/brochures_adaptations_i1.jpg",
  "/portfolio-page/creatives/brochures_adaptations_i2.jpg",
  "/portfolio-page/creatives/brochures_adaptations_i3.jpg",
  "/portfolio-page/creatives/brochures_adaptations_i4.jpg",
  "/portfolio-page/creatives/brochures_adaptations_i5.jpg",
  "/portfolio-page/creatives/brochures_adaptations_i6.jpg",
];

const social_media_creatives_images = [
  "/portfolio-page/creatives/social_media_creatives_i1.jpg",
  "/portfolio-page/creatives/social_media_creatives_i2.jpg",
  "/portfolio-page/creatives/social_media_creatives_i3.jpg",
  "/portfolio-page/creatives/social_media_creatives_i4.jpg",
  "/portfolio-page/creatives/social_media_creatives_i5.jpg",
  "/portfolio-page/creatives/social_media_creatives_i6.jpg",
];

export const metadata = {
  alternates: {
    canonical: "https://ritzmediaworld.com/portfolio/creative",
  },
};

function page() {
  return (
    <main style={{ fontFamily: editorsNoteLight }}>
      <Header title="Creative Design Portfolio" />
      <Hero title="Bringing ideas to life & shaping bold brands<br />with Creative Design" />
      {/* <Section2 />  */}
      {/* <Section3 />  */}
      
      <DynamicSlider heading="Stationary Creative" images={stationary_images}/>
      <DynamicSlider heading="OOH Creative" images={ooh_images}/>
      {/* <Section5 /> */}
      <DynamicSlider heading="Print Creative" images={paper_prints}/>
      {/* <Section6 />  */}
      <DynamicSlider heading="Social Media Creative" images={social_media_creatives_images}/>
      {/* <Section8 /> */}
      <DynamicSlider heading="Brochure Creative" images={brochures_adaptations_images}/>
      <Section2 />
      <Section10 />
    </main>
  );
}

export default page;
