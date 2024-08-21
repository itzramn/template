import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import { ThemedText } from '../components/common/ThemedText';
import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';
import { AuthAPI } from '@/api/auth.api';

const authAPI = new AuthAPI();

const schema = z
  .object({
    name: z.string().max(50),
    username: z.string().min(5).max(20),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

type FormFields = z.infer<typeof schema>;

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const result = await authAPI.signUp({
      ...data,
      role: 'admin',
    });
    if (!result.success) {
      setError('root', { message: result.message });
      return;
    }
    router.replace({
      pathname: '/sign-in',
      params: { registered: 'true' },
    });
  };
  return (
    <ThemedSafeAreaView className="flex flex-1 justify-between">
      <View className="pt-4 px-4">
        {/*<View className="items-center mb-4">
          <View className="w-24 h-24 bg-black rounded-lg" />
        </View>*/}
        <ThemedText
          className="text-2xl text-primary-500"
          style={{ fontFamily: 'QuicksandBold' }}
        >
          Regístrate
        </ThemedText>
        <Text
          className="text-lg mb-4 text-gray-400"
          style={{ fontFamily: 'Nunito' }}
        >
          Ingresa los datos que utilizarás para acceder a tu cuenta.
        </Text>
        <TextField
          name="name"
          placeholder="Nombre"
          iconName="id-card-outline"
          control={control}
          error={errors.name?.message}
        />

        <TextField
          name="username"
          placeholder="Usuario"
          iconName="person-outline"
          control={control}
          error={errors.username?.message}
        />

        <TextField
          name="email"
          placeholder="Correo"
          iconName="mail-outline"
          control={control}
          error={errors.email?.message}
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

        <TextField
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          iconName="key-outline"
          secureTextEntry={!showConfirmPassword}
          control={control}
          error={errors.confirmPassword?.message}
          onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </View>
      <View className="px-4 pb-2">
        <Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
          Continuar
        </Button>
        {errors.root && (
          <Text
            className="text-red-500 text-xs mt-1"
            style={{ fontFamily: 'Inter' }}
          >
            {errors.root.message}
          </Text>
        )}
        <Button
          color="black"
          variant="light"
          txtClassName="my-4"
          onPress={() => router.replace('/sign-in')}
        >
          Regresar
        </Button>
      </View>
    </ThemedSafeAreaView>
  );
}
