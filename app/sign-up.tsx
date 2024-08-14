import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  Pressable,
  Text,
  TextInputProps,
  View,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

interface InputFieldProps extends TextInputProps {
  id: string;
  iconName: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  onPressIcon?: () => void;
}

function InputField({
  id,
  placeholder,
  iconName,
  secureTextEntry,
  onPressIcon,
  ...props
}: InputFieldProps) {
  return (
    <View
      className={`flex flex-row items-center border rounded-xl mb-4 border-slate-400 ${onPressIcon ? 'pl-4 pr-4' : 'pl-4'}`}
    >
      <Ionicons name={iconName} size={20} color="black" />
      <TextInput
        id={id}
        className="flex-1 p-4"
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {onPressIcon && (
        <Pressable onPress={onPressIcon}>
          <Ionicons
            name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="black"
          />
        </Pressable>
      )}
    </View>
  );
}

const SignInScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SafeAreaView className="flex flex-1 justify-between">
      <View className="pt-4 px-4">
        <View className="items-center mb-4">
          <View className="w-24 h-24 bg-black rounded-lg" />
        </View>
        <Text className="text-2xl font-bold">Regístrate</Text>
        <Text className="text-lg mb-4 text-gray-400">
          Ingresa los datos que utilizarás para acceder a tu cuenta.
        </Text>
        <InputField id="name" placeholder="Nombre" iconName="person-outline" />
        <InputField id="email" placeholder="Correo" iconName="mail-outline" />
        <InputField id="phone" placeholder="Teléfono" iconName="call-outline" />
        <InputField
          id="password"
          placeholder="Contraseña"
          iconName="key-outline"
          secureTextEntry={!showPassword}
          onPressIcon={() => setShowPassword(!showPassword)}
        />
        <InputField
          id="confirmPassword"
          placeholder="Confirmar contraseña"
          iconName="key-outline"
          secureTextEntry={!showConfirmPassword}
          onPressIcon={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </View>
      <View className="px-4 pb-4">
        <Pressable
          className="p-4 rounded-full w-full items-center mb-4 bg-red-500"
          onPress={() => router.push('/sign-in')}
        >
          <Text className="text-white">Enviar</Text>
        </Pressable>
        <Pressable
          className="p-4 rounded-full w-full items-center mb-4 bg-black"
          onPress={() => router.push('/sign-in')}
        >
          <Text className="text-white">Regresar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
