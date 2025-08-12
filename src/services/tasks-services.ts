import { prisma } from "../application/database";
import { RemoveTask, Tasks } from "../types/tasks-type";
import {
  addTaskValidatation,
  removeTaskValidation,
} from "../validation/tasks-schema";
import { validate } from "../validation/validate";

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
};
