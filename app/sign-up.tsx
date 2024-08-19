import React, { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import { ThemedText } from '../components/common/ThemedText';
import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <ThemedSafeAreaView className="flex flex-1 justify-between">
      <View className="pt-4 px-4">
        <View className="items-center mb-4">
          <View className="w-24 h-24 bg-black rounded-lg" />
        </View>
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
        <TextField id="name" placeholder="Nombre" iconName="person-outline" />
        <TextField id="email" placeholder="Correo" iconName="mail-outline" />
        <TextField id="phone" placeholder="Teléfono" iconName="call-outline" />
        <TextField
          id="password"
          placeholder="Contraseña"
          iconName="key-outline"
          secureTextEntry={!showPassword}
          onIconPress={() => setShowPassword(!showPassword)}
        />
        <TextField
          id="confirmPassword"
          placeholder="Confirmar contraseña"
          iconName="key-outline"
          secureTextEntry={!showConfirmPassword}
          onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </View>
      <View className="px-4 pb-2">
        <Button txtClassName="mb-4" onPress={() => router.replace('/sign-in')}>
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
