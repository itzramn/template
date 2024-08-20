import React, { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import { ThemedText } from '../components/common/ThemedText';
import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
//import { AuthAPI } from '@/api/auth.api';
import { SignUpData } from '@/types/auth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().max(50),
  username: z.string().min(5).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<SignUpData> = (data) => {
    console.log(data);
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
          onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </View>
      <View className="px-4 pb-2">
        <Button
          txtClassName="mb-4"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Continuar
        </Button>
        <Pressable
          className="p-4 rounded-full w-full items-center mb-4 bg-zinc-300"
          onPress={() => router.replace('/sign-in')}
        >
          <Text
            className="text-black font-semibold"
            style={{ fontFamily: 'Nunito' }}
          >
            Regresar
          </Text>
        </Pressable>
      </View>
    </ThemedSafeAreaView>
  );
}
