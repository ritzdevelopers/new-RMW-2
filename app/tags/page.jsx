import React from "react";
import Header from "../common/Header";
import Footer from "../component/latest/Footer";
import OverlaySection1 from "../component/latest/OverlaySection1";
import TagsQueryPage from "../component/case-study/TagsQueryPage";

export const metadata = {
  title: "Tags | Ritz Media World",
  alternates: {
    canonical: "https://ritzmediaworld.com/tags",
  },
};

export default function TagsPage() {
  return (
    <>
      <Header />
      <main>
        <TagsQueryPage />
      </main>
      <Footer section={<OverlaySection1 />} />
    </>
  );
}
