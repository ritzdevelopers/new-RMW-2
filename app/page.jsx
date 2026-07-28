import Header from "./common/Header";
import Footer from "./component/latest/Footer";
import OverlaySection1 from "./component/latest/OverlaySection1";
import Section1 from "./component/home/Section1";
import Section2 from "./component/home/Section2";
import Section3 from "./component/home/Section3";
import Section4 from "./component/home/Section4";
import Section5 from "./component/home/Section5";
import WebLoader from "./component/loader/WebLoader";

const serviceHeadings = [
  "Branding & Creative Solutions",
  "Digital Marketing",
  "Performance Marketing",
  "Website Design & Development",
  "SEO Services",
  "Social Media Marketing",
  "Media Planning & Buying",
  "Print Advertising",
  "Radio Advertising",
  "Outdoor Advertising (OOH)",
  "Influencer & Celebrity Marketing",
  "Video Production & Brand Films",
  "3D Rendering & Visualization",
];

const pageHeadings = [
  "Industries We Empower",
  "Our Work",
  "Success Stories",
  "Why Choose Ritz Media World?",
  "Brands We Have Worked With",
  "What Our Clients Say",
  "Awards & Recognitions",
  "Insights & Resources",
  "Frequently Asked Questions",
  "Let's Build Your Brand Together",
];

const HOME_VIDEO_SRC =
  "https://otherassets.blob.core.windows.net/rmw/home-website.mp4";
const SECTION3_VIDEO_SRC =
  "https://otherassets.blob.core.windows.net/rmw/home-section2.mp4";

export default function Home() {
  return (
    <WebLoader>
      {/* Start hero videos fetch as early as possible (during loader). */}
      <link rel="preconnect" href="https://otherassets.blob.core.windows.net" />
      <link
        rel="preload"
        as="video"
        href={HOME_VIDEO_SRC}
        type="video/mp4"
      />
      <link
        rel="preload"
        as="video"
        href={SECTION3_VIDEO_SRC}
        type="video/mp4"
      />
      <Header />
      <Section1 />
      <Section2 />
      {/* SEO heading hierarchy — present in source, hidden visually */}
      <div className="sr-only">
        <h2>Our Services</h2>
        {serviceHeadings.map((title) => (
          <h3 key={title}>{title}</h3>
        ))}
        {pageHeadings.map((title) => (
          <h2 key={title}>{title}</h2>
        ))}
      </div>
      <Section3 />
      <Section4 />
      <div className="relative">
        <Section5 />
      </div>
      <Footer section={<OverlaySection1 />} />
    </WebLoader>
  );
}
