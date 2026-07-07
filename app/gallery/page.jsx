import React from 'react'
import Section1 from '../component/gallery/section1'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Section7 from '../component/about/Section7'
import Section2 from '../component/gallery/section2'
import Section3 from '../component/gallery/section3'
const page = () => {
  return (
    <>
    <Header/>
    <Section1/>
    <Section2/>
    <Section3/>
    <Footer overlaySection={<Section7 />} />
    </>
  )
}

export default page