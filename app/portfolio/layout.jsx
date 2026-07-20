import React from "react";
import Header from "@/app/common/Header";
import Footer from "@/app/component/latest/Footer";
import OverlaySection1 from "@/app/component/latest/OverlaySection1";

export default function PortfolioLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer section={<OverlaySection1 />} />
    </>
  );
}