import axiosInstance from '@/services/instance';
import { AuthResponse, LoginPayload, SignupPayload } from '@/types/auth';

class Auth {
  async login(loginPayload: LoginPayload): Promise<AuthResponse> {
    const { data } = await axiosInstance.post<AuthResponse>(
      '/auth/login',
      loginPayload,
    );
    return data;
  }

  async signup(signupPayload: SignupPayload): Promise<AuthResponse> {
    const { data } = await axiosInstance.post<AuthResponse>(
      '/auth/register',
      signupPayload,
    );
    return data;
  }
}

const AuthService = new Auth();
export default AuthService;
