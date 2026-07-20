import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Section1 from '../component/blog/Section1'
import Section7 from '../component/about/Section7'
import Section2 from '../component/blog/Section2'
import Section3 from '../component/blog/Section3'
import Section4 from '../component/blog/Section4'

export const metadata = {
  title: 'Insights & Marketing Trends | Ritz Media World Blog Delhi NCR',
  description:
    'Explore expert blogs from Ritz Media World covering advertising trends, creative campaigns, brand strategy, and the future of digital marketing.',
  keywords: [
    'advertising insights',
    'branding articles',
    'digital marketing tips',
    'marketing trends India',
    'marketing agency blogs',
    'brand strategy blog',
    'advertising trends',
    'creative marketing ideas',
    'digital marketing insights',
    'brand strategy',
    'media agency blog',
    'marketing innovations',
    'Digital Marketing Agency in Delhi NCR',
    'Best digital marketing agency in Delhi NCR',
    'Best digital marketing agency in Delhi',
    'Best ad agency',
    'social media marketing agency',
    'content marketing agency',
    'Creative service',
    'best ad agencies',
    'print advertising services',
    'best print advertising services',
    'Radio advertising agency',
  ],
  authors: [{ name: 'Ritz Media World' }],
  publisher: 'Ritz Media World',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://ritzmediaworld.com/blog',
  },
  openGraph: {
    title: 'Insights & Marketing Trends | Ritz Media World Blog Delhi NCR',
    description:
      'Explore expert blogs from Ritz Media World covering advertising trends, creative campaigns, brand strategy, and the future of digital marketing.',
    url: 'https://ritzmediaworld.com/blog',
    siteName: 'Ritz Media World',
    locale: 'en',
    type: 'website',
  },
}

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