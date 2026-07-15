import React from "react";
import Header from "@/app/component/social-media/Header";
import Hero from "@/app/component/social-media/Hero";
import Section2 from "@/app/component/social-media/Section2";
import Section3 from "@/app/component/social-media/Section3"; 
import Section5 from "@/app/component/social-media/Section5";
import Section6 from "@/app/component/social-media/Section6";
import Section8 from "@/app/component/social-media/Section8";
import Section10 from "@/app/component/social-media/Section10";
import DynamicSlider from "@/app/component/social-media/DynamicSlider";

/** Webflow Editor's Note Light custom font stack */
const editorsNoteLight =
  "wfont_e6fa52_d03d36fc891b44ea946b083dc8504aac, wf_d03d36fc891b44ea946b083dc, orig_editors_note_light, serif";

function page() {
  return (
    <main style={{ fontFamily: editorsNoteLight }}>
      <Header />
      <Hero />
      {/* <Section2 />  */}
      <DynamicSlider heading="Stationary Creative" />
      <Section3 />
      <DynamicSlider heading="OOH" />
      <Section5 />
      <DynamicSlider heading="Print" />
      <Section6 />
      <DynamicSlider heading="Social Media" />
      <Section8 />
      <DynamicSlider heading="Brochure" />
      <Section10 />
    </main>
  );
}

export default page;
