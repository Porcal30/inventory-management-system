export interface User {
  id: string;
  name?: string;
  email: string;
  role: 'admin' | 'user';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name?: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}

export interface AuthResponse {
  token: string;
  user: User;
}