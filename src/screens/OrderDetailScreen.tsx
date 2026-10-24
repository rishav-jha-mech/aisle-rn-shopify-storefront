import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { useLayoutEffect } from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { EmptyState, ErrorState, LoadingState } from '../components/States';
import { formatDate, formatMoney, humanize } from '../format';
import { useCustomer } from '../hooks/account';
import type { RootStackParamList } from '../navigation/types';
import { colors, radius, spacing, type } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetail'>;

export function OrderDetailScreen({ route, navigation }: Props) {
  const { data, isPending, error, refetch } = useCustomer();
  const order = data?.orders.nodes.find((o) => o.id === route.params.orderId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: order?.name ?? 'Order' });
  }, [navigation, order?.name]);

  if (isPending) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;
  if (!order) return <EmptyState title="Order not found" />;

  const rows: [string, { amount: string; currencyCode: string } | null | undefined][] = [
    ['Subtotal', order.subtotalPrice],
    ['Shipping', order.totalShippingPrice],
    ['Tax', order.totalTax],
  ];

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <Text style={styles.meta}>
        Placed {formatDate(order.processedAt)} · {humanize(order.financialStatus)} ·{' '}
        {humanize(order.fulfillmentStatus)}
      </Text>

      <View style={styles.card}>
        {order.lineItems.nodes.map((item, i) => (
          <View key={`${item.variant?.id ?? item.title}-${i}`} style={styles.line}>
            <Image source={item.variant?.image?.url} style={styles.thumb} contentFit="cover" />
            <View style={styles.lineBody}>
              <Text style={styles.lineTitle}>{item.title}</Text>
              <Text style={styles.lineMeta}>
                {item.variant?.title !== 'Default Title' ? `${item.variant?.title} · ` : ''}Qty {item.quantity}
              </Text>
            </View>
            <Text style={styles.lineTotal}>{formatMoney(item.originalTotalPrice)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        {rows.map(([label, money]) =>
          money ? (
            <View key={label} style={styles.row}>
              <Text style={styles.rowLabel}>{label}</Text>
              <Text style={styles.rowValue}>{formatMoney(money)}</Text>
            </View>
          ) : null,
        )}
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>{formatMoney(order.totalPrice)}</Text>
        </View>
      </View>

      {order.shippingAddress && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Shipping to</Text>
          <Text style={styles.address}>{order.shippingAddress.formatted.join('\n')}</Text>
        </View>
      )}

      <Button title="Track order" variant="secondary" onPress={() => Linking.openURL(order.statusUrl)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg },
  meta: { ...type.body, color: colors.muted },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, gap: spacing.md },
  cardTitle: { ...type.heading, color: colors.text },
  line: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  thumb: { width: 56, height: 56, borderRadius: radius.sm, backgroundColor: colors.border },
  lineBody: { flex: 1 },
  lineTitle: { fontSize: 15, color: colors.text },
  lineMeta: { ...type.caption, color: colors.muted },
  lineTotal: { fontSize: 15, fontWeight: '600', color: colors.text },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rowLabel: { ...type.body, color: colors.muted },
  rowValue: { ...type.body, color: colors.text },
  totalRow: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border, paddingTop: spacing.md },
  total: { ...type.heading, color: colors.text },
  address: { ...type.body, color: colors.text },
});
