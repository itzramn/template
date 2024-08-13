import { Link, router } from 'expo-router';
import { Pressable, Text, View, Image, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useSession } from '../context/ctx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function SignIn() {
  const { signIn } = useSession();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView>
      <View className="bg-black flex flex-col h-full">
        <View className="p-3 h-1/3 justify-end">
          <View className="items-center">
            <Image
              className="w-24 h-24 "
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
        <View className="rounded-t-3xl p-4 bg-white h-2/3">
          <View className="flex flex-row items-center border rounded-xl mb-4 border-slate-400 pl-4">
            <Ionicons name="mail-outline" size={20} color="black" />
            <TextInput
              id="email"
              className="p-4 w-full "
              placeholder="Correo"
            />
          </View>
          <View className="flex flex-row items-center border rounded-xl mb-4 border-slate-400 pl-4 pr-4">
            <Ionicons name="lock-closed-outline" size={20} color="black" />
            <TextInput
              id="password"
              className="flex-1 p-4"
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="black"
              />
            </Pressable>
          </View>
          <Link href="/" className="mb-4">
            <Text className="text-gray-400">¿Olvidaste tu contraseña?</Text>
          </Link>
          <Pressable
            className="p-4 bg-red-500 rounded-full w-full items-center mb-4"
            onPress={() => {
              signIn();
              router.replace('/');
            }}
          >
            <Text className=" text-white">Entrar</Text>
          </Pressable>
          <Pressable className="p-4 bg-black rounded-full w-full items-center mb-4">
            <Text className=" text-white">Registrate</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
