import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Section7 from "../component/about/Section7";
import Section1 from "../component/web-stories/Section1";

export const metadata = {
  title: "Web Stories | Ritz Media World",
  description:
    "Explore Ritz Media World web stories — newspaper ads, FM radio, creative agency insights, and more.",
};

const WebStoriesPage = () => {
  return (
    <>
      <Header />
      <main>
        <Section1 />
      </main>
      <Footer overlaySection={<Section7 />} />
    </>
  );
};

export default WebStoriesPage;
