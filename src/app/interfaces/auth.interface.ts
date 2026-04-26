// Types for better type safety
export interface AuthResponse {
  token?: string;
  user?: UserPayload;
  message?: string;
}

export interface UserPayload {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
  iat: number;
  exp: number;
}

export interface LoginError {
  error: string;
  message?: string;
}

// Google OAuth response types
export interface GoogleCredentialResponse {
  credential?: string;
}

export interface GoogleCodeResponse {
  code?: string;
}