import { router } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import TextField from '@/components/common/TextField';
import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import { ThemedText } from '@/components/common/ThemedText';
import Button from '@/components/common/Button';

export default function RecoverPassword() {
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
          Recuperar contraseña
        </ThemedText>
        <Text
          className="text-lg mb-4 text-gray-400"
          style={{ fontFamily: 'Nunito' }}
        >
          Ingresa tu correo electrónico para recibir un código de verificación.
        </Text>
        <TextField id="email" placeholder="Correo" iconName="mail-outline" />
      </View>
      <View className="px-4 pb-2">
        <Button
          txtClassName="mb-4"
          onPress={() => router.replace('/verify-code')}
        >
          Solicitar código
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
