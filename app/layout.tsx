import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ritzmediaworld.com/"),
  title: "Ritz Media World: Creative + Strategy + Media Agency",
  description:
    "Top advertising agency in Delhi NCR. Ritz media world offer SEO, radio, creative print ads services in Greater Noida. Most trusted digital marketing company.",
  keywords: [
    "Best advertising agency in Delhi NCR",
    "Top Advertising Agency",
    "Advertising Agency in Delhi",
    "Best Advertising Agency in Delhi NCR",
    "Ads Agency in Delhi NCR",
    "Best ad agency in Delhi",
    "Best ad agency in Noida",
    "ad agency in Noida",
    "ad agency in Delhi",
    "ad agency in Delhi NCR",
    "Digital marketing agency",
    "Creative Agency",
    "Branding agency In Delhi",
    "Branding agency In Noida",
    "Branding agency In Delhi NCR",
    "Creative Advertising Agency",
    "Social Media Marketing Agency",
    "Content Marketing Agency",
    "Best Creative Advertising Agency",
    "Best marketing agency in India",
    "Creative service",
    "SEO company in noida",
    "Radio advertising agency",
    "Best ad agency",
    "Digital Marketing company",
    "Digital Marketing company in noida",
    "Digital Marketing company in Delhi",
    "digital marketing and creative agency",
    "Best digital marketing agency in Delhi",
    "Newspaper ad agency",
    "Top Marketing Agency in India",
    "creative digital marketing agency",
    "best seo services in noida",
    "best seo agency in greater noida",
  ],
  authors: [{ name: "Ritz Media World" }],
  publisher: "Ritz Media World",
  alternates: {
    canonical: "https://ritzmediaworld.com/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.9.1/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </body>
    </html>
  );
}
