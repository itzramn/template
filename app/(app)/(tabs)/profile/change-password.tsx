import { useState } from 'react';
import { View } from 'react-native';
import Button from '@/components/common/Button';
import TextField from '@/components/common/TextField';
import { ThemedView } from '@/components/common/ThemedView';

export default function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <ThemedView className="px-4 py-2 flex flex-1 items-center">
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
        <Button color="primary">Guardar</Button>
      </View>
    </ThemedView>
  );
}
