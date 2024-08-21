import React, { useState } from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import { Link, router } from 'expo-router';
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
  const { signIn } = useSession();
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
    <View>
      <View
        className="flex flex-col h-full"
        style={{ backgroundColor: headerBackgroundColor }}
      >
        <Header />
        <ThemedView txtClassName="flex-1 justify-between p-4 rounded-t-3xl h-2/3">
          <View>
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
            <Pressable
              className="p-4 rounded-full w-full items-center bg-zinc-300"
              onPress={() => router.navigate('/sign-up')}
            >
              <Text
                className="text-black font-semibold"
                style={{ fontFamily: 'Nunito' }}
              >
                Regístrate
              </Text>
            </Pressable>
          </View>
          <ExternalLogin />
        </ThemedView>
      </View>
    </View>
  );
}
