export const articleContents: Record<string, string> = {
  "flatlist-vs-scrollview-react-native": `
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
  const data = Array.from({ length: 50 }, (_, i) => \`Item \${i + 1}\`);

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
    title: \`Item \${i + 1}\`,
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
  `,
};
