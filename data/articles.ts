export interface Article {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: number;
  slug: string;
  starred: boolean;
  pinned: boolean;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "FlatList vs ScrollView — Which One Should You Use?",
    excerpt:
      "Understanding the key differences between FlatList and ScrollView in React Native, when to use each component, and performance considerations for optimal mobile app development.",
    publishedAt: "2024-12-22",
    readTime: 8,
    slug: "flatlist-vs-scrollview-react-native",
    starred: false,
    pinned: true,
  },
];