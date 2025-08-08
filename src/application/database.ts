import { PrismaClient } from "../../prisma/generated/prisma/client";
import { logger } from "./logger.js";

export const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prisma.$on("query", (e: any) => {
  logger.info(e);
});

prisma.$on("error", (e: any) => {
  logger.error(e);
});

prisma.$on("info", (e: any) => {
  logger.info(e);
});

prisma.$on("warn", (e: any) => {
  logger.warn(e);
});
