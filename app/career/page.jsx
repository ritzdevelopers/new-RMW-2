import React from 'react'
import Header from '../common/Header'
import Section1 from '../component/career/section1'
import Footer from '../component/latest/Footer'
import OverlaySection2 from '../component/latest/OverlaySection2'

export const metadata = {
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
    </>
  )
}
export default Career


