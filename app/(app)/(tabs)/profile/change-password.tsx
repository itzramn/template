import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export default function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <View className="px-4 py-2 flex flex-1 items-center">
      <View className="w-full">
        <View
          className={`flex flex-row items-center border rounded-xl mb-4 border-slate-400  pl-4 pr-4`}
        >
          <Ionicons name="key-outline" size={20} color="black" />
          <TextInput
            className="flex-1 p-4"
            placeholder="Contraseña actual"
            secureTextEntry={!showCurrentPassword}
          />

          <Pressable
            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            <Ionicons
              name={showCurrentPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="black"
            />
          </Pressable>
        </View>
        <View
          className={`flex flex-row items-center border rounded-xl mb-4 border-slate-400  pl-4 pr-4`}
        >
          <Ionicons name="lock-closed-outline" size={20} color="black" />
          <TextInput
            className="flex-1 p-4"
            placeholder="Nueva contraseña"
            secureTextEntry={!showNewPassword}
          />

          <Pressable onPress={() => setShowNewPassword(!showNewPassword)}>
            <Ionicons
              name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="black"
            />
          </Pressable>
        </View>
        <View
          className={`flex flex-row items-center border rounded-xl mb-4 border-slate-400  pl-4 pr-4`}
        >
          <Ionicons name="lock-closed-outline" size={20} color="black" />
          <TextInput
            className="flex-1 p-4"
            placeholder="Repetir contraseña"
            secureTextEntry={!showNewPassword}
          />

          <Pressable onPress={() => setShowNewPassword(!showNewPassword)}>
            <Ionicons
              name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="black"
            />
          </Pressable>
        </View>
        <Pressable className="p-4 rounded-full w-full items-center mb-4 bg-red-500 shadow-sm shadow-red-800">
          <Text
            className="text-white font-semibold"
            style={{ fontFamily: 'Nunito' }}
          >
            Guardar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
