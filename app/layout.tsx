import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ingchina.dev"),
  title: {
    template: "%s - Ing China",
    default: "Ing China - Full-Stack Developer",
  },
  description:
    "Full-stack developer passionate about creating modern web and mobile applications with exceptional user experiences",
  openGraph: {
    title: "Ing China - Full-Stack Developer",
    description:
      "Full-stack developer passionate about creating modern web and mobile applications with exceptional user experiences",
    url: "https://ingchina.dev",
    siteName: "Ing China Portfolio",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Ing China Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ing China - Full-Stack Developer",
    description:
      "Full-stack developer passionate about creating modern web and mobile applications with exceptional user experiences",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
