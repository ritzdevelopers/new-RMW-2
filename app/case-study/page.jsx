import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import CaseStudyHero from "../component/case-study/CaseStudyHero";
import CaseStudyIntro from "../component/case-study/CaseStudyIntro";
import CaseStudyStack from "../component/case-study/CaseStudyStack";
import Section7 from "../component/about/Section7";

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
        <Section7 />
      </main>
      <Footer />
    </>
  );
};

export default CaseStudyPage;
