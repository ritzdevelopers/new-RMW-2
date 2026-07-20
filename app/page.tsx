import Header from "./common/Header";
import Footer from "./component/latest/Footer";
import OverlaySection1 from "./component/latest/OverlaySection1";
import Section7 from "./component/about/Section7";
import Section1 from "./component/home/Section1";
import Section2 from "./component/home/Section2";
import Section3 from "./component/home/Section3";
import Section4 from "./component/home/Section4";
import Section5 from "./component/home/Section5";
import WebLoader from "./component/loader/WebLoader";

export default function Home() {
  return (
    <WebLoader>
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <div className="relative">
        <Section5 />
      </div>
      <Footer section={<OverlaySection1 />} />
    </WebLoader>
  );
}
