import prisma from "../config/prisma.js";

export const findAllSleepTracker = async data => await prisma.sleepTracker.findMany({
    where: {
        userId: data.userId,
    }
});