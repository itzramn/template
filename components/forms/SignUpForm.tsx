import { useState } from 'react';
import TextField from '../common/TextField';
import { Control, FieldErrors } from 'react-hook-form';
import { FormFields } from '@/schemas/signIn';

type Errors = FieldErrors<FormFields>;
type InputControl = Control<FormFields, any>;
type Props = {
  control: InputControl;
  errors: Errors;
};

export default function SignUpForm({ control, errors }: Props) {
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
