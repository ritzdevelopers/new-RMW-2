import React from "react";
import Header from "../common/Header";
import Section1 from "../component/contact/Section1";
import Footer from "../component/latest/Footer";
import OverlaySection2 from "../component/latest/OverlaySection2";

export const metadata = {
  title: "Contact Ritz Media World | Let's Grow Your Business",
  description:
    "Have a project in mind? Get in touch with Ritz Media World to discuss your digital marketing, SEO, branding or performance marketing needs.",
  alternates: {
    canonical: "https://ritzmediaworld.com/contact",
  },
};

function ContactPageSeoHeadings() {
  return (
    <div className="sr-only">
      <h1>Contact Ritz Media World</h1>
      <h2>Let's Talk About Your Project</h2>
      <h2>Get in Touch With Our Team</h2>
      <h2>Start Your Project With Us</h2>
    </div>
  );
}

const Contact = () => {
  return (
    <>
      <Header />
      <ContactPageSeoHeadings />
      <div className="overflow-x-hidden relative z-10 bg-[#0D1334]">
        <Section1 />
      </div>
      <Footer section={<OverlaySection2 />} />
    </>
  );
};

export default Contact;
