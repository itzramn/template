import { Text } from 'react-native';

type Props = {
  error: string;
  txtClassName?: string;
};

export default function ErrorText({ error, txtClassName }: Props) {
  return (
    <Text
      className={`text-red-500 text-xs ${txtClassName}`}
      style={{ fontFamily: 'Inter' }}
    >
      {error}
    </Text>
  );
}
