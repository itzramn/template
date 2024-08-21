import { useState } from 'react';
import { View, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '../common/ThemedText';
import TextField from '../common/TextField';
import Button from '../common/Button';
import schema, { FormFields } from '@/schemas/resetPassword';
import { AuthAPI } from '@/api/auth.api';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorText from '../common/ErrorText';

export default function ResetPasswordForm({ authAPI }: { authAPI: AuthAPI }) {
  const { username, otp } = useLocalSearchParams<{
    username?: string;
    otp?: string;
  }>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormFields, username: string, otp: string) => {
    const result = await authAPI.resetPassword({
      ...data,
      password: data.newPassword,
      username,
      otp,
    });
    if (!result.success) {
      setError('root', { message: result.message });
      return;
    }
    router.replace({
      pathname: '/sign-in',
      params: { reset: 'true' },
    });
  };

  if (!username || !otp) {
    router.replace('/sign-in');
    return null;
  }

  return (
    <View className="flex-1 justify-between">
      <View className="pt-4 px-4">
        <View className="items-center mb-4">
          <View className="w-full h-48 bg-black rounded-lg" />
        </View>
        <ThemedText
          className="text-2xl text-primary-500"
          style={{ fontFamily: 'QuicksandBold' }}
        >
          Restablecer Contraseña
        </ThemedText>
        <Text
          className="text-lg mb-4 text-gray-400"
          style={{ fontFamily: 'Nunito' }}
        >
          Ingresa tu nueva contraseña.
        </Text>
        <TextField
          name="newPassword"
          placeholder="Nueva Contraseña"
          iconName="key-outline"
          secureTextEntry={!showPassword}
          control={control}
          error={errors.newPassword?.message}
          onIconPress={() => setShowPassword(!showPassword)}
        />
        <TextField
          name="confirmPassword"
          placeholder="Confirmar nueva contraseña"
          iconName="key-outline"
          secureTextEntry={!showConfirmPassword}
          control={control}
          error={errors.confirmPassword?.message}
          onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </View>
      <View className="px-4 pb-2">
        {errors.root?.message && (
          <ErrorText txtClassName="mb-1" error={errors.root.message} />
        )}
        <Button
          txtClassName="mb-4"
          onPress={handleSubmit((data) => onSubmit(data, username, otp))}
          isLoading={isSubmitting}
        >
          Restablecer contraseña
        </Button>
        <Button
          color="black"
          variant="light"
          onPress={() => router.replace('/sign-in')}
        >
          Cancelar
        </Button>
      </View>
    </View>
  );
}
