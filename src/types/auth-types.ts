// register req
export interface UserRegister {
  username: string;
  email: string;
  name: string;
  password: string;
}

// login req
export interface UserLogin {
  username: string;
  password: string;
}

// auth res ke controller
export interface AuthResponse {
  user: {
    id: number;
    username: string;
    email: string;
    name: string;
    role?: string | null;
    token?: string | null;
  };
}

// user & token
export interface UserWithToken {
  id: number;
  username: string;
  email: string;
  name: string;
  role?: string | null;
  token: string | null;
  tokenExpiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// logout res
export interface LogoutResponse {
  message: string;
}
