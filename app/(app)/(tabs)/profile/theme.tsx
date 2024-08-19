import { Pressable, Text, useColorScheme, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemedView } from '@/components/common/ThemedView';
import { ThemedText } from '@/components/common/ThemedText';

export default function Languages() {
  const colorScheme = useColorScheme();
  const { changeTheme } = useTheme();

  return (
    <ThemedView className="px-4 py-1 flex-1">
      <View className="-mx-4">
        <Theme
          name="Claro"
          selected={colorScheme === 'light'}
          onSelect={() => changeTheme('light')}
        />
      </View>
      <View className="-mx-4">
        <Theme
          name="Oscuro"
          selected={colorScheme === 'dark'}
          onSelect={() => changeTheme('dark')}
        />
      </View>
      <View className="-mx-4">
        <Theme
          name="Automático"
          selected={!colorScheme}
          onSelect={() => changeTheme(undefined)}
        />
      </View>
    </ThemedView>
  );
}

type LanguageProps = {
  name: string;
  onSelect: () => void;
  selected?: boolean;
};

function Theme({ name, onSelect, selected = false }: LanguageProps) {
  return (
    <Pressable onPress={onSelect}>
      <View className="p-4 border-b border-slate-400 flex flex-row justify-between items-center min-h-[64px]">
        <ThemedText>{name}</ThemedText>
        {selected && (
          <LottieView
            source={require('@/assets/lotties/checkmark.json')}
            autoPlay
            loop={false}
            speed={2}
            style={{ width: 24, height: 24 }}
          />
        )}
      </View>
    </Pressable>
  );
}
