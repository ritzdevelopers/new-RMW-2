import React from "react";
import dynamic from "next/dynamic";
import { preload } from "react-dom";
import Header from "../common/Header";
import ServicesHero from "../component/services/ServicesHero";
import ServicesGrid from "../component/services/ServicesGrid";
import { getServicesPageSeoHeadings } from "../../data/serviceSeoHeadings";

const Footer = dynamic(() => import("../component/latest/Footer"));
const OverlaySection1 = dynamic(() => import("../component/latest/OverlaySection1"));

export const metadata = {
  title: "Advertising & Digital Services | Ritz Media World Delhi-NCR",
  description:
    "Discover Ritz Media World's full-service solutions in digital, print, radio and creative advertising designed to grow your brand and drive real results.",
};

function ServicesPageSeoHeadings() {
  const seo = getServicesPageSeoHeadings();
  if (!seo) return null;

  return (
    <div className="sr-only">
      {seo.h1.map((title) => (
        <h1 key={title}>{title}</h1>
      ))}
      {seo.sections.map((section) => (
        <React.Fragment key={section.h2}>
          <h2>{section.h2}</h2>
          {section.h3?.map((title) => (
            <h3 key={`${section.h2}-${title}`}>{title}</h3>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

const ServicesPage = () => {
  preload("/services/Digital.jpg", { as: "image", fetchPriority: "high" });

  return (
    <>
      <Header />
      <ServicesPageSeoHeadings />
      <ServicesHero />
      <ServicesGrid />
      <Footer section={<OverlaySection1 />} />
    </>
  );
};

export default ServicesPage;
