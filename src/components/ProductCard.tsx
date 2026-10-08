import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ProductCardFragment } from '../api/gql/graphql';
import { colors, radius, spacing } from '../theme';
import { Price } from './Price';

type Props = {
  product: ProductCardFragment;
  onPress: () => void;
  width?: number;
};

export function ProductCard({ product, onPress, width }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, width ? { width } : styles.fill, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={product.title}
    >
      <View style={styles.imageWrap}>
        <Image
          source={product.featuredImage?.url}
          style={styles.image}
          contentFit="cover"
          transition={150}
          accessibilityLabel={product.featuredImage?.altText ?? product.title}
        />
        {!product.availableForSale && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Sold out</Text>
          </View>
        )}
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {product.title}
      </Text>
      <Price
        price={product.priceRange.minVariantPrice}
        compareAt={product.compareAtPriceRange.minVariantPrice}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.xs },
  fill: { flex: 1 },
  pressed: { opacity: 0.8 },
  imageWrap: {
    aspectRatio: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.border,
    marginBottom: spacing.xs,
  },
  image: { flex: 1 },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  badgeText: { fontSize: 11, fontWeight: '600', color: colors.text },
  title: { fontSize: 14, color: colors.text },
});
