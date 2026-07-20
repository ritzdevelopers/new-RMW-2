export const metadata = {
    metadataBase: new URL("https://ritzmediaworld.com/"),
    title: "Advertising & Digital Services | Ritz Media World Delhi-NCR",
    description:
        "Discover Ritz Media World’s full-service solutions in digital, print, radio and creative advertising designed to grow your brand and drive real results.",
    keywords: [
        "Ritz Media World services",
        "advertising agency India",
        "digital marketing services",
        "print and radio ads",
        "creative branding solutions",
        "media agency",
        "brand promotion India",
        "best print advertising services",
        "top print advertising services",
        "radio advertising cost",
        "Best",
        "Radio Ads Services in Delhi",
        "Best Radio Ads Services in Noida",
        "PR Services in Noida",
        "Digital Marketing Services Delhi NCR",
        "marketing services",
        "creative services",
        "ppc services",
    ],
    authors: [{ name: "Ritz Media World" }],
    publisher: "Ritz Media World",
    alternates: {
        canonical: "https://ritzmediaworld.com/services",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ServicesLayout({ children }) {
    return <>{children}</>;
}