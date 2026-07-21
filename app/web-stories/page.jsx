import React from "react";
import Header from "../common/Header";
import Footer from "../component/latest/Footer";
import OverlaySection1 from "../component/latest/OverlaySection1";
import Section1 from "../component/web-stories/Section1";

export const metadata = {
  title: "Web Stories | Ritz Media World",
  description:
    "Explore Ritz Media World web stories - newspaper ads, FM radio, creative agency insights, and more.",
  alternates: {
    canonical: "https://ritzmediaworld.com/web-stories",
  },
};

const WebStoriesPage = () => {
  return (
    <>
      <Header />
      <main>
        <Section1 />
      </main>
      <Footer section={<OverlaySection1 />} />
    </>
  );
};

export default WebStoriesPage;
