import prisma from '../config/prisma.js';

export const findAllScreenTime = async userId => await prisma.screenTimeTracker.findMany({
    where: { userId: userId },
    select: {
        id: true,
        durationMinutes: true,
        createdAt: true,
    },
});

export const findScreenTimeById = async (screenTimeId, userId) => await prisma.screenTimeTracker.findFirst({
    where: {
        AND: [
            { id: screenTimeId },
            { userId: userId },
        ],
    },
    select: {
        id: true,
        durationMinutes: true,
        createdAt: true,
    },
});

export const newScreenTime = async data => await prisma.screenTimeTracker.create({
    data: { 
        id: data.id,
        durationMinutes: data.duration_minutes,
        userId: data.userId,
    },
});