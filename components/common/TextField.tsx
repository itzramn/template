import { View, TextInput, Pressable, TextInputProps, Text } from 'react-native';
import { Control, useController } from 'react-hook-form';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';

type TextFieldProps = TextInputProps & {
  iconName: keyof typeof Ionicons.glyphMap;
  control?: Control<any, any>;
  name?: string;
  error?: string;
  onIconPress?: () => void;
};

export default function TextField({
  iconName,
  control = undefined,
  name = '',
  error,
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
    <View className="mb-4">
      <View
        className={`flex flex-row items-center border rounded-xl border-slate-400 ${onIconPress ? 'pl-4 pr-4' : 'pl-4'}`}
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
      {error && (
        <Text
          className="text-red-500 text-xs mt-1"
          style={{ fontFamily: 'Inter' }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
