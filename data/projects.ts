import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    title: "SH Crypto Community",
    description:
      "Cambodia's largest cryptocurrency community platform connecting crypto enthusiasts, traders, and blockchain developers",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudflare"],
    features: [
      "Community-driven crypto education and networking",
      "Multiple communication channels (Telegram, Facebook)",
      "Market analysis and educational content",
      "DeFi opportunities and security guidance",
      "Mobile price alerts and notifications via Telegram bot",
      "Multilingual platform focused on Cambodian crypto ecosystem",
    ],
    category: "web",
    githubUrl: "https://github.com/Ing-China/SH-Crypto-Community.git",
    // liveUrl: "https://sh-crypto-community.ingchina2004.workers.dev/",
    image: "/projects/project1.jpg",
  },
  {
    id: "2",
    title: "SH Crypto Community Bot",
    description:
      "Advanced social media analytics bot for crypto communities with Telegram and Facebook monitoring capabilities",
    technologies: ["Hono", "TypeScript", "Cloudflare"],
    features: [
      "Telegram group analytics and member tracking",
      "Facebook follower monitoring and insights",
      "Real-time community engagement metrics",
      "Group-specific analytics and reporting",
      "Webhook integration for automated updates",
      "Chart data visualization for community growth",
    ],
    category: "backend",
    githubUrl: "https://github.com/Ing-China/SH-Crypto-Community-Bot.git",
    // liveUrl: "https://sh-crypto-community-bot.ingchina2004.workers.dev/",
    image: "/projects/project2.jpg",
  },
  {
    id: "3",
    title: "The Sneakers Shop",
    description:
      "Modern eCommerce mobile application for shoe shopping with seamless user experience across multiple categories",
    technologies: ["React Native", "TypeScript", "iOS", "Android"],
    features: [
      "Cross-platform mobile shopping experience",
      "Multiple shoe categories (Sneakers, Running, Casual)",
      "Modern and intuitive user interface",
      "Comprehensive product browsing and filtering",
      "Seamless checkout and payment integration",
      "User-friendly product discovery and search",
    ],
    category: "mobile",
    githubUrl:
      "https://github.com/Ing-China/The-Sneakers-Shop-React-Native.git",
    image: "/projects/project3.jpg",
  },
  {
    id: "4",
    title: "EasyCO",
    description:
      "Excel file management mobile application for companies allowing users to import, edit, and export spreadsheet data",
    technologies: [
      "React Native",
      "TypeScript",
      "WatermelonDB",
      "iOS",
      "Android",
      "Excel Integration",
    ],
    features: [
      "Excel file import and export functionality",
      "Real-time data editing and manipulation",
      "Offline data storage with WatermelonDB",
      "Cross-platform mobile support",
      "User-friendly spreadsheet interface",
      "Company data management system",
    ],
    category: "mobile",
    githubUrl: "https://github.com/Ing-China/EasyCO.git",
    image: "/projects/project4.jpg",
  },
  {
    id: "5",
    title: "KH Market",
    description:
      "Local marketplace mobile application connecting Cambodian communities with businesses, featuring location-based services and comprehensive e-commerce platform",
    technologies: [
      "React Native",
      "TypeScript",
      "Google Maps API",
      "iOS",
      "Android",
      "Location Services",
    ],
    features: [
      "Interactive map with business location discovery",
      "Multi-category marketplace (clothing, accessories, services)",
      "Location-based business search and filtering",
      "Khmer language localization and cultural adaptation",
      "Real-time business information and contact details",
      "Cross-platform mobile shopping experience",
    ],
    category: "mobile",
    // githubUrl: "https://github.com/Ing-China/Khmer-Market.git",
    appStoreUrl: "https://apps.apple.com/us/app/kh-market/id6749251457",
    image: "/projects/project5.jpg",
  },
];
