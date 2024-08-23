import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import Switch from 'react-native-ui-lib/switch';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SquircleView } from 'react-native-figma-squircle';
import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import { ThemedText } from '@/components/common/ThemedText';
import { useSession } from '../../../../context/ctx';
import Button from '@/components/common/Button';

export default function Profile() {
  const { signOut } = useSession();
  return (
    <ThemedSafeAreaView txtClassName="flex flex-1 items-center justify-between px-4 py-4">
      <View className="w-full">
        <View className="mb-4">
          <User />
        </View>
        <View className="w-full">
          <Preferences />
        </View>
      </View>

      <View className="w-full">
        <Button
          txtClassName="mb-2"
          onPress={() => {
            router.push('/(app)/profile/change-password');
          }}
        >
          Cambiar contraseña
        </Button>

        <Button color="danger" onPress={signOut}>
          Cerrar sesión
        </Button>
      </View>
    </ThemedSafeAreaView>
  );
}

function User() {
  return (
    <View>
      <View
        className="rounded-full w-[80px] h-[80px] mb-2 mx-auto"
        style={{
          backgroundColor: '#000',
        }}
      />
      <ThemedText className="text-2xl text-center">Dwit México</ThemedText>
      <ThemedText className="text-center text-slate-500">
        dwit@outlook.com
      </ThemedText>
    </View>
  );
}

function Preferences() {
  const { isBiometricAuth, setIsBiometricAuth } = useSession();

  return (
    <View>
      <View className="mb-4">
        <ThemedText className="text-left text-slate-500 text-xs font-semibold">
          Preferencias
        </ThemedText>
        <View className="mt-1 -mb-2">
          <Pressable
            onPress={() => {
              router.push('/(app)/profile/languages');
            }}
          >
            <PreferenceItem
              text="Idioma"
              value="Español"
              icon="language-outline"
            />
          </Pressable>

          <Pressable
            onPress={() => {
              router.push('/(app)/profile/theme');
            }}
          >
            <PreferenceItem
              text="Tema"
              value="Sistema"
              icon="color-palette-outline"
            />
          </Pressable>

          {/*<PreferenceItemSwitcher
            text="Notificaciones"
            value="Activadas"
            icon="notifications-outline"
          />*/}
          <PreferenceItemSwitcher
            text="Autenticación biométrica"
            value="Activadas"
            icon="finger-print-outline"
          />
        </View>
      </View>
      <View>
        <ThemedText className="text-left text-slate-500 text-xs font-semibold">
          Soporte
        </ThemedText>
        <View className="mt-1 -mb-2">
          <PreferenceItem text="Contáctanos" icon="call-outline" />
          <PreferenceItem
            text="Política de privacidad"
            icon="lock-closed-outline"
          />
        </View>
      </View>
    </View>
  );
}

type PreferenceItemProps = {
  text: string;
  value?: string;
  icon: keyof typeof Ionicons.glyphMap;
};
function PreferenceItem({ text, icon, value = '' }: PreferenceItemProps) {
  return (
    <View className="flex flex-row items-center mb-2">
      <SquircleView
        className="p-2 mr-2"
        squircleParams={{
          cornerSmoothing: 0.7,
          cornerRadius: 10,
          fillColor: '#cbd5e1',
        }}
      >
        <Ionicons name={icon} size={24} color="#475569" />
      </SquircleView>
      <ThemedText>{text}</ThemedText>
      <View className="ml-auto flex flex-row items-center">
        <ThemedText className="text-slate-500">{value}</ThemedText>
        <Ionicons name="chevron-forward" size={24} color="#64748b" />
      </View>
    </View>
  );
}

function PreferenceItemSwitcher({ text, icon }: PreferenceItemProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View className="flex flex-row items-center mb-2">
      <SquircleView
        className="p-2 mr-2"
        squircleParams={{
          cornerSmoothing: 0.7,
          cornerRadius: 10,
          fillColor: '#cbd5e1',
        }}
      >
        <Ionicons name={icon} size={24} color="#475569" />
      </SquircleView>
      <ThemedText className="mr-auto">{text}</ThemedText>
      <Switch
        className=""
        value={isEnabled}
        onValueChange={setIsEnabled}
        thumbColor="#fff"
        offColor="#64748b"
        onColor="#000"
      />
    </View>
  );
}

//bg-slate-300 = #cbd5e1
//bg-slate-500 = #64748b
//bg-slate-600 = #475569
