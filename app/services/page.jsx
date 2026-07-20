import React from "react";
import Header from "../common/Header";
import Footer from "../component/latest/Footer";
import OverlaySection1 from "../component/latest/OverlaySection1";
import ServicesHero from "../component/services/ServicesHero";
import ServicesGrid from "../component/services/ServicesGrid";

export const metadata = {
  title: "Services | Ritz Media World",
  description:
    "Explore Ritz Media World services — digital marketing, creative, content, print, web, and influencer campaigns tailored to transform your brand.",
};

const ServicesPage = () => {
  return (
    <>
      <Header />
      <ServicesHero />
      <ServicesGrid />
      <Footer section={<OverlaySection1 />} />
    </>
  );
};

export default ServicesPage;
