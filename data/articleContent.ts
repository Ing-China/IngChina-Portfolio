export const articleContents: Record<string, string> = {
  "typescript-best-practices-react-developers": `
# TypeScript Best Practices for React Developers

TypeScript has become essential for modern React development, providing type safety, better tooling, and improved maintainability. This guide covers practical patterns and techniques every React developer should master.

## Essential Type Patterns

### Component Props Typing

Always define explicit interfaces for your component props:

\`\`\`typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  onClick 
}) => {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

### State Typing with Hooks

Use generic types for complex state objects:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const UserProfile: React.FC = () => {
  const [state, setState] = useState<UserState>({
    user: null,
    loading: false,
    error: null
  });

  const fetchUser = useCallback(async (userId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const user = await api.getUser(userId);
      setState(prev => ({ ...prev, user, loading: false }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }, []);

  return (
    <div>
      {state.loading && <div>Loading...</div>}
      {state.error && <div>Error: {state.error}</div>}
      {state.user && <div>Welcome, {state.user.name}!</div>}
    </div>
  );
};
\`\`\`

## Advanced Patterns

### Generic Components

Create reusable components with generics:

\`\`\`typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  loading?: boolean;
  emptyMessage?: string;
}

function List<T>({ 
  items, 
  renderItem, 
  keyExtractor, 
  loading = false,
  emptyMessage = 'No items found'
}: ListProps<T>) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (items.length === 0) {
    return <div>{emptyMessage}</div>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Usage
const UserList: React.FC = () => {
  const users: User[] = [/* ... */];

  return (
    <List
      items={users}
      renderItem={(user) => <span>{user.name}</span>}
      keyExtractor={(user) => user.id}
      emptyMessage="No users found"
    />
  );
};
\`\`\`

### Custom Hook Typing

Properly type custom hooks with return tuples:

\`\`\`typescript
interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Usage with proper typing
const ProductList: React.FC = () => {
  const { data: products, loading, error } = useApi<Product[]>('/api/products');

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products?.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};
\`\`\`

## Event Handler Patterns

### Form Event Typing

Handle form events with proper typing:

\`\`\`typescript
interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};
\`\`\`

## Utility Types in React

### Component Prop Extraction

Extract props from existing components:

\`\`\`typescript
// Extract props from HTML elements
type ButtonProps = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary';
};

const CustomButton: React.FC<ButtonProps> = ({ variant, ...buttonProps }) => {
  return (
    <button 
      {...buttonProps} 
      className={\`btn \${variant ? \`btn-\${variant}\` : ''} \${buttonProps.className || ''}\`}
    />
  );
};

// Extract props from other components
type ModalProps = React.ComponentProps<typeof BaseModal> & {
  title: string;
  onClose: () => void;
};
\`\`\`

### Conditional Types for Props

Use conditional types for flexible component APIs:

\`\`\`typescript
interface BaseCardProps {
  title: string;
  children: React.ReactNode;
}

interface ClickableCardProps extends BaseCardProps {
  clickable: true;
  onClick: () => void;
  href?: never;
}

interface LinkCardProps extends BaseCardProps {
  clickable: true;
  href: string;
  onClick?: never;
}

interface StaticCardProps extends BaseCardProps {
  clickable?: false;
  onClick?: never;
  href?: never;
}

type CardProps = ClickableCardProps | LinkCardProps | StaticCardProps;

const Card: React.FC<CardProps> = ({ title, children, ...props }) => {
  if (props.clickable) {
    if (props.href) {
      return (
        <a href={props.href} className="card clickable">
          <h3>{title}</h3>
          {children}
        </a>
      );
    }
    
    return (
      <div className="card clickable" onClick={props.onClick}>
        <h3>{title}</h3>
        {children}
      </div>
    );
  }

  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
};
\`\`\`

## Common Mistakes to Avoid

### Don't Use \`any\`

Instead of \`any\`, use specific types or \`unknown\`:

\`\`\`typescript
// ❌ Bad
const handleApiResponse = (data: any) => {
  return data.result;
};

// ✅ Good
interface ApiResponse<T> {
  result: T;
  status: 'success' | 'error';
}

const handleApiResponse = <T>(data: ApiResponse<T>): T => {
  return data.result;
};
\`\`\`

### Avoid Optional Props When Not Needed

\`\`\`typescript
// ❌ Bad - making everything optional
interface UserProps {
  name?: string;
  email?: string;
  id?: string;
}

// ✅ Good - explicit about what's required
interface UserProps {
  name: string;
  email: string;
  id: string;
  avatar?: string; // Only truly optional props
}
\`\`\`

## TypeScript Configuration

Essential \`tsconfig.json\` settings for React:

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
\`\`\`

## Conclusion

TypeScript transforms React development by catching errors early, improving code maintainability, and enhancing developer experience. Start with basic prop typing and gradually adopt advanced patterns as your codebase grows.

Key takeaways:
- Always type component props explicitly
- Use generics for reusable components
- Leverage utility types for flexible APIs
- Avoid \`any\` and embrace strict typing
- Configure TypeScript properly for React

The investment in proper TypeScript setup pays dividends in code quality, developer productivity, and application reliability.
  `,
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
