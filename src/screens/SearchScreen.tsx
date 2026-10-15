import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProductGrid } from '../components/ProductGrid';
import { EmptyState, ErrorState, LoadingState } from '../components/States';
import { useSearch } from '../hooks/catalog';
import { colors, radius, spacing, type } from '../theme';

function useDebounced<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export function SearchScreen() {
  const [term, setTerm] = useState('');
  const debounced = useDebounced(term);
  const query = useSearch(debounced);
  const products = query.data?.pages.flatMap((p) => p.products.nodes) ?? [];

  let body;
  if (debounced.trim().length < 2) {
    body = <EmptyState title="Search the store" message="Type at least two letters of a product name." />;
  } else if (query.isPending) {
    body = <LoadingState />;
  } else if (query.error) {
    body = <ErrorState error={query.error} onRetry={query.refetch} />;
  } else {
    body = (
      <ProductGrid
        products={products}
        empty={<EmptyState title="No results" message={`Nothing matches "${debounced.trim()}".`} />}
        onEndReached={() => query.hasNextPage && query.fetchNextPage()}
        loadingMore={query.isFetchingNextPage}
      />
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.bar}>
        <TextInput
          value={term}
          onChangeText={setTerm}
          placeholder="Search products"
          placeholderTextColor={colors.muted}
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          clearButtonMode="while-editing"
          accessibilityLabel="Search products"
        />
      </View>
      {body}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  bar: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  input: {
    ...type.body,
    height: 44,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    color: colors.text,
  },
});
