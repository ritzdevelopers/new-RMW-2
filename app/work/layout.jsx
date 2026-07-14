import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Section7 from "../component/about/Section7";

export default function WorkLayout({ children }) {
  return (
    <div className="overflow-x-clip">
      <Header />
      <main className="relative overflow-x-clip">{children}</main>
      <Footer overlaySection={<Section7 />} />
    </div>
  );
}
