import React, { useState, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Text,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInput as TextInputType,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import { ThemedText } from '@/components/common/ThemedText';
import Button from '@/components/common/Button';
import { useThemeColor } from '@/hooks/useThemeColor';
import { AuthAPI } from '@/api/auth.api';
import ErrorText from '@/components/common/ErrorText';

const authAPI = new AuthAPI();

export default function VerifyCode() {
  const { username } = useLocalSearchParams<{ username?: string }>();

  const [code, setCode] = useState(['', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const refs = useRef<(TextInputType | null)[]>([]);
  const textColor = useThemeColor({}, 'text');

  const handleChangeText = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.charAt(text.length - 1);
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 4) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async (username: string) => {
    const codeValue = code.join('');
    setLoading(true);
    const result = await authAPI.verifyPassword(username, codeValue);
    setLoading(false);
    if (!result.success) {
      setError(result.message);
      return;
    }
    router.replace({
      pathname: '/reset-password',
      params: { username, otp: codeValue },
    });
  };

  if (!username) {
    router.replace('/recover-password');
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedSafeAreaView className="flex flex-1 justify-between">
        <View className="pt-4 px-4">
          <View className="items-center mb-4">
            <View className="w-full h-48 bg-black rounded-lg" />
          </View>
          <ThemedText
            className="text-2xl text-primary-500"
            style={{ fontFamily: 'QuicksandBold' }}
          >
            Verificar código
          </ThemedText>
          <Text
            className="text-lg mb-4 text-gray-400"
            style={{ fontFamily: 'Nunito' }}
          >
            Ingresa el código de 5 dígitos que recibiste en tu correo.
          </Text>
          <View className="flex flex-row justify-between mb-4">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (refs.current[index] = el)}
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(
                  e: NativeSyntheticEvent<TextInputKeyPressEventData>
                ) => handleBackspace(e.nativeEvent.key, index)}
                keyboardType="number-pad"
                maxLength={1}
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 10,
                  textAlign: 'center',
                  fontSize: 24,
                  paddingVertical: 10,
                  width: 50,
                  color: textColor,
                }}
              />
            ))}
          </View>
        </View>
        <View className="px-4 pb-2">
          {error && <ErrorText txtClassName="mb-1" error={error} />}
          <Button
            txtClassName="mb-4"
            onPress={() => {
              handleVerifyCode(username);
            }}
            isLoading={loading}
          >
            Siguiente
          </Button>
          <Button
            color="black"
            variant="light"
            onPress={() => router.replace('/recover-password')}
          >
            Regresar
          </Button>
        </View>
      </ThemedSafeAreaView>
    </TouchableWithoutFeedback>
  );
}
