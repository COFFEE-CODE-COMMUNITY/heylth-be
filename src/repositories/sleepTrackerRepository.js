import prisma from "../config/prisma.js";

export const findAllSleepTracker = async userId => await prisma.sleepTracker.findMany({
    where: { userId },
    select: {
        id: true,
        sleepStart: true,
        sleepEnd: true,
        duration: true,
        createdAt: true,
    },
    orderBy: { createdAt: "desc" },
});

export const findSleepTrackerById = async (sleepId, userId) => prisma.sleepTracker.findUnique({
    where: {
        id: sleepId,
        userId: userId,
    },
    select: {
        id: true,
        sleepStart: true,
        sleepEnd: true,
        duration: true,
        createdAt: true,
    },
})

export const newSleepTracker = async (data, userId) => await prisma.sleepTracker.create({
    data: {
        id: data.id,
        sleepStart: data.sleep_start,
        sleepEnd: data.sleep_end,
        duration: 24 - (data.sleep_start - data.sleep_end),
        userId: userId,
    }, 
});