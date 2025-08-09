import {
  getUserIdValidation,
  updateUserProfileValidation,
} from "../validation/user-schema.js";
import { validate } from "../validation/validate.js";
import { ResponseError } from "../error/response-error.js";
import { prisma } from "../application/database.js";
import type { UserProfileUpdate, User, UserData } from "../types/user-types.js";

const getCurrentUser = async (userId: number): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      token: null, // jangan kirim token ke client
    },
  };
};

const updateCurrentUser = async (
  userId: number,
  request: UserProfileUpdate
): Promise<User> => {
  const updateData = validate(updateUserProfileValidation, request);

  // cek username
  if (updateData.username) {
    const existingUserByUsername = await prisma.user.count({
      where: {
        username: updateData.username,
        NOT: {
          id: userId, // exclude user sekarang
        },
      },
    });

    if (existingUserByUsername > 0) {
      throw new ResponseError(400, "Username already exists");
    }
  }

  // cek email
  if (updateData.email) {
    const existingUserByEmail = await prisma.user.count({
      where: {
        email: updateData.email,
        NOT: {
          id: userId, // exclude email sekarang
        },
      },
    });

    if (existingUserByEmail > 0) {
      throw new ResponseError(400, "Email already exists");
    }
  }

  // Update user in database
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateData,
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
      updatedAt: true,
    },
  });

  return {
    user: {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      token: null,
    },
  };
};

// admin section

const getAllUsers = async (): Promise<UserData[]> => {
  // get all users
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};

const getUserById = async (userId: number): Promise<UserData> => {
  const { id } = validate(getUserIdValidation, { id: userId });

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return user;
};

const deleteUser = async (
  userId: number,
  currentUserId?: number
): Promise<void> => {
  const { id } = validate(getUserIdValidation, { id: userId });

  if (currentUserId === id) {
    throw new ResponseError(400, "Cannot delete your own account");
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  await prisma.user.delete({
    where: { id },
  });
};

export default {
  getCurrentUser,
  updateCurrentUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
