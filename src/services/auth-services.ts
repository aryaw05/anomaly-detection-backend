import {
  registerUserValidation,
  loginUserValidation,
} from "../validation/auth-schema.js";
import { validate } from "../validation/validate.js";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { prisma } from "../application/database.js";
import type { UserRegister, UserLogin } from "../types/auth-types.js";
import type { User } from "../types/user-types.js";

const register = async (request: UserRegister): Promise<User> => {
  // validasi request
  const user = validate(registerUserValidation, request);

  const existingUserByUsername = await prisma.user.count({
    where: {
      username: user.username,
    },
  });

  // cek username
  if (existingUserByUsername > 0) {
    throw new ResponseError(400, "Username already exists");
  }

  const existingUserByEmail = await prisma.user.count({
    where: {
      email: user.email,
    },
  });

  // cek email
  if (existingUserByEmail > 0) {
    throw new ResponseError(400, "Email already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(user.password, 12);

  // create user
  const newUser = await prisma.user.create({
    data: {
      username: user.username,
      email: user.email,
      name: user.name,
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
    },
  });

  // return user tanpa token
  return {
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      token: null,
    },
  };
};

const login = async (request: UserLogin): Promise<User> => {
  // validasi request
  const loginData = validate(loginUserValidation, request);

  // cari username
  const user = await prisma.user.findFirst({
    where: {
      username: loginData.username,
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      password: true,
      role: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Invalid username or password");
  }

  // verif password
  const isPasswordValid = await bcrypt.compare(
    loginData.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, "Invalid username or password");
  }

  // generate token
  const token = uuid();
  const tokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  // update user dengan token
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      token: token,
      tokenExpiresAt: tokenExpiresAt,
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
      token: true,
    },
  });

  // return user dengan token
  return {
    user: {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      token: updatedUser.token,
    },
  };
};

const logout = async (userId: number): Promise<void> => {
  // hapus token dari database
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      token: null,
      tokenExpiresAt: null,
    },
  });
};

export default { register, login, logout };
