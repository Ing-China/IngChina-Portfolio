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
    default: "Ing China - Full-Stack Developer | React, Next.js, TypeScript",
  },
  description:
    "Full-stack developer passionate about creating modern web and mobile applications with exceptional user experiences. Specialized in React, Next.js, TypeScript, and modern web technologies.",
  keywords: [
    "Ing China",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer",
    "Mobile Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "Software Engineer",
    "Portfolio",
    "Web Development",
    "UI/UX Design",
    "Modern Applications",
  ],
  authors: [{ name: "Ing China", url: "https://ingchina.dev" }],
  creator: "Ing China",
  publisher: "Ing China",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://ingchina.dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  openGraph: {
    title: "Ing China - Full-Stack Developer | React, Next.js, TypeScript",
    description:
      "Full-stack developer passionate about creating modern web and mobile applications with exceptional user experiences. Specialized in React, Next.js, TypeScript, and modern web technologies.",
    url: "https://ingchina.dev",
    siteName: "Ing China Portfolio",
    images: [
      {
        url: "/images/metadata.png",
        width: 1200,
        height: 630,
        alt: "Ing China - Full-Stack Developer Portfolio",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ing China - Full-Stack Developer | React, Next.js, TypeScript",
    description:
      "Full-stack developer passionate about creating modern web and mobile applications with exceptional user experiences. Specialized in React, Next.js, TypeScript, and modern web technologies.",
    images: ["/images/metadata.png"],
    creator: "@ingchina",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ing China",
      jobTitle: "Full-Stack Developer",
      description:
        "Full-stack developer passionate about creating modern web and mobile applications with exceptional user experiences. Specialized in React, Next.js, TypeScript, and modern web technologies.",
      url: "https://ingchina.dev",
      image: "https://ingchina.dev/images/me.png",
      sameAs: [
        "https://github.com/ingchina",
        "https://linkedin.com/in/ingchina",
        "https://twitter.com/ingchina",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Web Development",
        "Mobile Development",
        "UI/UX Design",
        "Full-Stack Development",
      ],
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Ing China Portfolio",
      url: "https://ingchina.dev",
      description:
        "Full-stack developer portfolio showcasing modern web and mobile applications with exceptional user experiences.",
      author: {
        "@type": "Person",
        name: "Ing China",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://ingchina.dev/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "SiteNavigationElement",
            position: 1,
            name: "About",
            description:
              "Learn about Ing China, a full-stack developer passionate about creating modern applications.",
            url: "https://ingchina.dev",
          },
          {
            "@type": "SiteNavigationElement",
            position: 2,
            name: "Projects",
            description:
              "Explore my portfolio of web and mobile applications built with modern technologies.",
            url: "https://ingchina.dev/projects",
          },
          {
            "@type": "SiteNavigationElement",
            position: 3,
            name: "Articles",
            description:
              "Read technical articles and insights about web development and programming.",
            url: "https://ingchina.dev/articles",
          },
          {
            "@type": "SiteNavigationElement",
            position: 4,
            name: "Resume",
            description:
              "View my professional experience, skills, and educational background.",
            url: "https://ingchina.dev/resume",
          },
          {
            "@type": "SiteNavigationElement",
            position: 5,
            name: "Contact",
            description:
              "Get in touch for collaboration opportunities and project inquiries.",
            url: "https://ingchina.dev/contact",
          },
        ],
      },
    },
  ];

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
