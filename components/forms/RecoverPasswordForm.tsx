import { router } from 'expo-router';
import { View, Text } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import TextField from '../common/TextField';
import Button from '../common/Button';
import { useForm } from 'react-hook-form';
import { FormFields, schema } from '@/schemas/recoverPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthAPI } from '@/api/auth.api';
import ErrorText from '../common/ErrorText';

export default function RecoverPasswordForm({ api }: { api: AuthAPI }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: FormFields) => {
    const result = await api.forgotPassword(data.username);
    if (!result.success) {
      setError('root', { message: result.message });
      return;
    }
    router.replace({
      pathname: '/verify-code',
      params: { username: data.username },
    });
  };

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
          Recuperar contraseña
        </ThemedText>
        <Text
          className="text-lg mb-4 text-gray-400"
          style={{ fontFamily: 'Nunito' }}
        >
          Ingresa tu usuario para recibir un código de verificación al correo
          registrado.
        </Text>
        <TextField
          name="username"
          placeholder="Usuario"
          iconName="person-outline"
          control={control}
          error={errors.username?.message}
        />
      </View>
      <View className="px-4 pb-2">
        {errors.root?.message && (
          <ErrorText txtClassName="mb-1" error={errors.root.message} />
        )}
        <Button
          txtClassName="mb-4"
          isLoading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          Solicitar código
        </Button>

        <Button
          color="black"
          variant="light"
          onPress={() => router.replace('/sign-in')}
        >
          Regresar
        </Button>
      </View>
    </View>
  );
}
