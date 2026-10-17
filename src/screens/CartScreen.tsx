import { useNavigation } from '@react-navigation/native';
import { useShopifyCheckoutSheet } from '@shopify/checkout-sheet-kit';
import { Image } from 'expo-image';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
import { QuantityStepper } from '../components/QuantityStepper';
import { EmptyState, ErrorState, LoadingState } from '../components/States';
import { formatMoney } from '../format';
import { type CartLine, useCart, useRemoveCartLine, useUpdateCartLine } from '../hooks/cart';
import { useCartStore } from '../state/cart';
import { colors, radius, spacing, type } from '../theme';

export function CartScreen() {
  const navigation = useNavigation();
  const checkout = useShopifyCheckoutSheet();
  const cartId = useCartStore((s) => s.cartId);
  const { data: cart, isPending, error, refetch } = useCart();
  const update = useUpdateCartLine();
  const remove = useRemoveCartLine();
  const busy = update.isPending || remove.isPending;

  const onError = (e: Error) => Alert.alert('Could not update cart', e.message);

  const setQuantity = (line: CartLine, quantity: number) => {
    if (quantity <= 0) remove.mutate(line.id, { onError });
    else update.mutate({ id: line.id, quantity }, { onError });
  };

  const goShopping = (
    <Button
      title="Start shopping"
      onPress={() => navigation.navigate('Tabs', { screen: 'HomeTab' })}
    />
  );

  let body;
  if (!cartId) {
    body = <EmptyState title="Your cart is empty" message="Items you add will show up here." action={goShopping} />;
  } else if (isPending) {
    body = <LoadingState />;
  } else if (error) {
    body = <ErrorState error={error} onRetry={refetch} />;
  } else if (!cart || cart.lines.nodes.length === 0) {
    body = <EmptyState title="Your cart is empty" message="Items you add will show up here." action={goShopping} />;
  } else {
    body = (
      <>
        <FlatList
          data={cart.lines.nodes}
          keyExtractor={(l) => l.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <LineItem
              line={item}
              disabled={busy}
              onQuantity={(q) => setQuantity(item, q)}
              onOpen={() => navigation.navigate('Product', { handle: item.merchandise.product.handle })}
            />
          )}
        />
        <SafeAreaView edges={['bottom']} style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatMoney(cart.cost.subtotalAmount)}</Text>
          </View>
          <Text style={styles.note}>Shipping and taxes are calculated at checkout.</Text>
          <Button
            title="Checkout"
            disabled={busy}
            onPress={() => checkout.present(cart.checkoutUrl)}
          />
        </SafeAreaView>
      </>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <Text style={styles.heading}>
        Cart{cart?.totalQuantity ? ` (${cart.totalQuantity})` : ''}
      </Text>
      {body}
    </SafeAreaView>
  );
}

function LineItem({
  line,
  disabled,
  onQuantity,
  onOpen,
}: {
  line: CartLine;
  disabled: boolean;
  onQuantity: (quantity: number) => void;
  onOpen: () => void;
}) {
  const { merchandise } = line;
  const showVariant = merchandise.title !== 'Default Title';
  return (
    <View style={styles.line}>
      <Pressable onPress={onOpen} accessibilityRole="button">
        <Image source={merchandise.image?.url} style={styles.thumb} contentFit="cover" />
      </Pressable>
      <View style={styles.lineBody}>
        <Text style={styles.lineTitle} numberOfLines={2}>
          {merchandise.product.title}
        </Text>
        {showVariant && <Text style={styles.lineVariant}>{merchandise.title}</Text>}
        <View style={styles.lineFooter}>
          <QuantityStepper quantity={line.quantity} onChange={onQuantity} disabled={disabled} />
          <Text style={styles.lineTotal}>{formatMoney(line.cost.totalAmount)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  heading: { ...type.display, color: colors.text, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  list: { padding: spacing.lg },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginVertical: spacing.lg },
  line: { flexDirection: 'row', gap: spacing.lg },
  thumb: { width: 84, height: 84, borderRadius: radius.md, backgroundColor: colors.border },
  lineBody: { flex: 1, gap: 2 },
  lineTitle: { ...type.heading, color: colors.text },
  lineVariant: { ...type.caption, color: colors.muted },
  lineFooter: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineTotal: { fontSize: 15, fontWeight: '600', color: colors.text },
  summary: {
    padding: spacing.lg,
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { ...type.heading, color: colors.text },
  summaryValue: { ...type.heading, color: colors.text },
  note: { ...type.caption, color: colors.muted, marginBottom: spacing.sm },
});
