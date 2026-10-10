import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text } from 'react-native';

import { EmptyState, ErrorState, LoadingState } from '../components/States';
import { useCollections } from '../hooks/catalog';
import { colors, radius, spacing } from '../theme';

export function CollectionsScreen() {
  const navigation = useNavigation();
  const query = useCollections();

  if (query.isPending) return <LoadingState />;
  if (query.error) return <ErrorState error={query.error} onRetry={query.refetch} />;

  const collections = query.data.pages.flatMap((p) => p.collections.nodes);

  return (
    <FlatList
      data={collections}
      keyExtractor={(c) => c.id}
      style={styles.list}
      contentContainerStyle={styles.content}
      onEndReached={() => query.hasNextPage && query.fetchNextPage()}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={<EmptyState title="No collections" />}
      ListFooterComponent={
        query.isFetchingNextPage ? <ActivityIndicator color={colors.primary} /> : undefined
      }
      renderItem={({ item }) => (
        <Pressable
          style={styles.row}
          accessibilityRole="button"
          onPress={() => navigation.navigate('Collection', { handle: item.handle, title: item.title })}
        >
          <Image source={item.image?.url} style={styles.image} contentFit="cover" />
          <Text style={styles.title}>{item.title}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, flexGrow: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  image: { width: 72, height: 72, borderRadius: radius.md, backgroundColor: colors.border },
  title: { fontSize: 17, fontWeight: '600', color: colors.text },
});
