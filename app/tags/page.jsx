import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Section7 from "../component/about/Section7";
import TagsQueryPage from "../component/case-study/TagsQueryPage";

export const metadata = {
  title: "Tags | Ritz Media World",
};

export default function TagsPage() {
  return (
    <>
      <Header />
      <main>
        <TagsQueryPage />
      </main>
      <Footer overlaySection={<Section7 />} />
    </>
  );
}
