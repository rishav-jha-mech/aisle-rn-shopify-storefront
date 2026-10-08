import { StyleSheet, Text, View, type TextStyle } from 'react-native';

import { formatMoney } from '../format';
import { colors, spacing } from '../theme';

type Money = { amount: string; currencyCode: string };

export function Price({
  price,
  compareAt,
  style,
}: {
  price: Money;
  compareAt?: Money | null;
  style?: TextStyle;
}) {
  const onSale = compareAt && Number(compareAt.amount) > Number(price.amount);
  return (
    <View style={styles.row}>
      <Text style={[styles.price, style, onSale && { color: colors.danger }]}>
        {formatMoney(price)}
      </Text>
      {onSale && <Text style={styles.compare}>{formatMoney(compareAt)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  price: { fontSize: 14, fontWeight: '600', color: colors.text },
  compare: { fontSize: 13, color: colors.muted, textDecorationLine: 'line-through' },
});
