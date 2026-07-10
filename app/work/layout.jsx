import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Section7 from "../component/about/Section7";
import WorkSmoothScroll from "../component/work/WorkSmoothScroll";

export default function WorkLayout({ children }) {
  return (
    <WorkSmoothScroll>
      <div className="overflow-x-clip">
        <Header />
        <main className="relative overflow-x-clip">{children}</main>
        <Footer overlaySection={<Section7 />} />
      </div>
    </WorkSmoothScroll>
  );
}
