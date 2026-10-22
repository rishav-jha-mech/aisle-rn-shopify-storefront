import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';

import { Button } from '../components/Button';
import { Field } from '../components/Field';
import { useLogin } from '../hooks/account';
import type { RootStackParamList } from '../navigation/types';
import { colors, spacing, type } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();

  const submit = () =>
    login.mutate({ email: email.trim(), password }, { onSuccess: () => navigation.goBack() });

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to see your orders and check out faster.</Text>
        <Field
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <Field
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
          textContentType="password"
          onSubmitEditing={submit}
        />
        {login.error && <Text style={styles.error}>{login.error.message}</Text>}
        <Button
          title="Sign in"
          onPress={submit}
          loading={login.isPending}
          disabled={!email || !password}
        />
        <Button
          title="Create an account"
          variant="secondary"
          onPress={() => navigation.replace('SignUp')}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export const authStyles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, gap: spacing.lg },
  title: { ...type.display, color: colors.text },
  subtitle: { ...type.body, color: colors.muted, marginBottom: spacing.sm },
  error: { ...type.body, color: colors.danger },
});
const styles = authStyles;
