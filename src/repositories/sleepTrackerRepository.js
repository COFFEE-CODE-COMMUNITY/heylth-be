import prisma from "../config/prisma.js";

export const findAllSleepTracker = async userId => await prisma.sleepTracker.findMany({
    where: { userId },
    select: {
        id: true,
        sleepStart: true,
        sleepEnd: true,
        duration: true,
        createdAt: true,
        userId: true,
    },
    orderBy: { createdAt: "desc" },
});