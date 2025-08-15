import { prisma } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  Infrastructure,
  InfrastructureDetail,
} from "../types/infrasctructure-type";

const getAllData = async (): Promise<Infrastructure[]> => {
  return await prisma.detail_infrastructure.findMany({
    select: {
      id: true,
      infrastructure_name: true,
      latitude: true,
      longitude: true,
      infrastructure_task: {
        select: {
          status: true,
          tasks: true,
          created_at: true,
        },
      },
      infrastructure_type: {
        select: {
          infrastructure_type: true,
        },
      },
    },
  });
};

export const getDataById = async (
  taskId: number
): Promise<InfrastructureDetail | null> => {
  const infrasctructure = await prisma.detail_infrastructure.findUnique({
    where: {
      id: taskId,
    },
    select: {
      id: true,
      infrastructure_name: true,
      infrastructure_task: {
        select: {
          status: true,
          tasks: true,
          created_at: true,
          anomaly: {
            select: {
              anomaly_category: true,
            },
          },
        },
      },

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
  });

  if (infrasctructure === null) {
    throw new ResponseError(404, `Infrastructure  not found`);
  }
  return infrasctructure;
};

export default {
  getAllData,
  getDataById,
};
