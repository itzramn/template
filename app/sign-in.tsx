import React, { useState } from 'react';
import {
  Pressable,
  Text,
  View,
  Image,
  TextInput,
  TextInputProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSession } from '../context/ctx';

type InputFieldProps = TextInputProps & {
  id: string;
  iconName: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  onPressIcon?: () => void;
};

function Header() {
  return (
    <View className="p-3 h-1/3 justify-end">
      <View className="items-center">
        <Image
          className="w-24 h-24"
          source={{
            uri: 'https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-black-and-white.png',
          }}
        />
      </View>
      <Text className="text-2xl font-bold mb-2 go text-slate-50">
        Conoce la mejor app de React
      </Text>
      <Text className="text-xl text-slate-50">
        Inicia sesión para continuar
      </Text>
    </View>
  );
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

function ExternalLogin() {
  return (
    <View>
      <Text className="text-center text-gray-400">o inicia sesión con</Text>
      <View className="flex flex-row justify-center mt-4">
        <Pressable className="flex flex-row p-4 rounded-full border border-slate-400 w-1/2 items-center justify-center mr-2">
          <Image
            source={{
              uri: 'https://developers.google.com/static/identity/images/g-logo.png?hl=es-419',
            }}
            className="mr-2 w-4 h-4"
          />
          <Text className="font-bold">Google</Text>
        </Pressable>
        <Pressable className="flex flex-row p-4 rounded-full border border-slate-400 w-1/2 items-center justify-center pb-4">
          <Ionicons name="logo-apple" size={20} color="black" />
          <Text className="font-bold ml-2">Apple</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function SignIn() {
  const { signIn } = useSession();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView>
      <View className="bg-black flex flex-col h-full">
        <Header />
        <View className="flex-1 justify-between p-4 bg-white rounded-t-3xl h-2/3">
          <View>
            <InputField
              id="email"
              placeholder="Correo"
              iconName="mail-outline"
            />
            <InputField
              id="password"
              placeholder="Contraseña"
              iconName="key-outline"
              secureTextEntry={!showPassword}
              onPressIcon={() => setShowPassword(!showPassword)}
            />
            <Link href="/recover-password" className="mb-4">
              <Text className="text-gray-400 text-right">
                ¿Olvidaste tu contraseña?
              </Text>
            </Link>
            <Pressable
              className="p-4 rounded-full w-full items-center mb-4 bg-red-500 shadow-sm shadow-red-800"
              onPress={signIn}
            >
              <Text
                className="text-white font-semibold"
                style={{ fontFamily: 'Nunito' }}
              >
                Ingresar
              </Text>
            </Pressable>
            <Pressable
              className="p-4 rounded-full w-full items-center mb-4 bg-zinc-300"
              onPress={() => router.replace('/sign-up')}
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
        </View>
      </View>
    </SafeAreaView>
  );
}
