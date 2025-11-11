import prisma from "../config/prisma.js";

export const findAllScreenTime = async (userId) =>
  await prisma.screenTimeTracker.findMany({
    where: { userId: userId },
    select: {
      id: true,
      duration: true,
      createdAt: true,
    },
  });

export const findScreenTimeById = async (screenTimeId, userId) =>
  await prisma.screenTimeTracker.findFirst({
    where: {
      AND: [{ id: screenTimeId }, { userId: userId }],
    },
    select: {
      id: true,
      duration: true,
      createdAt: true,
    },
  });

export const newScreenTime = async (data) =>
  await prisma.screenTimeTracker.create({
    data: {
      id: data.id,
      duration: data.duration,
      createdAt: data.date,
      userId: data.userId,
    },
  });

export const updateScreenTime = async (updateData, screenTimeId) =>
  await prisma.screenTimeTracker.update({
    where: {
        id: screenTimeId,
    },
    data: {
      duration: updateData.duration,
    },
    select: {
      id: true,
      duration: true,
      createdAt: true,
    },
  });
