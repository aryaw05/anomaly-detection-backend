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

// update profile req
export interface UserProfileUpdate {
  username?: string;
  email?: string;
  name?: string;
}

// user list res
export interface UserListResponse {
  users: UserData[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// generic api res
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  errors?: string;
}
