import { Text, View, Image, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export function ExternalLogin() {
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
