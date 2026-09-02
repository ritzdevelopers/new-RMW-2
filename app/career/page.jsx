import React from 'react'
import Header from '../common/Header'
import Section1 from '../component/career/section1'
import SeoHeadings from '../component/career/seoHeadings'
import Footer from '../component/latest/Footer'
import OverlaySection2 from '../component/latest/OverlaySection2'

export const metadata = {
  title: 'Ritz Media World Careers & Jobs in Noida | Join Our Team',
  description: 'Explore career opportunities at Ritz Media World in Noida. Join our creative team in media, marketing, content, design, strategy and more. Apply now.',
  alternates: {
    canonical: "https://ritzmediaworld.com/career",
  },
};

const Career = () => {
  return (
    <>
      <Header />
      <Section1 />
      <Footer section={ <OverlaySection2 />} />
      <SeoHeadings />
    </>
  )
}
export default Career;


