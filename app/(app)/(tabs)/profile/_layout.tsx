import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f2f2f2',
        },
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
        name="change-password"
        options={{
          headerShown: true,
          title: 'Cambiar contraseña',
        }}
      />
    </Stack>
  );
}
