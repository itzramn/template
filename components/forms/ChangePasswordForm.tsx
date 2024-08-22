import { Text, View } from 'react-native';
import TextField from '../common/TextField';
import { useState } from 'react';
import Button from '../common/Button';
import { AuthAPI } from '@/api/auth.api';
import { Control, FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { FormFields } from '@/schemas/changePassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '@/schemas/changePassword';
import ErrorText from '../common/ErrorText';

export default function ChangePasswordForm({ api }: { api: AuthAPI }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const result = await api.changePassword(data);
    if (!result.success) {
      setError('root', { message: result.message });
      return;
    }
  };

  return (
    <View className="w-full">
      <Fields control={control} errors={errors} />
      <Button
        color="primary"
        onPress={handleSubmit(onSubmit)}
        isLoading={isSubmitting}
      >
        Guardar
      </Button>
      {errors.root?.message && (
        <ErrorText error={errors.root.message} txtClassName="mt-1" />
      )}
      {isSubmitSuccessful && (
        <Text className="text-green-500 text-xs mt-1">
          ¡Contraseña actualizada correctamente!
        </Text>
      )}
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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <>
      <TextField
        name="currentPassword"
        placeholder="Contraseña actual"
        iconName="key-outline"
        secureTextEntry={!showCurrentPassword}
        control={control}
        error={errors.currentPassword?.message}
        onIconPress={() => setShowCurrentPassword(!showCurrentPassword)}
      />
      <TextField
        name="newPassword"
        placeholder="Nueva contraseña"
        iconName="lock-closed-outline"
        secureTextEntry={!showNewPassword}
        control={control}
        error={errors.newPassword?.message}
        onIconPress={() => setShowNewPassword(!showNewPassword)}
      />
      <TextField
        name="confirmPassword"
        placeholder="Repetir contraseña"
        iconName="lock-closed-outline"
        secureTextEntry={!showNewPassword}
        control={control}
        error={errors.confirmPassword?.message}
        onIconPress={() => setShowNewPassword(!showNewPassword)}
      />
    </>
  );
}
