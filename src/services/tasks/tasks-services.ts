import { prisma } from "../../application/database";
import { getTaskById, RemoveTask, Tasks } from "../../types/tasks-type";
import {
  addTaskValidatation,
  removeTaskValidation,
} from "../../validation/tasks-schema";
import { validate } from "../../validation/validate";

const add = async (task: Tasks): Promise<Tasks> => {
  // validate task request
  const taskData = validate(addTaskValidatation, task);
  // Simulate adding task to database
  const newTask = await prisma.tasks.create({
    data: taskData,
    select: {
      id: true,
      tasks: true,
      status: true,
      id_infrastructure_detail: true,
      id_anomaly: true,
      id_user: true,
      created_at: true,
      updated_at: true,
    },
  });
  // Return the newly created task
  return newTask;
};

const getDataById = async (data: getTaskById): Promise<Tasks> => {
  //validate id
  const result = validate(removeTaskValidation, data);
  // Check if the task exists
  const taskInDatabase = await prisma.tasks.findUnique({
    where: {
      id: result.id,
      id_user: result.id_user,
    },
    select: {
      id: true,
      tasks: true,
      status: true,
      created_at: true,
      updated_at: true,
      infrastructure_detail: {
        select: {
          infrastructure_name: true,
          latitude: true,
          longitude: true,
          infrastructure_type: {
            select: {
              infrastructure_type: true,
            },
          },
          upt: {
            select: {
              upt_name: true,
            },
          },
        },
      },
      anomaly: {
        select: {
          anomaly_category: true,
        },
      },
    },
  });
  if (taskInDatabase === null) {
    throw new Error("Task not found");
  }
  // Return the task data
  return taskInDatabase;
};

const remove = async (data: RemoveTask): Promise<void> => {
  //validate id
  const result = validate(removeTaskValidation, data);
  // Check if the task exists
  const taskInDatabase = await prisma.tasks.findUnique({
    where: {
      id: result.id,
      id_user: result.id_user,
    },
  });
  if (taskInDatabase === null) {
    throw new Error("Task not found");
  }
  // Delete the task
  await prisma.tasks.delete({
    where: {
      id: result.id,
      id_user: result.id_user,
    },
  });
};
export default {
  add,
  remove,
  getDataById,
  getAllData,
};
