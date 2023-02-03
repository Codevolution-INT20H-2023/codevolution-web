export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export type LoginPayload = LoginForm;
export type SignupPayload = Omit<SignupForm, 'confirmPassword'>;

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}
