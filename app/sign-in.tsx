import React, { useState } from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import { Link, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSession } from '../context/ctx';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/common/ThemedView';
import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';

function Header() {
  const headerTextColor = useThemeColor(
    {
      light: 'white',
      dark: 'black',
    },
    'text'
  );
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
      {/*This had slate*/}
      <Text
        className="text-2xl font-bold mb-2"
        style={{
          color: headerTextColor,
        }}
      >
        Conoce la mejor app de React
      </Text>
      <Text
        className="text-xl"
        style={{
          color: headerTextColor,
        }}
      >
        Inicia sesión para continuar
      </Text>
    </View>
  );
}

function ExternalLogin() {
  return (
    <View>
      <Text className="text-center text-gray-400">o inicia sesión con</Text>
      <View className="flex flex-row justify-center mt-4">
        <Pressable className="bg-white flex flex-row p-4 rounded-full border border-slate-400 w-1/2 items-center justify-center mr-2">
          <Image
            source={{
              uri: 'https://developers.google.com/static/identity/images/g-logo.png?hl=es-419',
            }}
            className="mr-2 w-4 h-4"
          />
          <Text className="font-bold">Google</Text>
        </Pressable>
        <Pressable className="bg-white flex flex-row p-4 rounded-full border border-slate-400 w-1/2 items-center justify-center pb-4">
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
              id="email"
              placeholder="Correo"
              iconName="mail-outline"
            />
            <TextField
              id="password"
              placeholder="Contraseña"
              iconName="key-outline"
              secureTextEntry={!showPassword}
              onIconPress={() => setShowPassword(!showPassword)}
            />
            <Link href="/recover-password" className="mb-4">
              <Text className="text-gray-400 text-right">
                ¿Olvidaste tu contraseña?
              </Text>
            </Link>
            <Button txtClassName="mb-4" onPress={signIn}>
              Ingresar
            </Button>
            <Pressable
              className="p-4 rounded-full w-full items-center bg-zinc-300"
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
        </ThemedView>
      </View>
    </View>
  );
}
