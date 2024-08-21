export type SignInData = {
  username: string;
  password: string;
};

export type SignUpData = {
  username: string;
  password: string;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'employer';
};

export type ResetPasswordData = {
  password: string;
  confirmPassword: string;
  otp: string;
  username: string;
};
