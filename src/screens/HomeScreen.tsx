import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../components/AppHeader';
import { ProductCard } from '../components/ProductCard';
import { SectionHeader } from '../components/SectionHeader';
import { EmptyState, ErrorState, LoadingState } from '../components/States';
import { useHome } from '../hooks/catalog';
import { colors, radius, spacing } from '../theme';

export function HomeScreen() {
  const navigation = useNavigation();
  const { data, isPending, error, refetch, isRefetching } = useHome();

  if (isPending) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  const collections = data.collections.nodes;
  const products = data.products.nodes;

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => void refetch()} />}
      >
        <AppHeader />

        {collections.length > 0 && (
          <View style={styles.section}>
            <SectionHeader
              title="Collections"
              action="See all"
              onAction={() => navigation.navigate('Collections')}
            />
            <FlatList
              horizontal
              data={collections}
              keyExtractor={(c) => c.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.rail}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.collection}
                  accessibilityRole="button"
                  onPress={() =>
                    navigation.navigate('Collection', { handle: item.handle, title: item.title })
                  }
                >
                  <Image source={item.image?.url} style={styles.collectionImage} contentFit="cover" />
                  <View style={styles.collectionScrim} />
                  <Text style={styles.collectionTitle}>{item.title}</Text>
                </Pressable>
              )}
            />
          </View>
        )}

        <View style={styles.section}>
          <SectionHeader title="Featured" />
          {products.length === 0 ? (
            <EmptyState title="Nothing here yet" message="This store has no products to show." />
          ) : (
            <View style={styles.grid}>
              {products.map((product) => (
                <View key={product.id} style={styles.cell}>
                  <ProductCard
                    product={product}
                    onPress={() => navigation.navigate('Product', { handle: product.handle })}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xxl },
  section: { marginTop: spacing.md, marginBottom: spacing.lg },
  rail: { paddingHorizontal: spacing.lg, gap: spacing.md },
  collection: {
    width: 220,
    height: 140,
    borderRadius: radius.lg,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: colors.border,
  },
  collectionImage: { ...StyleSheet.absoluteFill },
  collectionScrim: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.28)' },
  collectionTitle: { color: '#fff', fontSize: 18, fontWeight: '700', padding: spacing.md },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    columnGap: spacing.lg,
    rowGap: spacing.xl,
  },
  cell: { width: '47%', flexGrow: 1, maxWidth: '48.5%' },
});
