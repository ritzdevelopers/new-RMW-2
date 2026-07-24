import dynamic from "next/dynamic";
import Header from "./common/Header";
import Section1 from "./component/home/Section1";
import WebLoader from "./component/loader/WebLoader";

const Section2 = dynamic(() => import("./component/home/Section2"), {
  ssr: true,
  loading: () => <div className="relative w-full bg-[#0F0E14] px-8 py-[35px] md:px-12 md:py-[70px]" aria-hidden />,
});

const Section3 = dynamic(() => import("./component/home/Section3"), {
  ssr: true,
  loading: () => <div className="w-full bg-black" aria-hidden />,
});

const Section4 = dynamic(() => import("./component/home/Section4"), {
  ssr: true,
});

const Section5 = dynamic(() => import("./component/home/Section5"), {
  ssr: true,
});

const Footer = dynamic(() => import("./component/latest/Footer"), {
  ssr: true,
});

const OverlaySection1 = dynamic(
  () => import("./component/latest/OverlaySection1"),
  { ssr: true },
);

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
