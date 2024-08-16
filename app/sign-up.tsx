import React, { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, TextInputProps, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

type InputFieldProps = TextInputProps & {
  id: string;
  iconName: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  onPressIcon?: () => void;
};

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

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SafeAreaView className="flex flex-1 justify-between">
      <View className="pt-4 px-4">
        <View className="items-center mb-4">
          <View className="w-24 h-24 bg-black rounded-lg" />
        </View>
        <Text
          className="text-2xl font-bold"
          style={{ fontFamily: 'Quicksand' }}
        >
          Regístrate
        </Text>
        <Text
          className="text-lg mb-4 text-gray-400"
          style={{ fontFamily: 'Nunito' }}
        >
          Ingresa los datos que utilizarás para acceder a tu cuenta.
        </Text>
        <InputField
          id="name"
          placeholder="Nombre"
          iconName="person-outline"
          style={{ fontFamily: 'Inter' }}
        />
        <InputField
          id="email"
          placeholder="Correo"
          iconName="mail-outline"
          style={{ fontFamily: 'Inter' }}
        />
        <InputField
          id="phone"
          placeholder="Teléfono"
          iconName="call-outline"
          style={{ fontFamily: 'Inter' }}
        />
        <InputField
          id="password"
          placeholder="Contraseña"
          iconName="key-outline"
          style={{ fontFamily: 'Inter' }}
          secureTextEntry={!showPassword}
          onPressIcon={() => setShowPassword(!showPassword)}
        />
        <InputField
          id="confirmPassword"
          placeholder="Confirmar contraseña"
          iconName="key-outline"
          style={{ fontFamily: 'Inter' }}
          secureTextEntry={!showConfirmPassword}
          onPressIcon={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </View>
      <View className="px-4 pb-2">
        <Pressable
          className="p-4 rounded-full w-full items-center mb-4 bg-red-500 shadow-sm shadow-red-800"
          onPress={() => router.replace('/sign-in')}
        >
          <Text
            className="text-white font-semibold"
            style={{ fontFamily: 'Nunito' }}
          >
            Continuar
          </Text>
        </Pressable>
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
    </SafeAreaView>
  );
}
