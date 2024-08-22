import { AuthAPI } from '@/api/auth.api';
import { ThemedView } from '@/components/common/ThemedView';
import Form from '@/components/forms/ChangePasswordForm';
import { useSession } from '@/context/ctx';

export default function ChangePassword() {
  const { session } = useSession();
  const authAPI = new AuthAPI(session);

  return (
    <ThemedView className="px-4 py-2 flex flex-1 items-center">
      <Form api={authAPI} />
    </ThemedView>
  );
}
