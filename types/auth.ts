export type SignUpData = {
  username: string;
  password: string;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'employer';
};
