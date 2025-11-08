import prisma from "../config/prisma.js";

export const findUserReminder = async (userId) =>
  await prisma.reminderTracker.findMany({
    where: {
      userId,
    },
  });

export const createReminder = async (inputData, userId) =>
  await prisma.reminderTracker.create({
    data: {
      id: inputData.id,
      userId,
      sleepStatus: inputData.sleepStatus,
      eatStatus: inputData.eatStatus,
      screenTimeStatus: inputData.screenTimeStatus,
      sleepMessage: inputData.sleepMessage,
      eatMessage: inputData.eatMessage,
      screenTimeMessage: inputData.screenTimeMessage,
      createdAt: inputData.date,
      updatedAt: inputData.date,
    },
  });
