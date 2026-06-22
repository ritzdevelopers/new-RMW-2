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
    <div className="overflow-x-clip">
      <Header />
      <div className="relative overflow-x-clip">
        <ServicesHero />
        <ServicesGrid />
      </div>
      <Footer overlaySection={<Section7 />} />
    </div>
  );
};

export default ServicesPage;
