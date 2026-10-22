import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';

import { Button } from '../components/Button';
import { Field } from '../components/Field';
import { useSignUp } from '../hooks/account';
import type { RootStackParamList } from '../navigation/types';
import { authStyles as styles } from './LoginScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export function SignUpScreen({ navigation }: Props) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const signUp = useSignUp();
  const set = (key: keyof typeof form) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  const submit = () =>
    signUp.mutate(
      { ...form, email: form.email.trim() },
      { onSuccess: () => navigation.goBack() },
    );

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>Track orders and save your details for checkout.</Text>
        <Field label="First name" value={form.firstName} onChangeText={set('firstName')} autoComplete="given-name" />
        <Field label="Last name" value={form.lastName} onChangeText={set('lastName')} autoComplete="family-name" />
        <Field
          label="Email"
          value={form.email}
          onChangeText={set('email')}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
        />
        <Field
          label="Password"
          value={form.password}
          onChangeText={set('password')}
          secureTextEntry
          autoComplete="new-password"
          textContentType="newPassword"
        />
        {signUp.error && <Text style={styles.error}>{signUp.error.message}</Text>}
        <Button
          title="Create account"
          onPress={submit}
          loading={signUp.isPending}
          disabled={!form.email || form.password.length < 5}
        />
        <Button title="I already have an account" variant="secondary" onPress={() => navigation.replace('Login')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
