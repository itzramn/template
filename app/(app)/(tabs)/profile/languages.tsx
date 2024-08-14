import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function Languages() {
  const [selected, setSelected] = useState('es');

  return (
    <View className="px-4 py-1">
      <View className="-mx-3 mb-1">
        <Language
          name="Inglés"
          selected={selected === 'en'}
          onSelect={() => setSelected('en')}
        />
      </View>
      <View className="-mx-3 mb-1">
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
      <View className="p-4 bg-white rounded-md flex flex-row justify-between items-center min-h-[64px]">
        <Text>{name}</Text>
        {selected && (
          <Ionicons name="checkmark-circle" size={24} color="green" />
        )}
      </View>
    </Pressable>
  );
}
