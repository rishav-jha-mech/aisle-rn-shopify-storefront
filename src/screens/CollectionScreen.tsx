import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

import { ProductGrid } from '../components/ProductGrid';
import { EmptyState, ErrorState, LoadingState } from '../components/States';
import { useCollection } from '../hooks/catalog';
import type { RootStackParamList } from '../navigation/types';
import { colors, spacing, type } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Collection'>;

export function CollectionScreen({ route, navigation }: Props) {
  const { handle, title } = route.params;
  const query = useCollection(handle);
  const collection = query.data?.pages[0]?.collection;

  useLayoutEffect(() => {
    navigation.setOptions({ title: collection?.title ?? title ?? '' });
  }, [navigation, collection?.title, title]);

  if (query.isPending) return <LoadingState />;
  if (query.error) return <ErrorState error={query.error} onRetry={query.refetch} />;
  if (!collection) {
    return <EmptyState title="Collection not found" message={`No collection matches "${handle}".`} />;
  }

  const products = query.data.pages.flatMap((p) => p.collection?.products.nodes ?? []);

  return (
    <ProductGrid
      products={products}
      header={
        collection.description ? (
          <Text style={styles.description}>{collection.description}</Text>
        ) : undefined
      }
      empty={<EmptyState title="No products" message="This collection is empty for now." />}
      onEndReached={() => query.hasNextPage && query.fetchNextPage()}
      loadingMore={query.isFetchingNextPage}
      refreshing={query.isRefetching && !query.isFetchingNextPage}
      onRefresh={() => void query.refetch()}
    />
  );
}

const styles = StyleSheet.create({
  description: { ...type.body, color: colors.muted, marginBottom: spacing.sm },
});
