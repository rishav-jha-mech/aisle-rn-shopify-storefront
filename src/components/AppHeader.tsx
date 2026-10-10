import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { merchant } from '../../merchants/index.ts';
import { colors, spacing, type } from '../theme';

/** Branded header: the merchant logo if there is one, otherwise the app name. */
export function AppHeader() {
  return (
    <View style={styles.wrap}>
      {merchant.logoUrl ? (
        <Image source={merchant.logoUrl} style={styles.logo} contentFit="contain" />
      ) : (
        <Text style={styles.name}>{merchant.appName}</Text>
      )}
      <Text style={styles.tagline}>{merchant.tagline}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.lg },
  logo: { height: 32, width: 140 },
  name: { ...type.display, color: colors.text },
  tagline: { ...type.body, color: colors.muted, marginTop: 2 },
});
