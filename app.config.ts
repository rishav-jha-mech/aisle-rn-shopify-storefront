import type { ConfigContext, ExpoConfig } from 'expo/config';

import { getMerchant } from './merchants/index.ts';

const merchant = getMerchant();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: merchant.appName,
  slug: 'rn-shopify-storefront',
  scheme: 'storefront',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: merchant.theme.background,
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: `dev.storefront.${merchant.bundleSuffix}`,
  },
  android: {
    package: `dev.storefront.${merchant.bundleSuffix}`,
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
