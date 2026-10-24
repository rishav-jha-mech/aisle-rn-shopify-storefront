import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { merchant } from '../../merchants/index.ts';
import { Button } from '../components/Button';
import { EmptyState, ErrorState, LoadingState } from '../components/States';
import { formatDate, formatMoney, humanize } from '../format';
import { useCustomer, useLogout } from '../hooks/account';
import { useSession } from '../state/session';
import { colors, radius, spacing, type } from '../theme';

export function AccountScreen() {
  const navigation = useNavigation();
  const token = useSession((s) => s.token);
  const customerQuery = useCustomer();
  const logout = useLogout();

  let body;
  if (!token) {
    body = (
      <EmptyState
        title="Sign in to your account"
        message={
          merchant.supportsCustomerAccounts
            ? 'See your order history and check out with saved details.'
            : `${merchant.appName} is a demo catalog without customer accounts. Point the app at a Shopify dev store to sign in.`
        }
        action={
          <View style={styles.actions}>
            <Button title="Sign in" onPress={() => navigation.navigate('Login')} />
            <Button title="Create an account" variant="secondary" onPress={() => navigation.navigate('SignUp')} />
          </View>
        }
      />
    );
  } else if (customerQuery.isPending) {
    body = <LoadingState />;
  } else if (customerQuery.error) {
    body = <ErrorState error={customerQuery.error} onRetry={customerQuery.refetch} />;
  } else if (customerQuery.data) {
    const customer = customerQuery.data;
    const name = [customer.firstName, customer.lastName].filter(Boolean).join(' ');
    body = (
      <FlatList
        data={customer.orders.nodes}
        keyExtractor={(o) => o.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={customerQuery.isRefetching} onRefresh={() => void customerQuery.refetch()} />
        }
        ListHeaderComponent={
          <View style={styles.profile}>
            <Text style={styles.name}>{name || 'Your account'}</Text>
            <Text style={styles.email}>{customer.email}</Text>
            <Text style={styles.sectionTitle}>Orders</Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>You haven&apos;t placed any orders yet.</Text>}
        ListFooterComponent={
          <Button
            title="Sign out"
            variant="secondary"
            loading={logout.isPending}
            onPress={() => logout.mutate()}
            style={styles.signOut}
          />
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.order}
            accessibilityRole="button"
            onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
          >
            <View>
              <Text style={styles.orderName}>{item.name}</Text>
              <Text style={styles.orderMeta}>
                {formatDate(item.processedAt)} · {humanize(item.fulfillmentStatus)}
              </Text>
            </View>
            <Text style={styles.orderTotal}>{formatMoney(item.totalPrice)}</Text>
          </Pressable>
        )}
      />
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <Text style={styles.heading}>Account</Text>
      {body}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  heading: { ...type.display, color: colors.text, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  actions: { alignSelf: 'stretch', gap: spacing.md },
  list: { padding: spacing.lg, gap: spacing.md },
  profile: { marginBottom: spacing.sm },
  name: { ...type.title, color: colors.text },
  email: { ...type.body, color: colors.muted },
  sectionTitle: { ...type.heading, color: colors.text, marginTop: spacing.xl },
  empty: { ...type.body, color: colors.muted },
  order: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  orderName: { ...type.heading, color: colors.text },
  orderMeta: { ...type.caption, color: colors.muted, marginTop: 2 },
  orderTotal: { ...type.heading, color: colors.text },
  signOut: { marginTop: spacing.xl },
});
