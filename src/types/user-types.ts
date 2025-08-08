export interface User {
  user: {
    id: number;
    username: string;
    email: string;
    name: string;
    token?: string | null;
  };
}

export interface UserRegister  {
  username: string;
  email: string;
  name: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export type UserId = number;
export interface UserUpdate {
  username?: string;
  email?: string;
  password?: string;
  name?: string;
}
