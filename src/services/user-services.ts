import {
  registerUserValidation,
  loginUserValidation,
  getUserIdValidation,
  updateUserValidation,
} from "../validation/userSchema.js";
import { validate } from "../validation/validate.js";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuid } from "uuid";

import bcrypt from "bcrypt";
import { prisma } from "../application/database.js";
import {
  UserId,
  UserLogin,
  UserRegister,
  UserUpdate,
} from "../types/user-types.js";

const register = async (request: UserRegister) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prisma.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser > 0) {
    throw new ResponseError(404, "Username already exist");
  }
  user.password = await bcrypt.hash(user.password, 10);

  return prisma.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async (request: UserLogin) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prisma.user.findFirst({
    where: {
      username: loginRequest.username,
    },
    select: {
      id: true,
      username: true,
      password: true,
    },
  });
  if (!user) {
    throw new ResponseError(404, "Username or password not found");
  }
  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid)
    throw new ResponseError(404, "Username or password not found");

  // tambah token
  const token = uuid().toString();

  return prisma.user.update({
    data: {
      token,
    },
    where: {
      id: user.id,
    },
    select: {
      token: true,
    },
  });
};

const getUser = async (userId: UserId) => {
  userId = validate(getUserIdValidation, userId);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User Is not found");
  }
  return user;
};
const logout = async (userId: UserId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      token: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User Is not found");
  }
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      token: null,
    },
    select: {
      username: true,
    },
  });
};

const update = async (request: UserUpdate, userId: number) => {
  validate(updateUserValidation, request);

  const totalDataInDatabase = await prisma.user.count({
    where: {
      id: userId,
    },
  });

  if (totalDataInDatabase !== 1) {
    throw new ResponseError(404, "User is not found");
  }

  const data: Partial<UserRegister> = {};
  if (request.password) {
    data.password = await bcrypt.hash(request.password, 10);
  }
  if (request.email) {
    data.email = request.email;
  }
  if (request.name) {
    data.name = request.name;
  }
  if (request.username) {
    data.username = request.username;
  }

  return prisma.user.update({
    where: {
      id: userId,
    },
    data: data,
    select: {
      username: true,
      name: true,
      email: true,
    },
  });
};
export default { register, login, logout, getUser, update };
