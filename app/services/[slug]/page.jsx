import React from "react";
import { notFound } from "next/navigation";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import ServicesHero from "../../component/services/ServicesHero";
import ServiceDetailContent from "../../component/services/ServiceDetailContent";
import Section7 from "../../component/about/Section7";
import { getServiceBySlug, services } from "../../../data/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found | Ritz Media World" };
  }

  return {
    title: `${service.title} | Ritz Media World`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <ServicesHero
          lineOne={service.title}
          subtext={[service.description]}
          subtextItalic={false}
        />
        <ServiceDetailContent service={service} />
        <Section7 />
      </main>
      <Footer />
    </>
  );
}
