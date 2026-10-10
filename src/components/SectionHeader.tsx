import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, type } from '../theme';

export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action && onAction && (
        <Pressable onPress={onAction} hitSlop={12} accessibilityRole="button">
          <Text style={styles.action}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  title: { ...type.title, color: colors.text },
  action: { ...type.caption, fontWeight: '600', color: colors.primary },
});
