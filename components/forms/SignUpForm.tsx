import { useState } from 'react';
import TextField from '../common/TextField';
import { Control, FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { FormFields, schema } from '@/schemas/signIn';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import ErrorText from '../common/ErrorText';
import { ThemedText } from '../common/ThemedText';
import Button from '../common/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthAPI } from '@/api/auth.api';

const authAPI = new AuthAPI();

export default function SignUpForm() {
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
    <View className="flex-1 justify-between">
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
        <Fields control={control} errors={errors} />
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
    </View>
  );
}

type Errors = FieldErrors<FormFields>;
type InputControl = Control<FormFields, any>;
type FieldsProps = {
  control: InputControl;
  errors: Errors;
};

function Fields({ control, errors }: FieldsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      <TextField
        name="name"
        placeholder="Nombre"
        iconName="id-card-outline"
        control={control}
        error={errors.name?.message}
      />
      <TextField
        name="username"
        placeholder="Usuario"
        iconName="person-outline"
        control={control}
        error={errors.username?.message}
      />
      <TextField
        name="email"
        placeholder="Correo"
        iconName="mail-outline"
        control={control}
        error={errors.email?.message}
      />
      <TextField
        name="password"
        placeholder="Contraseña"
        iconName="key-outline"
        secureTextEntry={!showPassword}
        control={control}
        error={errors.password?.message}
        onIconPress={() => setShowPassword(!showPassword)}
      />
      <TextField
        name="confirmPassword"
        placeholder="Confirmar contraseña"
        iconName="key-outline"
        secureTextEntry={!showConfirmPassword}
        control={control}
        error={errors.confirmPassword?.message}
        onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
      />
    </>
  );
}
