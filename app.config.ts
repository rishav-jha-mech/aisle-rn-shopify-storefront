import type { ConfigContext, ExpoConfig } from 'expo/config';

import { getMerchant } from './merchants/index.ts';

const merchant = getMerchant();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: merchant.appName,
  slug: 'aisle',
  scheme: 'storefront',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  ios: {
    supportsTablet: false,
    bundleIdentifier: `app.aisle.${merchant.bundleSuffix}`,
  },
  android: {
    package: `app.aisle.${merchant.bundleSuffix}`,
    adaptiveIcon: {
      backgroundColor: merchant.theme.background,
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
  },
  plugins: ['expo-image'],
  extra: { merchantId: merchant.id },
});
