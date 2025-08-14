import { prisma } from "../application/database";
import { InfrastructureDetail } from "../types/infrasctructure-type";

const getAllData = async (): Promise<InfrastructureDetail[]> => {
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

export default {
  getAllData,
};
