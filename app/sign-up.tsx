import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import Form from '@/components/forms/SignUpForm';

export default function SignUp() {
  return (
    <ThemedSafeAreaView className="flex flex-1">
      <Form />
    </ThemedSafeAreaView>
  );
}
