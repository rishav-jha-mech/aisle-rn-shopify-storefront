import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { useLayoutEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { ProductQuery } from '../api/gql/graphql';
import { Button } from '../components/Button';
import { Price } from '../components/Price';
import { EmptyState, ErrorState, LoadingState } from '../components/States';
import { useAddToCart } from '../hooks/cart';
import { useProduct } from '../hooks/catalog';
import type { RootStackParamList } from '../navigation/types';
import { colors, radius, spacing, type } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;
type Product = NonNullable<ProductQuery['product']>;
type Selection = Record<string, string>;

function initialSelection(product: Product): Selection {
  const variant =
    product.variants.nodes.find((v) => v.availableForSale) ?? product.variants.nodes[0];
  return Object.fromEntries(variant?.selectedOptions.map((o) => [o.name, o.value]) ?? []);
}

function findVariant(product: Product, selection: Selection) {
  return product.variants.nodes.find((v) =>
    v.selectedOptions.every((o) => selection[o.name] === o.value),
  );
}

export function ProductScreen({ route, navigation }: Props) {
  const { handle } = route.params;
  const { data, isPending, error, refetch } = useProduct(handle);
  const product = data?.product;

  useLayoutEffect(() => {
    navigation.setOptions({ title: '' });
  }, [navigation]);

  if (isPending) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;
  if (!product) {
    return <EmptyState title="Product not found" message={`No product matches "${handle}".`} />;
  }
  return <ProductDetail key={product.id} product={product} />;
}

function ProductDetail({ product }: { product: Product }) {
  const { width } = useWindowDimensions();
  const [selection, setSelection] = useState(() => initialSelection(product));
  const [imageIndex, setImageIndex] = useState(0);
  const addToCart = useAddToCart();

  const variant = findVariant(product, selection);
  // Products with a single "Default Title" variant have nothing to pick.
  const pickableOptions = product.options.filter(
    (o) => !(o.optionValues.length === 1 && o.optionValues[0].name === 'Default Title'),
  );

  // Lead with the selected variant's image so the gallery follows the picker.
  const variantImage = variant?.image;
  const images = variantImage
    ? [
        { id: 'variant', ...variantImage },
        ...product.images.nodes.filter((n) => n.url !== variantImage.url),
      ]
    : product.images.nodes;

  const isAvailable = (name: string, value: string) =>
    product.variants.nodes.some(
      (v) =>
        v.availableForSale &&
        v.selectedOptions.every((o) =>
          o.name === name ? o.value === value : selection[o.name] === o.value,
        ),
    );

  const onAdd = () => {
    if (!variant) return;
    addToCart.mutate(
      { merchandiseId: variant.id, quantity: 1 },
      {
        onError: (e) => Alert.alert('Could not add to cart', e.message),
      },
    );
  };

  const buttonTitle = !variant
    ? 'Unavailable'
    : !variant.availableForSale
      ? 'Sold out'
      : addToCart.isSuccess
        ? 'Added to cart'
        : 'Add to cart';

  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <FlatList
          horizontal
          pagingEnabled
          data={images}
          keyExtractor={(img, i) => `${img.id}-${i}`}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) =>
            setImageIndex(Math.round(e.nativeEvent.contentOffset.x / width))
          }
          renderItem={({ item }) => (
            <Image
              source={item.url}
              style={{ width, height: width }}
              contentFit="cover"
              accessibilityLabel={item.altText ?? product.title}
            />
          )}
        />
        {images.length > 1 && (
          <View style={styles.dots}>
            {images.map((img, i) => (
              <View key={`${img.id}-${i}`} style={[styles.dot, i === imageIndex && styles.dotActive]} />
            ))}
          </View>
        )}

        <View style={styles.body}>
          {product.vendor ? <Text style={styles.vendor}>{product.vendor}</Text> : null}
          <Text style={styles.title}>{product.title}</Text>
          {variant && (
            <Price price={variant.price} compareAt={variant.compareAtPrice} style={styles.price} />
          )}

          {pickableOptions.map((option) => (
            <View key={option.name} style={styles.option}>
              <Text style={styles.optionLabel}>
                {option.name}: <Text style={styles.optionValue}>{selection[option.name]}</Text>
              </Text>
              <View style={styles.chips}>
                {option.optionValues.map(({ name: value }) => {
                  const selected = selection[option.name] === value;
                  const available = isAvailable(option.name, value);
                  return (
                    <Pressable
                      key={value}
                      accessibilityRole="button"
                      accessibilityState={{ selected, disabled: !available }}
                      onPress={() => {
                        addToCart.reset();
                        setSelection((s) => ({ ...s, [option.name]: value }));
                      }}
                      style={[styles.chip, selected && styles.chipSelected]}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          selected && styles.chipTextSelected,
                          !available && styles.chipTextUnavailable,
                        ]}
                      >
                        {value}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}

          {product.description ? <Text style={styles.description}>{product.description}</Text> : null}
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <Button
          title={buttonTitle}
          onPress={onAdd}
          loading={addToCart.isPending}
          disabled={!variant?.availableForSale}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: spacing.xxl },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: spacing.md },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.text },
  body: { padding: spacing.lg, gap: spacing.sm },
  vendor: { ...type.caption, color: colors.muted, textTransform: 'uppercase', letterSpacing: 1 },
  title: { ...type.display, color: colors.text },
  price: { fontSize: 18 },
  option: { marginTop: spacing.lg, gap: spacing.sm },
  optionLabel: { ...type.heading, color: colors.text },
  optionValue: { fontWeight: '400', color: colors.muted },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    minWidth: 48,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  chipSelected: { borderColor: colors.text, backgroundColor: colors.text },
  chipText: { fontSize: 14, color: colors.text },
  chipTextSelected: { color: colors.background, fontWeight: '600' },
  chipTextUnavailable: { textDecorationLine: 'line-through', opacity: 0.5 },
  description: { ...type.body, color: colors.text, marginTop: spacing.xl },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});
