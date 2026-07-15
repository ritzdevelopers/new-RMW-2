import React from "react";
import Header from "@/app/common/Header";
import Footer from "@/app/common/Footer";
import Section7 from "@/app/component/about/Section7";

export default function PortfolioLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer overlaySection={<Section7 />} />
    </>
  );
}