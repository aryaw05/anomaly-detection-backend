// base user data
export interface UserData {
  id: number;
  username: string;
  email: string;
  name: string;
  role?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// user & token
export interface UserWithToken extends UserData {
  token: string | null;
  tokenExpiresAt: Date | null;
}

// user res ke controller
export interface User {
  user: {
    id: number;
    username: string;
    email: string;
    name: string;
    role?: string | null;
    token?: string | null;
  };
}

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
