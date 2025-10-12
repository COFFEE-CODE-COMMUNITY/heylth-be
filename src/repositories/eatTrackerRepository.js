import prisma from "../config/prisma.js";

export const findAllEatTracker = userId => prisma.eatTracker.findMany({
    where: { userId: userId },
    select: {
        id: true,
        meal_type: true, 
        createdAt: true,
    },
})