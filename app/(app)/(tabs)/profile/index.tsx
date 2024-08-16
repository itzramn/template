import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Switch from 'react-native-ui-lib/switch';
import { Ionicons } from '@expo/vector-icons';
import { useSession } from '../../../../context/ctx';
import { router } from 'expo-router';
import { SquircleView } from 'react-native-figma-squircle';

export default function Profile() {
  const { signOut } = useSession();
  return (
    <SafeAreaView className="flex flex-1 items-center justify-between px-4 py-2">
      <View className="w-full">
        <View className="mb-4">
          <User />
        </View>
        <View className="w-full">
          <Preferences />
        </View>
      </View>

      <View className="w-full">
        <ActionButton
          title="Cambiar contraseña"
          onPress={() => {
            router.push('/(app)/profile/change-password');
          }}
          styleClass="bg-black mb-2"
        />
        <ActionButton
          title="Cerrar sesión"
          onPress={signOut}
          styleClass="bg-red-500"
        />
      </View>
    </SafeAreaView>
  );
}

function User() {
  return (
    <View>
      <View className="bg-black rounded-full w-[80px] h-[80px] mb-2 mx-auto" />
      <Text className="text-2xl text-center">Dwit México</Text>
      <Text className="text-center text-slate-500">dwit@outlook.com</Text>
    </View>
  );
}

function Preferences() {
  return (
    <View>
      <View className="mb-4">
        <Text className="text-left text-slate-500 text-xs font-semibold">
          Preferencias
        </Text>
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

          <PreferenceItem
            text="Tema"
            value="Sistema"
            icon="color-palette-outline"
          />

          <PreferenceItemSwitcher
            text="Notificaciones"
            value="Activadas"
            icon="notifications-outline"
          />
          <PreferenceItemSwitcher
            text="Autenticación biométrica"
            value="Activadas"
            icon="finger-print-outline"
          />
        </View>
      </View>
      <View>
        <Text className="text-left text-slate-500 text-xs font-semibold">
          Soporte
        </Text>
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
      <Text>{text}</Text>
      <View className="ml-auto flex flex-row items-center">
        <Text className="text-slate-500">{value}</Text>
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
      <Text className="mr-auto">{text}</Text>
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

type ActionButtonProps = {
  title: string;
  onPress?: () => void;
  styleClass: string;
};

function ActionButton({ title, onPress, styleClass }: ActionButtonProps) {
  return (
    <Pressable
      className={`p-4 rounded-full w-full items-center mb-4 ${styleClass}`}
      onPress={onPress}
    >
      <Text className="text-white">{title}</Text>
    </Pressable>
  );
}

//bg-slate-300 = #cbd5e1
//bg-slate-500 = #64748b
//bg-slate-600 = #475569
