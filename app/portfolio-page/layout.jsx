import React from "react";
import Header from "@/app/common/Header";
import Footer from "@/app/common/Footer";

export default function PortfolioLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}