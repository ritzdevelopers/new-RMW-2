import React from 'react'
import Section1 from '../component/gallery/section1'
import Header from '../common/Header'
import Footer from '../component/latest/Footer'
import Section2 from '../component/gallery/section2'
import OverlaySection1 from '../component/latest/OverlaySection1'

export const metadata = {
  title: 'Gallery | Explore Our Creative Work & Memories | Ritz Media World',
  description:
    'Explore Ritz Media World’s gallery featuring creative campaigns, branding projects, digital work, team moments and memorable experiences from our journey.',
  alternates: {
    canonical: 'https://ritzmediaworld.com/gallery',
  },
}

const page = () => {
  return (
    <>
      <Header />

      <Section1 />
      <Section2 />
      
      {/* SEO Content - Hidden from UI */}
      <div
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        <h2>Ritz Media World Gallery</h2>
        <h2>Our Creative Work</h2>
        <h2>Our Portfolio</h2>
        <h2>Behind the Scenes</h2>
        <h2>Team & Memorable Moments</h2>
        <h2>Explore Our Work</h2>
      </div>

      <Footer section={<OverlaySection1 />} />
    </>
  )
}

export default page