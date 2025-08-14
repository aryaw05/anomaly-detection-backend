import { prisma } from "../../application/database";
import { Tasks } from "../../types/tasks-type";

const getDataById = async (taskId: number): Promise<Tasks | null> => {
  const task = await prisma.tasks.findUnique({
    where: {
      id: taskId,
    },
    select: {
      id: true,
      tasks: true,
      status: true,
      created_at: true,
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
    },
  });

  if (task === null) throw new Error("Task not found");
  return task;
};

export default {
  getDataById,
};
