import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Section1 from '../component/blog/Section1'
import Section7 from '../component/about/Section7'
import Section2 from '../component/blog/Section2'
import Section3 from '../component/blog/Section3'
import Section4 from '../component/blog/Section4'

const page = () => {
  return (
            <>
            <Header />
           <Section1/>
           <Section2/>
           <Section3/>
           <Section4/>
           <Footer overlaySection={<Section7 />} />
            </>
  )
}

export default page