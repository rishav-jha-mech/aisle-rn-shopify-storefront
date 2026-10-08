import { useNavigation } from '@react-navigation/native';
import type { ReactElement } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import type { ProductCardFragment } from '../api/gql/graphql';
import { colors, spacing } from '../theme';
import { ProductCard } from './ProductCard';

type Props = {
  products: ProductCardFragment[];
  header?: ReactElement;
  empty?: ReactElement;
  onEndReached?: () => void;
  loadingMore?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
};

export function ProductGrid({
  products,
  header,
  empty,
  onEndReached,
  loadingMore,
  refreshing,
  onRefresh,
}: Props) {
  const navigation = useNavigation();
  return (
    <FlatList
      data={products}
      keyExtractor={(p) => p.id}
      numColumns={2}
      style={styles.list}
      contentContainerStyle={styles.content}
      columnWrapperStyle={styles.row}
      ListHeaderComponent={header}
      ListEmptyComponent={empty}
      keyboardDismissMode="on-drag"
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={Boolean(refreshing)} onRefresh={onRefresh} />
        ) : undefined
      }
      ListFooterComponent={
        loadingMore ? <ActivityIndicator style={styles.footer} color={colors.primary} /> : null
      }
      renderItem={({ item }) => (
        <View style={styles.cell}>
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('Product', { handle: item.handle })}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.xl, flexGrow: 1 },
  row: { gap: spacing.lg },
  cell: { flex: 1 / 2 },
  footer: { marginVertical: spacing.xl },
});
