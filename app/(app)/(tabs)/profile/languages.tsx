import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Languages() {
  const [selected, setSelected] = useState('es');

  return (
    <View className="px-4 py-1">
      <View className="-mx-4">
        <Language
          name="Inglés"
          selected={selected === 'en'}
          onSelect={() => setSelected('en')}
        />
      </View>
      <View className="-mx-4">
        <Language
          name="Español"
          selected={selected === 'es'}
          onSelect={() => setSelected('es')}
        />
      </View>
    </View>
  );
}

interface Props {
  name: string;
  onSelect: () => void;
  selected?: boolean;
}

function Language({ name, onSelect, selected = false }: Props) {
  return (
    <Pressable onPress={onSelect}>
      <View className="p-4 border-b border-slate-400 flex flex-row justify-between items-center min-h-[64px]">
        <Text>{name}</Text>
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
