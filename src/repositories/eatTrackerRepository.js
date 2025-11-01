import prisma from "../config/prisma.js";

export const findAllEatTracker = async (userId) =>
  prisma.eatTracker.findMany({
    where: { userId: userId },
    select: {
      id: true,
      meal_type: true,
      createdAt: true,
    },
  });

export const findEatTracker = async (userId, eatId) =>
  await prisma.eatTracker.findFirst({
    where: {
      AND: [{ id: eatId }, { userId: userId }],
    },
    select: {
      id: true,
      meal_type: true,
      createdAt: true,
    },
  });

export const newEatTracker = async (data, userId) =>
  prisma.eatTracker.create({
    data: {
      id: data.id,
      meal_type: data.meal_type,
      createdAt: data.date,
      userId: userId,
    },
  });

export const updateEatTracker = async (updateData, userId, eatId) =>
  await prisma.eatTracker.update({
    where: { id: eatId, userId: userId },
    data: updateData,
    select: {
      id: true,
      meal_type: true,
      createdAt: true,
    },
  });
