import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme';

type Props = {
  quantity: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
};

export function QuantityStepper({ quantity, onChange, disabled }: Props) {
  return (
    <View style={[styles.wrap, disabled && styles.disabled]}>
      <Pressable
        hitSlop={8}
        disabled={disabled}
        accessibilityLabel="Decrease quantity"
        onPress={() => onChange(quantity - 1)}
        style={styles.button}
      >
        <Text style={styles.symbol}>−</Text>
      </Pressable>
      <Text style={styles.value}>{quantity}</Text>
      <Pressable
        hitSlop={8}
        disabled={disabled}
        accessibilityLabel="Increase quantity"
        onPress={() => onChange(quantity + 1)}
        style={styles.button}
      >
        <Text style={styles.symbol}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  disabled: { opacity: 0.5 },
  button: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  symbol: { fontSize: 18, color: colors.text },
  value: { minWidth: 20, textAlign: 'center', fontSize: 15, fontWeight: '600', color: colors.text },
});
