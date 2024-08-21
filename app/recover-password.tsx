import { AuthAPI } from '@/api/auth.api';
import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import Form from '@/components/forms/RecoverPasswordForm';

export default function RecoverPassword() {
  const authAPI = new AuthAPI();
  return (
    <ThemedSafeAreaView className="flex flex-1">
      <Form authAPI={authAPI} />
    </ThemedSafeAreaView>
  );
}
