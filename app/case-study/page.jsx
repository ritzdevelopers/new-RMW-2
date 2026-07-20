import React from "react";
import Header from "../common/Header";
import Footer from "../component/latest/Footer";
import OverlaySection1 from "../component/latest/OverlaySection1";
import CaseStudyHero from "../component/case-study/CaseStudyHero";
import CaseStudyIntro from "../component/case-study/CaseStudyIntro";
import CaseStudyStack from "../component/case-study/CaseStudyStack";

export const metadata = {
  title: "Case Studies | Ritz Media World",
  description:
    "Explore Ritz Media World case studies — bold design, brand films, and campaigns that defy convention.",
};

const CaseStudyPage = () => {
  return (
    <>
      <Header />
      <main>
        <CaseStudyHero />
        <CaseStudyIntro />
        <CaseStudyStack />
      </main>
      <Footer section={<OverlaySection1 />} />
    </>
  );
};

export default CaseStudyPage;
