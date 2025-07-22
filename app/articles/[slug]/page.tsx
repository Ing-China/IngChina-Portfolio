import React from "react";
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

When building React Native applications, choosing the right component for displaying lists of data is crucial for performance and user experience. Two primary components serve this purpose: **FlatList** and **ScrollView**. Understanding their differences and use cases will help you make informed decisions that can significantly impact your app's performance.

This comprehensive guide will explore every aspect of these components, from basic implementation to advanced optimization techniques, helping you master list rendering in React Native.

## Table of Contents
1. Understanding the Fundamentals
2. Performance Architecture Deep Dive
3. Memory Management Strategies
4. When to Use Each Component
5. Advanced Implementation Patterns
6. Performance Optimization Techniques
7. Common Pitfalls and Solutions
8. Real-World Examples
9. Testing and Debugging
10. Best Practices and Recommendations

## Understanding the Fundamentals

### ScrollView: The Simple Approach

ScrollView is React Native's most basic scrollable container. It renders all its child components immediately upon mounting, making it straightforward to use but potentially problematic for large datasets.

**Core Characteristics:**
- Renders all children at mount time
- Simple to implement and understand
- Suitable for small, static content
- No built-in virtualization
- Supports heterogeneous content easily

\`\`\`javascript
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const ScrollViewExample = () => {
  const data = Array.from({ length: 100 }, (_, i) => \\\`Item \\\${i + 1}\\\`);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {data.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemText}>{item}</Text>
          <Text style={styles.itemSubtext}>Subtitle for {item}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  item: {
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
\`\`\`

### FlatList: The Performance Optimized Solution

FlatList is React Native's high-performance list component, designed specifically for rendering large datasets efficiently through virtualization and lazy loading.

**Core Characteristics:**
- Virtual rendering (only visible items rendered)
- Built-in performance optimizations
- Consistent memory usage
- Rich feature set (pull-to-refresh, infinite scroll)
- Optimized for homogeneous content

\`\`\`javascript
import React, { useState, useCallback } from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';

const FlatListExample = () => {
  const [data, setData] = useState(
    Array.from({ length: 1000 }, (_, i) => ({
      id: i.toString(),
      title: \\\`Item \\\${i + 1}\\\`,
      subtitle: \\\`This is the subtitle for item \\\${i + 1}\\\`,
      timestamp: new Date().toISOString(),
    }))
  );
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = useCallback(({ item, index }) => (
    <View style={[styles.item, { backgroundColor: index % 2 === 0 ? 'white' : '#f9f9f9' }]}>
      <Text style={styles.itemText}>{item.title}</Text>
      <Text style={styles.itemSubtext}>{item.subtitle}</Text>
      <Text style={styles.timestamp}>Created: {item.timestamp}</Text>
    </View>
  ), []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      getItemLayout={(data, index) => ({
        length: 100,
        offset: 100 * index,
        index,
      })}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
};
\`\`\`

## Performance Architecture Deep Dive

### ScrollView Rendering Process

ScrollView follows a straightforward rendering approach:

1. **Mount Phase**: All child components are instantiated
2. **Layout Phase**: All items are measured and positioned
3. **Render Phase**: All items are rendered to memory
4. **Display Phase**: Viewport shows visible portion

This process means a ScrollView with 1000 items creates 1000 component instances immediately, regardless of visibility.

\`\`\`javascript
// ScrollView Performance Analysis
const ScrollViewPerformance = () => {
  const [renderCount, setRenderCount] = useState(0);
  const data = Array.from({ length: 1000 }, (_, i) => i);

  // This component will be instantiated 1000 times immediately
  const ExpensiveItem = ({ item }) => {
    useEffect(() => {
      setRenderCount(prev => prev + 1);
      console.log(\\\`Rendered item \\\${item}\\\`);
    }, []);

    return (
      <View style={styles.expensiveItem}>
        <Text>Item {item}</Text>
        {/* Expensive computation happens here */}
        <ExpensiveChart data={generateChartData(item)} />
      </View>
    );
  };

  return (
    <ScrollView>
      <Text>Total Rendered Items: {renderCount}</Text>
      {data.map((item) => (
        <ExpensiveItem key={item} item={item} />
      ))}
    </ScrollView>
  );
};
\`\`\`

### FlatList Virtualization Architecture

FlatList implements sophisticated virtualization:

1. **Virtual Window**: Only renders items in the current viewport plus buffer
2. **Item Recycling**: Reuses component instances for better memory efficiency
3. **Lazy Loading**: Items are rendered as they approach the viewport
4. **Memory Management**: Automatically removes off-screen items

\`\`\`javascript
// FlatList Virtualization Demonstration
const FlatListVirtualization = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  
  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    title: \\\`Item \\\${i}\\\`,
    data: generateLargeDataSet(i), // Simulates heavy data
  }));

  const renderItem = useCallback(({ item, index }) => {
    useEffect(() => {
      setVisibleItems(prev => new Set([...prev, index]));
      console.log(\\\`Item \\\${index} rendered\\\`);
      
      return () => {
        console.log(\\\`Item \\\${index} unmounted\\\`);
      };
    }, []);

    return (
      <View style={styles.virtualizedItem}>
        <Text>Item {item.title}</Text>
        <Text>Currently visible items: {visibleItems.size}</Text>
        <HeavyComponent data={item.data} />
      </View>
    );
  }, [visibleItems]);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      // Virtualization settings
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={10}
      removeClippedSubviews={true}
      // Performance monitoring
      onViewableItemsChanged={({ viewableItems }) => {
        console.log('Viewable items:', viewableItems.length);
      }}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50
      }}
    />
  );
};
\`\`\`

## Memory Management Strategies

### ScrollView Memory Pattern

ScrollView's memory usage follows a linear pattern:

\`\`\`javascript
// Memory usage analysis for ScrollView
const ScrollViewMemoryAnalysis = () => {
  const [memoryUsage, setMemoryUsage] = useState(0);
  
  // Simulate memory-heavy items
  const LargeDataItem = ({ item }) => {
    const [largeData] = useState(() => {
      // Each item holds 1MB of data
      return new Array(1024 * 1024).fill(item);
    });

    useEffect(() => {
      // Simulate memory tracking
      const itemSize = largeData.length * 4; // 4 bytes per item
      setMemoryUsage(prev => prev + itemSize);
      
      return () => {
        setMemoryUsage(prev => prev - itemSize);
      };
    }, []);

    return (
      <View style={styles.memoryItem}>
        <Text>Item {item} - Size: 1MB</Text>
        <Text>Total Memory: {(memoryUsage / 1024 / 1024).toFixed(2)}MB</Text>
      </View>
    );
  };

  const items = Array.from({ length: 100 }, (_, i) => i);

  return (
    <ScrollView>
      {/* All 100MB will be allocated immediately */}
      {items.map(item => (
        <LargeDataItem key={item} item={item} />
      ))}
    </ScrollView>
  );
};
\`\`\`

### FlatList Memory Optimization

FlatList maintains constant memory usage through intelligent management:

\`\`\`javascript
// FlatList memory optimization example
const FlatListMemoryOptimized = () => {
  const [activeItems, setActiveItems] = useState(new Map());
  
  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    payload: generateHeavyPayload(i), // 1MB each
  }));

  const renderItem = useCallback(({ item, index }) => {
    useEffect(() => {
      // Track when items are mounted
      setActiveItems(prev => new Map(prev.set(index, item.payload)));
      
      return () => {
        // Clean up when items are unmounted
        setActiveItems(prev => {
          const newMap = new Map(prev);
          newMap.delete(index);
          return newMap;
        });
      };
    }, []);

    return (
      <View style={styles.optimizedItem}>
        <Text>Item {index}</Text>
        <Text>Active items: {activeItems.size}</Text>
        <Text>Memory usage: ~{activeItems.size}MB</Text>
      </View>
    );
  }, [activeItems]);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      // Memory optimization settings
      removeClippedSubviews={true}
      maxToRenderPerBatch={5}
      initialNumToRender={8}
      windowSize={5}
      // Only ~5-15 items in memory at once
    />
  );
};
\`\`\`

## Advanced Implementation Patterns

### Heterogeneous Lists with FlatList

While FlatList excels with homogeneous data, you can handle different item types:

\`\`\`javascript
const HeterogeneousFlatList = () => {
  const data = [
    { type: 'header', id: 'header-1', title: 'Welcome to Our App' },
    { type: 'banner', id: 'banner-1', imageUrl: 'https://example.com/banner.jpg' },
    ...Array.from({ length: 20 }, (_, i) => ({
      type: 'item',
      id: \\\`item-\\\${i}\\\`,
      title: \\\`Regular Item \\\${i + 1}\\\`,
    })),
    { type: 'advertisement', id: 'ad-1', content: 'Special Offer!' },
    ...Array.from({ length: 30 }, (_, i) => ({
      type: 'item',
      id: \\\`item-\\\${i + 20}\\\`,
      title: \\\`Regular Item \\\${i + 21}\\\`,
    })),
  ];

  const getItemLayout = (data, index) => {
    const item = data[index];
    let height;
    
    switch (item?.type) {
      case 'header': height = 120; break;
      case 'banner': height = 200; break;
      case 'advertisement': height = 100; break;
      default: height = 80;
    }
    
    return {
      length: height,
      offset: calculateOffset(data, index),
      index,
    };
  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <View style={styles.header}>
            <Text style={styles.headerText}>{item.title}</Text>
          </View>
        );
      
      case 'banner':
        return (
          <View style={styles.banner}>
            <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} />
          </View>
        );
      
      case 'advertisement':
        return (
          <View style={styles.advertisement}>
            <Text style={styles.adText}>{item.content}</Text>
          </View>
        );
      
      default:
        return (
          <View style={styles.regularItem}>
            <Text>{item.title}</Text>
          </View>
        );
    }
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
    />
  );
};
\`\`\`

## Performance Optimization Techniques

### FlatList Advanced Optimization

\`\`\`javascript
const HighlyOptimizedFlatList = () => {
  const [data] = useState(
    Array.from({ length: 50000 }, (_, i) => ({
      id: i.toString(),
      title: \\\`Item \\\${i + 1}\\\`,
      description: \\\`Description for item \\\${i + 1}\\\`,
    }))
  );

  // Memoized render item to prevent unnecessary re-renders
  const renderItem = useCallback(({ item }) => (
    <OptimizedListItem item={item} />
  ), []);

  // Optimized key extractor
  const keyExtractor = useCallback((item) => item.id, []);

  // Fixed item height for better performance
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
      
      // Performance optimizations
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      initialNumToRender={15}
      windowSize={10}
      
      // Disable scroll optimization features that might cause issues
      legacyImplementation={false}
      disableVirtualization={false}
    />
  );
};

// Optimized list item component
const OptimizedListItem = React.memo(({ item }) => {
  return (
    <View style={styles.optimizedItem}>
      <Text numberOfLines={1}>{item.title}</Text>
      <Text numberOfLines={2} style={styles.description}>
        {item.description}
      </Text>
    </View>
  );
});

const ITEM_HEIGHT = 80;
\`\`\`

## Common Pitfalls and Solutions

### ScrollView Anti-Patterns

\`\`\`javascript
// ❌ DON'T: Large datasets with ScrollView
const BadScrollView = () => {
  const data = Array.from({ length: 10000 }, (_, i) => i);
  
  return (
    <ScrollView>
      {data.map(item => (
        <ExpensiveComponent key={item} data={item} />
      ))}
    </ScrollView>
  );
  // This will freeze the app and consume excessive memory
};

// ✅ DO: Use FlatList for large datasets
const GoodFlatList = () => {
  const largeList = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    data: i
  }));
  
  return (
    <FlatList
      data={largeList}
      renderItem={({ item }) => <ExpensiveComponent data={item.data} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
\`\`\`

### FlatList Anti-Patterns

\`\`\`javascript
// ❌ DON'T: Use index as key
const BadFlatListKeys = () => (
  <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item, index) => index.toString()} // ❌ Unstable keys
  />
);

// ✅ DO: Use unique, stable identifiers
const GoodKeyExtractor = () => (
  <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.id.toString()}
  />
);
\`\`\`

## Real-World Examples

### E-Commerce Product Listing

\`\`\`javascript
const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const newProducts = await api.getProducts();
      setProducts(prev => [...prev, ...newProducts]);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setProducts([]);
    await loadProducts();
    setRefreshing(false);
  }, [loadProducts]);

  const renderProduct = useCallback(({ item }) => (
    <ProductCard product={item} />
  ), []);

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={keyExtractor}
      numColumns={2}
      
      // Pull to refresh
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      
      // Infinite scrolling
      onEndReached={loadProducts}
      onEndReachedThreshold={0.5}
      
      // Performance optimizations
      getItemLayout={(data, index) => ({
        length: 250,
        offset: 250 * Math.floor(index / 2),
        index,
      })}
      
      // Loading states
      ListFooterComponent={loading ? <LoadingSpinner /> : null}
      ListEmptyComponent={<EmptyState />}
    />
  );
};

const ProductCard = React.memo(({ product }) => (
  <View style={styles.productCard}>
    <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
    <Text style={styles.productTitle}>{product.title}</Text>
    <Text style={styles.productPrice}>$\{product.price}</Text>
  </View>
));
\`\`\`

## Conclusion and Best Practices

After this comprehensive analysis, here are the key takeaways:

### Choose ScrollView When:
- **Small datasets** (< 50 items)
- **Heterogeneous content** (mixed component types)
- **Static content** that rarely changes
- **Complex layouts** requiring maximum flexibility
- **Simple implementation** is prioritized

### Choose FlatList When:
- **Large datasets** (> 50 items)
- **Performance is critical** 
- **Memory efficiency** is important
- **Homogeneous content** structure
- **Built-in features** like pull-to-refresh are needed

### Universal Best Practices:

1. **Measure Performance**: Always profile your lists with real data
2. **Use Keys Properly**: Ensure unique, stable keys for list items
3. **Optimize Renders**: Memoize components and callbacks
4. **Minimize Re-renders**: Avoid creating objects in render methods
5. **Test on Devices**: Emulator performance doesn't reflect real-world usage

### Performance Checklist:

**For FlatList:**
- [ ] Implement getItemLayout for fixed-height items
- [ ] Use keyExtractor with stable, unique keys
- [ ] Memoize renderItem and item components
- [ ] Configure maxToRenderPerBatch and windowSize
- [ ] Enable removeClippedSubviews for long lists

**For ScrollView:**
- [ ] Limit to small datasets (< 50 items)
- [ ] Use removeClippedSubviews when possible
- [ ] Optimize contentContainerStyle usage
- [ ] Implement lazy loading for expensive components
- [ ] Consider pagination for larger datasets

By following these guidelines and understanding the fundamental differences between FlatList and ScrollView, you'll be able to build performant, smooth-scrolling lists that provide excellent user experiences at any scale.

Remember: the best choice depends on your specific use case. When in doubt, start with FlatList for its superior performance characteristics, and only switch to ScrollView when you need its flexibility for small, mixed-content layouts.
  `;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
        <div className="space-y-6">
          {articleContent.split("\n\n").map((section, index) => {
            if (section.trim() === "") return null;

            // Handle code blocks
            if (section.includes("```")) {
              const lines = section.split("\n");
              let inCodeBlock = false;
              let codeContent = "";
              let language = "";

              for (const line of lines) {
                if (line.startsWith("```")) {
                  if (!inCodeBlock) {
                    inCodeBlock = true;
                    language = line.substring(3).trim();
                  } else {
                    inCodeBlock = false;
                    break;
                  }
                } else if (inCodeBlock) {
                  codeContent += line + "\n";
                }
              }

              if (codeContent) {
                return (
                  <CodeBlock
                    key={index}
                    code={codeContent.trim()}
                    language={language}
                    index={index}
                  />
                );
              }
            }

            // Handle regular content
            return (
              <div
                key={index}
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-foreground prose-strong:text-foreground prose-blockquote:text-foreground/70 prose-blockquote:border-foreground/20"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: section
                      .split("\n")
                      .map((line) => {
                        // Convert headers
                        if (line.startsWith("### ")) {
                          return `<h3>${line.substring(4)}</h3>`;
                        }
                        if (line.startsWith("## ")) {
                          return `<h2>${line.substring(3)}</h2>`;
                        }
                        if (line.startsWith("# ")) {
                          return `<h1>${line.substring(2)}</h1>`;
                        }

                        // Convert bold text
                        line = line.replace(
                          /\*\*([^*]+)\*\*/g,
                          "<strong>$1</strong>"
                        );

                        // Convert empty lines to paragraph breaks
                        if (line.trim() === "") {
                          return "<br>";
                        }

                        // Regular paragraphs
                        return `<p>${line}</p>`;
                      })
                      .join(""),
                  }}
                />
              </div>
            );
          })}
        </div>

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
