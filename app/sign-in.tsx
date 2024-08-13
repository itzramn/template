import { useState } from 'react';
import { Pressable, Text, View, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSession } from '../context/ctx';

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
        <View className="flex-1 justify-between p-4 bg-white rounded-t-3xl h-2/3">
          <View>
            <View className="flex flex-row items-center border rounded-xl mb-4 border-slate-400 pl-4">
              <Ionicons name="mail-outline" size={20} color="black" />
              <TextInput
                id="email"
                className="p-4 w-full"
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
              }}
            >
              <Text className="text-white">Entrar</Text>
            </Pressable>
            <Pressable className="p-4 bg-black rounded-full w-full items-center mb-4">
              <Text className="text-white">Registrate</Text>
            </Pressable>
          </View>
          <View>
            <Text className="text-center text-gray-400">
              o inicia sesión con
            </Text>
            <View className="flex flex-row justify-center mt-4">
              <Pressable className="flex flex-row p-4 rounded-full border border-slate-400 w-1/2 items-center justify-center mr-2">
                <Image
                  source={{
                    uri: 'https://developers.google.com/static/identity/images/g-logo.png?hl=es-419',
                  }}
                  className="mr-2 w-6 h-6"
                />
                <Text className="font-bold">Google</Text>
              </Pressable>
              <Pressable className="flex flex-row p-4 rounded-full border border-slate-400 w-1/2 items-center justify-center">
                <Ionicons name="logo-apple" size={20} color="black" />
                <Text className="font-bold ml-2">Apple</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
