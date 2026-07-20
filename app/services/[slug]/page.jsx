import React from "react";
import { notFound } from "next/navigation";
import Header from "../../common/Header";
import Footer from "../../component/latest/Footer";
import OverlaySection1 from "../../component/latest/OverlaySection1";
import ServicesHero from "../../component/services/ServicesHero";
import ServiceDetailIntro from "../../component/services/ServiceDetailIntro";
import ServiceDetailCarousel from "../../component/services/ServiceDetailCarousel";
import ServiceDetailMediaSection from "../../component/services/ServiceDetailMediaSection";
import ServiceDetailContent from "../../component/services/ServiceDetailContent";
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
        {!service.intro ? (
          <ServicesHero
            lineOne={service.title}
            singleLine
            subtext={[service.description]}
            subtextItalic={false}
          />
        ) : null}
        {service.intro ? (
          <ServiceDetailIntro
            intro={service.intro}
            activeSlug={service.slug}
            title={service.title}
          />
        ) : null}
        {service.carousel ? (
          <ServiceDetailCarousel carousel={service.carousel} serviceSlug={service.slug} />
        ) : null}
        {service.mediaSection ? (
          <ServiceDetailMediaSection mediaSection={service.mediaSection} />
        ) : null}
        <ServiceDetailContent service={service} />
      <Footer section={<OverlaySection1 />} />
    </>
  );
}
