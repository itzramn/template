import { Ionicons } from '@expo/vector-icons';
import { View, TextInput, Pressable, TextInputProps } from 'react-native';

type TextFieldProps = TextInputProps & {
  iconName: keyof typeof Ionicons.glyphMap;
  id?: string;
  onIconPress?: () => void;
};

export default function TextField({
  iconName,
  secureTextEntry,
  onIconPress,
  ...props
}: TextFieldProps) {
  return (
    <View
      className={`flex flex-row items-center border rounded-xl mb-4 border-slate-400 ${onIconPress ? 'pl-4 pr-4' : 'pl-4'}`}
    >
      <Ionicons name={iconName} size={20} color="black" />
      <TextInput
        className="flex-1 p-4"
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {onIconPress && (
        <Pressable onPress={onIconPress}>
          <Ionicons
            name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="black"
          />
        </Pressable>
      )}
    </View>
  );
}
