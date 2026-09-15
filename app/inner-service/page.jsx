import InnerService from '@/components/inner-service/InnerService'
import Header from '../common/Header'
import Footer from '../component/latest/Footer'
import React from 'react'
import OverlaySection1 from '../component/latest/OverlaySection1'

const page = () => {
  return (
    <>
    <Header />
   
      <InnerService />
      <Footer section={<OverlaySection1 />} />
    </>
  )
}

export default page