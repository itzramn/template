import { Text, View, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export function Header() {
  const headerTextColor = useThemeColor(
    {
      light: 'white',
      dark: 'black',
    },
    'text'
  );
  return (
    <View className="p-3 h-1/3 justify-end">
      <View className="items-center">
        <Image
          className="w-24 h-24"
          source={{
            uri: 'https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-black-and-white.png',
          }}
        />
      </View>
      <Text className="text-2xl font-bold mb-2 text-primary-500">
        Conoce la mejor app de React
      </Text>
      <Text
        className="text-xl"
        style={{
          color: headerTextColor,
        }}
      >
        Inicia sesión para continuar
      </Text>
    </View>
  );
}
