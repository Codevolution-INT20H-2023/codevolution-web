import { AuthResponse, LoginPayload, SignupPayload } from '@/types/auth';

class Auth {
  async login(data: LoginPayload): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      access_token: `${data.email}|${data.password}`,
      refresh_token: `${data.email}|${data.password}__refresh`,
    };
  }

  async signup(data: SignupPayload): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      refresh_token: `${data.email}|${data.password}`,
      access_token: `${data.email}|${data.password}__refresh`,
    };
  }
}

const AuthService = new Auth();
export default AuthService;
