import type { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import type { RootStackParamList } from './types';

// storefront://product/<handle> and storefront://collection/<handle>.
// Add https prefixes here once universal links / app links are set up for a domain.
export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/'), 'storefront://'],
  config: {
    screens: {
      Tabs: {
        screens: {
          HomeTab: '',
          SearchTab: 'search',
          CartTab: 'cart',
          AccountTab: 'account',
        },
      },
      Collections: 'collections',
      Collection: 'collection/:handle',
      Product: 'product/:handle',
      Login: 'login',
      SignUp: 'signup',
    },
  },
};
