import { AuthAPI } from '@/api/auth.api';
import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import Form from '@/components/forms/ResetPasswordForm';

export default function ResetPassword() {
  const authAPI = new AuthAPI();
  return (
    <ThemedSafeAreaView className="flex flex-1">
      <Form api={authAPI} />
    </ThemedSafeAreaView>
  );
}
