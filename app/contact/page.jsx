import React from 'react'
import Header from '../common/Header'
import Section1 from '../component/contact/Section1'
import Section2 from '../component/contact/Section2'
import Footer from '../common/Footer'

const Contact = () => {
  return (
    <>
      <Header />
      <div className="overflow-x-hidden relative z-10 bg-[#0D1334]">
        <Section1 />
      </div>
      <Footer overlaySection={<Section2 />} />
    </>
  )
}

export default Contact