export type MerchantTheme = {
  primary: string;
  onPrimary: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  danger: string;
};

export type MerchantConfig = {
  id: string;
  appName: string;
  /** Shown in the header when there is no logo image. */
  tagline: string;
  logoUrl?: string;
  storeDomain: string;
  storefrontToken: string;
  apiVersion: string;
  /** Native bundle / package id suffix, so two merchants can live on one device. */
  bundleSuffix: string;
  supportsCustomerAccounts: boolean;
  theme: MerchantTheme;
};
