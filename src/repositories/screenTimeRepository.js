import prisma from '../config/prisma.js';

export const findAllScreenTime = async userId => await prisma.screenTimeTracker.findMany({
    where: { userId: userId },
    select: {
        id: true,
        durationMinutes: true,
        createdAt: true,
    },
});