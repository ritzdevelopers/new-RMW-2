import React from 'react'
import Header from '../common/Header'
import Section1 from '../component/about/section1'
import Section2 from '../component/about/section2'
import Footer from '../common/Aboutfooter'
import Section3 from '../component/about/Section3'
import Section4 from '../component/about/section4'
import Section5 from '../component/about/Section5'
import Section6 from '../component/about/Section6'
import Section7 from '../component/about/Section7'

const About = () => {
  return (
            <>
            <Header />
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
            {/* <Section7 /> */}
            {/* <Footer /> */}
            <Footer overlaySection={<Section7 />} />  
            </>
  )
}

export default About