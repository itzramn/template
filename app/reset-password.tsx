import { AuthAPI } from '@/api/auth.api';
import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import Form from '@/components/forms/ResetPasswordForm';
import { useSession } from '@/context/ctx';

export default function ResetPassword() {
  const { session } = useSession();
  const authAPI = new AuthAPI(session);
  return (
    <ThemedSafeAreaView className="flex flex-1">
      <Form api={authAPI} />
    </ThemedSafeAreaView>
  );
}
