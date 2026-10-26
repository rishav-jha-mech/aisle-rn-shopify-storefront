import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { ColorScheme, ShopifyCheckoutSheetProvider } from '@shopify/checkout-sheet-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CheckoutListener } from './src/CheckoutListener';
import { LoadingState } from './src/components/States';
import { linking } from './src/navigation/linking';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useCartStore } from './src/state/cart';
import { useSession } from './src/state/session';
import { colors } from './src/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, retry: 1 },
  },
});

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
  },
};

export default function App() {
  const cartHydrated = useCartStore((s) => s.hydrated);
  const sessionHydrated = useSession((s) => s.hydrated);

  useEffect(() => {
    void useCartStore.getState().hydrate();
    void useSession.getState().hydrate();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ShopifyCheckoutSheetProvider
          configuration={{
            colorScheme: ColorScheme.light,
            colors: {
              ios: { tintColor: colors.primary, backgroundColor: colors.background },
              android: {
                backgroundColor: colors.background,
                progressIndicator: colors.primary,
                headerBackgroundColor: colors.surface,
                headerTextColor: colors.text,
              },
            },
          }}
        >
          <CheckoutListener />
          <StatusBar style="dark" />
          {cartHydrated && sessionHydrated ? (
            <NavigationContainer linking={linking} theme={navigationTheme} fallback={<LoadingState />}>
              <RootNavigator />
            </NavigationContainer>
          ) : (
            <LoadingState />
          )}
        </ShopifyCheckoutSheetProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
