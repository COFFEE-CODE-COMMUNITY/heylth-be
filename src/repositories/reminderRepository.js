import prisma from "../config/prisma.js";

export const findUserReminder = async (userId) =>
  await prisma.reminderTracker.findMany({
    where: {
      userId,
    },
    orderBy: { createdAt: "desc" },
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
      date: inputData.date,
      createdAt: inputData.date,
      updatedAt: inputData.date,
    },
  });

export const updateReminderUser = async (userId, date, updatedData) =>
  await prisma.reminderTracker.update({
    where: {
      userId_date: {
        userId: userId,
        date: date,
      },
    },
    data: {
      sleepStatus: updatedData.sleepStatus,
      eatStatus: updatedData.eatStatus,
      screenTimeStatus: updatedData.screenTimeStatus,
      sleepMessage: updatedData.sleepMessage,
      eatMessage: updatedData.eatMessage,
      screenTimeMessage: updatedData.screenTimeMessage,
    },
  });
