import prisma from "../config/prisma.js";

export const findAllEatTracker = async userId => prisma.eatTracker.findMany({
    where: { userId: userId },
    select: {
        id: true,
        meal_type: true, 
        createdAt: true,
    },
});

export const newEatTracker = async (data, userId) => prisma.eatTracker.create({
    data: {
        id: data.id,
        meal_type: data.meal_type,
        userId: userId,
    },
});