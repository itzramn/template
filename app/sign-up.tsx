import React from 'react';
import { Text, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import { ThemedText } from '../components/common/ThemedText';
import Button from '@/components/common/Button';
import { AuthAPI } from '@/api/auth.api';
import { FormFields, schema } from '@/schemas/signIn';
import Form from '@/components/forms/SignUpForm';
import ErrorText from '@/components/common/ErrorText';

const authAPI = new AuthAPI();

export default function SignUp() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const result = await authAPI.signUp({
      ...data,
      role: 'admin',
    });
    if (!result.success) {
      setError('root', { message: result.message });
      return;
    }
    router.replace({
      pathname: '/sign-in',
      params: { registered: 'true' },
    });
  };

  return (
    <ThemedSafeAreaView className="flex flex-1 justify-between">
      <View className="pt-4 px-4">
        <ThemedText
          className="text-2xl text-primary-500"
          style={{ fontFamily: 'QuicksandBold' }}
        >
          Regístrate
        </ThemedText>
        <Text
          className="text-lg mb-4 text-gray-400"
          style={{ fontFamily: 'Nunito' }}
        >
          Ingresa los datos que utilizarás para acceder a tu cuenta.
        </Text>
        <Form control={control} errors={errors} />
      </View>
      <View className="px-4 pb-2">
        {errors.root?.message && (
          <ErrorText txtClassName="mb-1" error={errors.root.message} />
        )}
        <Button
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Continuar
        </Button>

        <Button
          color="black"
          variant="light"
          txtClassName="my-4"
          onPress={() => router.replace('/sign-in')}
        >
          Regresar
        </Button>
      </View>
    </ThemedSafeAreaView>
  );
}
