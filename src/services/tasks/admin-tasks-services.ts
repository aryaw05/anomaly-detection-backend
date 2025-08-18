import { prisma } from "../../application/database";
import { ResponseError } from "../../error/response-error";
import {
  getAndFilterTask,
  getTaskById,
  RemoveTask,
  Tasks,
  taskUpdate,
} from "../../types/tasks-type";
import {
  addTaskValidatation,
  getTaskValidationWithFilter,
  removeTaskValidation,
  updateTaskValidation,
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
      created_at: true,
      updated_at: true,
      anomaly: {
        select: {
          anomaly_category: true,
        },
      },
    },
  });
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
    throw new ResponseError(404, "Task not found");
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
    throw new ResponseError(404, "Task not found");
  }
  // Delete the task
  await prisma.tasks.delete({
    where: {
      id: result.id,
      id_user: result.id_user,
    },
  });
};

// get all data with pagination & filter
const getAllData = async (
  request: {
    task_name?: string;
    page: number;
    size: number;
  },
  userId: number
): Promise<getAndFilterTask> => {
  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  request = validate(getTaskValidationWithFilter, request);

  const skip = (request.page - 1) * request.size;

  type FilterType = {
    id_user?: number;
    tasks?: {
      contains: string;
    };
  };

  const filters: FilterType[] = [];
  filters.push({
    id_user: userId,
  });

  if (request.task_name) {
    filters.push({
      tasks: {
        contains: request.task_name,
      },
    });
  }
  // where: { AND: filters } pada Prisma digunakan untuk menggabungkan banyak kondisi pencarian sekaligus, dan semuanya harus terpenuhi (logika AND) agar sebuah data dianggap cocok.

  const tasks = await prisma.tasks.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prisma.tasks.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: tasks,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

const update = async (task: taskUpdate, userId: number): Promise<Tasks> => {
  const result = validate(updateTaskValidation, task);

  const taskInDatabase = await prisma.tasks.findUnique({
    where: {
      id: result.id,
      id_user: userId,
    },
  });

  if (taskInDatabase === null) {
    throw new ResponseError(404, "Task not found");
  }

  const data: Partial<taskUpdate> = {};
  if (task.status) {
    data.status = task.status;
  }
  if (task.tasks) {
    data.tasks = task.tasks;
  }

  return await prisma.tasks.update({
    where: {
      id: result.id,
      id_user: userId,
    },
    data: data,
  });
};
export default {
  getAllData,
  add,
  remove,
  getDataById,
  update,
};
