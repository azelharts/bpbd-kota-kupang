export interface SessionData {
  isLoggedIn: boolean;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    username: string;
  };
}