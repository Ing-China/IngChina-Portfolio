import React, { JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaClock, FaCalendar } from "react-icons/fa";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import CodeBlock from "@/components/CodeBlock";

interface ArticleDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

const ArticleDetail = async ({ params }: ArticleDetailProps) => {
  const { slug } = await params;

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Single article content for FlatList vs ScrollView
  const articleContent = `
# FlatList vs ScrollView — Which One Should You Use?

When building React Native applications, choosing the right component for displaying lists is crucial for performance and user experience. This guide covers the key differences and when to use each component.

## Overview

### ScrollView
ScrollView renders all child components immediately upon mounting, making it simple but potentially problematic for large datasets.

**Key Features:**
- Renders all children at mount time
- Simple implementation
- Suitable for small, static content
- No built-in virtualization

\`\`\`javascript
import React from 'react';
import { ScrollView, View, Text } from 'react-native';

const ScrollViewExample = () => {
  const data = Array.from({ length: 50 }, (_, i) => \\\`Item \\\${i + 1}\\\`);

  return (
    <ScrollView>
      {data.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
};
\`\`\`

### FlatList
FlatList is a high-performance list component designed for large datasets through virtualization and lazy loading.

**Key Features:**
- Virtual rendering (only visible items)
- Built-in performance optimizations
- Consistent memory usage
- Rich feature set (pull-to-refresh, infinite scroll)

\`\`\`javascript
import React, { useCallback } from 'react';
import { FlatList, View, Text } from 'react-native';

const FlatListExample = () => {
  const data = Array.from({ length: 1000 }, (_, i) => ({
    id: i.toString(),
    title: \\\`Item \\\${i + 1}\\\`,
  }));

  const renderItem = useCallback(({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  ), []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
    />
  );
};
\`\`\`

## Performance Comparison

### Memory Usage
- **ScrollView**: Linear memory growth with dataset size
- **FlatList**: Constant memory usage through virtualization

### Rendering
- **ScrollView**: All items rendered immediately
- **FlatList**: Only visible items + buffer rendered

## When to Use Each

### Use ScrollView When:
- Small datasets (< 50 items)
- Heterogeneous content types
- Static content that rarely changes
- Simple implementation is prioritized

### Use FlatList When:
- Large datasets (> 50 items)
- Performance is critical
- Memory efficiency is important
- Need built-in features (pull-to-refresh, infinite scroll)

## Best Practices

### FlatList Optimization:
\`\`\`javascript
const OptimizedFlatList = () => {
  const renderItem = useCallback(({ item }) => (
    <MemoizedItem item={item} />
  ), []);

  const keyExtractor = useCallback((item) => item.id, []);

  const getItemLayout = useCallback((data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
};

const MemoizedItem = React.memo(({ item }) => (
  <View style={styles.item}>
    <Text>{item.title}</Text>
  </View>
));
\`\`\`

### Common Pitfalls:
- Don't use ScrollView for large datasets
- Always use unique, stable keys in FlatList
- Memoize render functions and components
- Implement getItemLayout for fixed heights

## Conclusion

Choose **FlatList** for performance-critical applications with large datasets. Use **ScrollView** only for small, static content where simplicity is preferred over performance.

The decision ultimately depends on your specific use case, but FlatList should be your default choice for most list implementations in React Native.
  `;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const parseArticleContent = (content: string) => {
    // First, fix escaped backticks in the content
    const fixedContent = content.replace(/\\\\\\\`/g, "`");

    // Split by code blocks first to handle them separately
    const parts = fixedContent.split(/(```[\s\S]*?```)/);
    const elements: JSX.Element[] = [];

    parts.forEach((part, index) => {
      if (part.trim() === "") return;

      // Handle code blocks
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.split("\n");
        const language = lines[0].substring(3).trim();
        const code = lines.slice(1, -1).join("\n");

        if (code.trim()) {
          elements.push(
            <CodeBlock
              key={`code-${index}`}
              code={code.trim()}
              language={language}
              index={index}
            />
          );
        }
        return;
      }

      // Handle regular content sections
      const sections = part.split(/\n\s*\n/);
      sections.forEach((section, sectionIndex) => {
        if (section.trim() === "") return;

        const lines = section.split("\n");
        const processedLines = lines.map((line) => {
          // Convert headers
          if (line.startsWith("### ")) {
            return `<h3 class="text-xl font-semibold mt-8 mb-4">${line.substring(
              4
            )}</h3>`;
          }
          if (line.startsWith("## ")) {
            return `<h2 class="text-2xl font-bold mt-10 mb-6">${line.substring(
              3
            )}</h2>`;
          }
          if (line.startsWith("# ")) {
            return `<h1 class="text-3xl font-bold mb-8">${line.substring(
              2
            )}</h1>`;
          }

          // Handle inline code with backticks first
          line = line.replace(
            /`([^`]+)`/g,
            '<code class="bg-foreground/10 text-foreground px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
          );

          // Convert bold text before list processing
          line = line.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

          // Convert bullet points
          if (line.trim().startsWith("- ")) {
            return `<li class="ml-4">${line.substring(2)}</li>`;
          }

          // Convert numbered lists
          if (/^\d+\.\s/.test(line.trim())) {
            const match = line.match(/^(\d+)\.\s(.*)$/);
            if (match) {
              return `<li class="ml-4">${match[2]}</li>`;
            }
          }

          // Convert empty lines to paragraph breaks
          if (line.trim() === "") {
            return "<br>";
          }

          // Regular paragraphs
          return `<p class="leading-relaxed mb-4">${line}</p>`;
        });

        // Wrap list items in ul tags
        let htmlContent = processedLines.join("");
        htmlContent = htmlContent.replace(/(<li[^>]*>.*?<\/li>)+/g, (match) => {
          return `<ul class="list-disc space-y-2 mb-6">${match}</ul>`;
        });

        elements.push(
          <div
            key={`section-${index}-${sectionIndex}`}
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-foreground prose-strong:text-foreground prose-blockquote:text-foreground/70 prose-blockquote:border-foreground/20 prose-code:text-foreground prose-code:bg-foreground/10"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        );
      });
    });

    return elements;
  };

  return (
    <div className="min-h-[calc(100vh-4rem-4rem)] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        {/* Back Button */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors mb-8"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>

        {/* Article Header */}
        <header className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
            <span className="flex items-center gap-1">
              <FaCalendar className="w-3 h-3" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <FaClock className="w-3 h-3" />
              {article.readTime} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-lg text-foreground/80 leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* Article Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src="/articles/article1.png"
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="space-y-6">{parseArticleContent(articleContent)}</div>

        {/* Back to Articles */}
        <div className="mt-12 pt-8 border-t border-foreground/10 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
