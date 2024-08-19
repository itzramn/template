import React, { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import { ThemedText } from '@/components/common/ThemedText';
import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <ThemedSafeAreaView className="flex flex-1 justify-between">
      <View className="pt-4 px-4">
        <View className="items-center mb-4">
          <View className="w-full h-48 bg-black rounded-lg" />
        </View>
        <ThemedText
          className="text-2xl text-primary-500"
          style={{ fontFamily: 'QuicksandBold' }}
        >
          Restablecer Contraseña
        </ThemedText>
        <Text
          className="text-lg mb-4 text-gray-400"
          style={{ fontFamily: 'Nunito' }}
        >
          Ingresa tu nueva contraseña.
        </Text>
        <TextField
          id="password"
          placeholder="Nueva Contraseña"
          iconName="key-outline"
          secureTextEntry={!showPassword}
          onIconPress={() => setShowPassword(!showPassword)}
        />
        <TextField
          id="confirmPassword"
          placeholder="Confirmar nueva contraseña"
          iconName="key-outline"
          secureTextEntry={!showConfirmPassword}
          onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={{ fontFamily: 'Inter' }}
        />
      </View>
      <View className="px-4 pb-2">
        <Button txtClassName="mb-4" onPress={() => router.replace('/sign-in')}>
          Restablecer contraseña
        </Button>
        <Pressable
          className="p-4 rounded-full w-full items-center mb-4 bg-zinc-300"
          onPress={() => router.replace('/sign-in')}
        >
          <Text
            className="text-black font-semibold"
            style={{ fontFamily: 'Nunito' }}
          >
            Cancelar
          </Text>
        </Pressable>
      </View>
    </ThemedSafeAreaView>
  );
}
