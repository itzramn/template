import TextField from '@/components/common/TextField';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <View className="px-4 py-2 flex flex-1 items-center">
      <View className="w-full">
        <TextField
          placeholder="Contraseña actual"
          iconName="key-outline"
          secureTextEntry={!showCurrentPassword}
          onIconPress={() => setShowCurrentPassword(!showCurrentPassword)}
        />
        <TextField
          placeholder="Nueva contraseña"
          iconName="lock-closed-outline"
          secureTextEntry={!showNewPassword}
          onIconPress={() => setShowNewPassword(!showNewPassword)}
        />
        <TextField
          placeholder="Repetir contraseña"
          iconName="lock-closed-outline"
          secureTextEntry={!showNewPassword}
          onIconPress={() => setShowNewPassword(!showNewPassword)}
        />

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
