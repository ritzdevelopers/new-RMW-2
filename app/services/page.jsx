import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import ServicesHero from "../component/services/ServicesHero";
import ServicesGrid from "../component/services/ServicesGrid";
import Section7 from "../component/about/Section7";

export const metadata = {
  title: "Services | Ritz Media World",
  description:
    "Explore Ritz Media World services — digital marketing, creative, content, print, web, and influencer campaigns tailored to transform your brand.",
};

const ServicesPage = () => {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        <ServicesGrid />
        <Section7 />
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;
