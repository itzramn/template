import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { Control, useController } from 'react-hook-form';
import { View, TextInput, Pressable, TextInputProps } from 'react-native';

type TextFieldProps = TextInputProps & {
  iconName: keyof typeof Ionicons.glyphMap;
  control?: Control<any, any>;
  name?: string;
  onIconPress?: () => void;
};

export default function TextField({
  iconName,
  control = undefined,
  name = '',
  secureTextEntry,
  onIconPress,
  ...props
}: TextFieldProps) {
  const textColor = useThemeColor({}, 'text');

  const { field } = useController({
    control,
    defaultValue: '',
    name,
  });

  return (
    <View
      className={`flex flex-row items-center border rounded-xl mb-4 border-slate-400 ${onIconPress ? 'pl-4 pr-4' : 'pl-4'}`}
    >
      <Ionicons name={iconName} size={20} color={textColor} />
      <TextInput
        className="flex-1 p-4"
        value={field.value}
        onChangeText={field.onChange}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={textColor}
        style={{ color: textColor, fontFamily: 'Inter' }}
        {...props}
      />
      {onIconPress && (
        <Pressable onPress={onIconPress}>
          <Ionicons
            name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={textColor}
          />
        </Pressable>
      )}
    </View>
  );
}
