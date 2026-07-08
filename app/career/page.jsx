import React from 'react'
import Header from '../common/Header'
import Section1 from '../component/career/section1'
import Footer from '../common/Footer'
import Section7 from '../component/about/Section7'
import Section2 from '../component/career/section2'

const Career = () => {
  return (
    <>
      <Header />
      <Section1 />
     
      <Footer overlaySection={ <Section2 />} />
    </>
  )
}

export default Career

