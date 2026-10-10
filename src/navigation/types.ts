import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  CartTab: undefined;
  AccountTab: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  Collections: undefined;
  Collection: { handle: string; title?: string };
  Product: { handle: string };
  Login: undefined;
  SignUp: undefined;
  OrderDetail: { orderId: string };
};

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
