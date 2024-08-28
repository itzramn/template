import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useSession } from '../context/ctx';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/common/ThemedView';
import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';
import { useForm } from 'react-hook-form';
import { Header } from '@/components/sign-in/Header';
import { ExternalLogin } from '@/components/sign-in/ExternalLogin';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  username: z.string().min(5).max(20),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export default function SignIn() {
  const { registered, reset } = useLocalSearchParams<{
    registered?: 'true';
    reset?: 'true';
  }>();
  const { signIn, isBiometricAuth, setIsBiometricAuth, biometricAuth } =
    useSession();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const headerBackgroundColor = useThemeColor(
    {
      light: 'black',
      dark: 'white',
    },
    'background'
  );

  return (
    <View
      className="flex flex-col h-full"
      style={{ backgroundColor: headerBackgroundColor }}
    >
      <Header />
      <ThemedView txtClassName="flex-1 justify-between p-4 rounded-t-3xl h-2/3">
        <View>
          {registered === 'true' && (
            <Text className="text-success-600 text-center mb-1">
              ¡Usuario registrado correctamente!
            </Text>
          )}
          {isBiometricAuth ? (
            <>
              <Button
                txtClassName="mb-4"
                onPress={biometricAuth}
                disabled={isSubmitting}
              >
                Ingresar con biometría
              </Button>
              <Button
                variant="light"
                txtClassName="mb-4"
                onPress={() => setIsBiometricAuth(false)}
              >
                Ingresar con credenciales
              </Button>
            </>
          ) : (
            <>
              <TextField
                name="username"
                placeholder="Usuario"
                iconName="person-outline"
                control={control}
                error={errors.username?.message}
              />
              <TextField
                name="password"
                placeholder="Contraseña"
                iconName="key-outline"
                secureTextEntry={!showPassword}
                control={control}
                error={errors.password?.message}
                onIconPress={() => setShowPassword(!showPassword)}
              />
              <Link href="/recover-password" className="mb-4">
                <Text className="text-gray-400 text-right">
                  ¿Olvidaste tu contraseña?
                </Text>
              </Link>
              <Button
                txtClassName="mb-4"
                onPress={handleSubmit(signIn)}
                disabled={isSubmitting}
              >
                Ingresar
              </Button>
            </>
          )}
          <Button
            color="black"
            variant="light"
            onPress={() => router.navigate('/sign-up')}
          >
            Regístrate
          </Button>
        </View>
        <ExternalLogin />
      </ThemedView>
    </View>
  );
}
