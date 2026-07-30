import React from "react";
import Section1 from "@/app/component/work/portfolio/Section1";
import Section2 from "@/app/component/work/portfolio/Section2";
// import Section3 from '@/app/component/work/portfolio/Section3'
import Service4 from "@/app/component/work/portfolio/Service4";
import { getPortfolioPageSeoHeadings } from "@/data/portfolioSeoHeadings";

export const metadata = {
  title: "Portfolio | Creative Work & Case Studies | Ritz Media World",
  description:
    "Explore Ritz Media World's portfolio of brand identity, creative design, website design, brand films, walk-through videos, and influencer marketing campaigns.",
};

function PortfolioPageSeoHeadings() {
  const seo = getPortfolioPageSeoHeadings();
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

function Page() {
  return (
    <>
      <PortfolioPageSeoHeadings />
      <Section1 />
      <Section2 />
      <Service4 />
      {/* <Section3 />  */}
    </>
  );
}

export default Page;
