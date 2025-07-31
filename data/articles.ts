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
    publishedAt: "2025-08-01",
    readTime: 8,
    slug: "flatlist-vs-scrollview-react-native",
    starred: false,
    pinned: true,
  },
  {
    id: "2",
    title: "TypeScript Best Practices for React Developers",
    excerpt:
      "Essential TypeScript patterns and techniques every React developer should know. From proper typing of props and state to advanced patterns like generics and utility types.",
    publishedAt: "2025-08-01",
    readTime: 12,
    slug: "typescript-best-practices-react-developers",
    starred: true,
    pinned: false,
  },
];
