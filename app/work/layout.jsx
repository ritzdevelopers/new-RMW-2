import React from "react";
import Header from "../common/Header";
import Footer from "../component/latest/Footer";
import OverlaySection1 from "../component/latest/OverlaySection1";

export default function WorkLayout({ children }) {
  return (
    <div className="overflow-x-clip">
      <Header />
      <main className="relative overflow-x-clip">{children}</main>
      <Footer section={<OverlaySection1 />} />
    </div>
  );
}
