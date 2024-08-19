import { useThemeColor } from '@/hooks/useThemeColor';
import { Stack } from 'expo-router/stack';

export default function Layout() {
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: tintColor,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="languages"
        options={{
          headerShown: true,
          title: 'Selecciona el idioma',
        }}
      />
      <Stack.Screen
        name="theme"
        options={{
          headerShown: true,
          title: 'Selecciona un tema',
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          headerShown: true,
          title: 'Cambiar contraseña',
        }}
      />
    </Stack>
  );
}
