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
    }
});

export const newSleepTracker = async (data, userId) => await prisma.sleepTracker.create({
    data: {
        id: data.id,
        sleepStart: data.sleep_start,
        sleepEnd: data.sleep_end,
        duration: ((12 - data.sleep_end) + data.sleep_start) * 60,
        userId,
    },
    
});