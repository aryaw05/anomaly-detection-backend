import { prisma } from "../../application/database";
import { taskStatusUpdate, taskUpdate } from "../../types/tasks-type";
import { updateStatusTaskValidation } from "../../validation/tasks-schema";
import { validate } from "../../validation/validate";

const update = async (
  task: taskUpdate,
  userId: number
): Promise<taskStatusUpdate> => {
  const result = validate(updateStatusTaskValidation, task);
  await prisma.log_solve.create({
    data: {
      id_task: result.id,
      status: result.status,
      note: result.note || null,
      id_user: userId,
    },
  });
  return await prisma.tasks.update({
    where: {
      id: result.id,
    },
    data: {
      status: result.status,
    },
    select: {
      id: true,
      status: true,
      infrastructure_detail: {
        select: {
          infrastructure_name: true,
        },
      },
    },
  });
};

export default { update };
