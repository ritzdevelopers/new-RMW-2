import Link from "next/link";
import Header from "./common/Header";
import Footer from "./component/latest/Footer";
import OverlaySection1 from "./component/latest/OverlaySection1";

export const metadata = {
  title: "Page Not Found | Ritz Media World",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

const sequelFontFamily = '"Sequel Sans", sans-serif';

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative min-h-[calc(100dvh-5.5rem)] overflow-hidden bg-[#0D1334] px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-12 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#F5A623]/10 blur-3xl md:h-96 md:w-96"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 rounded-full bg-white/5 blur-3xl md:h-72 md:w-72"
        />

        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <p
            className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50"
            style={{ fontFamily: sequelFontFamily }}
          >
            Error 404
          </p>

          <h1
            className="mb-6 text-[72px] leading-none text-white sm:text-[96px] md:text-[120px] lg:text-[148px]"
            style={{
              fontFamily: sequelFontFamily,
              fontWeight: 500,
              letterSpacing: "-0.04em",
            }}
          >
            404
          </h1>
          <h2
            className="mb-4 max-w-2xl text-[28px] leading-tight text-white sm:text-[36px] md:text-[44px]"
            style={{
              fontFamily: sequelFontFamily,
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            This page could not be found
          </h2>

          <p
            className="mb-10 max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
            style={{ fontFamily: sequelFontFamily, fontWeight: 400 }}
          >
            Looks like you followed a broken or outdated link. Head back home or
            explore our services, portfolio, and latest work.
          </p>

          <div classNa me="mb-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-[#E2E2E2] px-8 py-4 text-xs uppercase tracking-[0.12em] text-[#0D1334] transition hover:bg-white"
              style={{ fontFamily: sequelFontFamily, fontWeight: 500 }}
            >
              Back to Home
              <i className="ri-arrow-right-line text-lg" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/25 px-8 py-4 text-xs uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white/5"
              style={{ fontFamily: sequelFontFamily, fontWeight: 500 }}
            >
              Contact Us
              <i className="ri-mail-line text-lg" aria-hidden />
            </Link>
          </div>

          <div className="w-full max-w-3xl border-t border-white/10 pt-8">
            <p
              className="mb-5 text-xs uppercase tracking-[0.18em] text-white/45"
              style={{ fontFamily: sequelFontFamily }}
            >
              Popular pages
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-[0.08em] text-white/70 transition hover:text-[#F5A623]"
                  style={{ fontFamily: sequelFontFamily, fontWeight: 500 }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </main>
      <Footer section={<OverlaySection1 />} />
    </>
  );
}