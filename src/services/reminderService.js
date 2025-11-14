import { nanoid } from "nanoid";
import { findAllEatTracker } from "../repositories/eatTrackerRepository.js";
import {
  createReminder,
  findUserReminder,
} from "../repositories/reminderRepository.js";
import { findAllScreenTime } from "../repositories/screenTimeRepository.js";
import { findAllSleepTracker } from "../repositories/sleepTrackerRepository.js";
import { dateInputIso } from "../utils/dateIso.js";
import { updateReminderUser } from "../repositories/reminderRepository.js";

export const generateReminder = async (userId, dateInput) => {
  const dataTemp = {};

  const dateFromUser = new Date(dateInput).toISOString().split("T")[0];

  const getSleepHoursDaily = await findAllSleepTracker(userId);
  const getEatDaily = await findAllEatTracker(userId);
  const getScreenTimeDaily = await findAllScreenTime(userId);

  const sleepHoursDaily = getSleepHoursDaily
    .filter((sl) => sl.createdAt.toISOString().split("T")[0] === dateFromUser)
    .reduce((total, sl) => total + sl.duration, 0);
  const eatDaily = getEatDaily.filter(
    (sl) => sl.createdAt.toISOString().split("T")[0] === dateFromUser
  ).length;
  const screenTimeDaily = getScreenTimeDaily
    .filter((st) => st.createdAt.toISOString().split("T")[0] === dateFromUser)
    .reduce((total, st) => total + st.duration, 0);

  if (!(sleepHoursDaily && eatDaily && screenTimeDaily))
    throw new Error(`Reminder will create if you has input all tracker!`);

  if (sleepHoursDaily >= 8) {
    dataTemp.sleepStatus = "Good";
    dataTemp.sleepMessage = "Jam tidur kamu bagus, pertahankan!";
  } else {
    dataTemp.sleepStatus = "Bad";
    dataTemp.sleepMessage =
      "Coba tidur lebih awal supaya durasi tidurmu cukup.";
  }

  if (eatDaily >= 2) {
    dataTemp.eatStatus = "Good";
    dataTemp.eatMessage = "Pola makan kamu baik, pertahankan!";
  } else {
    dataTemp.eatStatus = "Bad";
    dataTemp.eatMessage = "Jangan malas makan ya! Jumlah makan mu kurang";
  }

  if (screenTimeDaily <= 8) {
    dataTemp.screenTimeStatus = "Good";
    dataTemp.screenTimeMessage = "Screen time kamu bagus, pertahankan!";
  } else {
    dataTemp.screenTimeStatus = "Bad";
    dataTemp.screenTimeMessage = "Kurangi waktu main hp kamu ya!";
  }

  const date = dateInputIso(dateFromUser);
  const data = { id: nanoid(), ...dataTemp, date };
  const insertData = await createReminder(data, userId);
  return insertData;
};

export const getReminder = async (userId) => {
  const result = await findUserReminder(userId);
  return result;
};

export const updateReminder = async (userId, dateInput) => {
  const dateFromUser = new Date(dateInput).toISOString().split("T")[0];

  const userReminderToday = (await findUserReminder(userId)).find(
    (r) => r.createdAt.toISOString().split("T")[0] === dateFromUser
  );

  // hitung ulang semua tracker
  const getSleepHoursDaily = await findAllSleepTracker(userId);
  const getEatDaily = await findAllEatTracker(userId);
  const getScreenTimeDaily = await findAllScreenTime(userId);

  const sleepHoursDaily = getSleepHoursDaily
    .filter((sl) => sl.createdAt.toISOString().split("T")[0] === dateFromUser)
    .reduce((total, sl) => total + sl.duration, 0);

  const eatDaily = getEatDaily.filter(
    (sl) => sl.createdAt.toISOString().split("T")[0] === dateFromUser
  ).length;

  const screenTimeDaily = getScreenTimeDaily
    .filter((st) => st.createdAt.toISOString().split("T")[0] === dateFromUser)
    .reduce((total, st) => total + st.duration, 0);

  const updatedData = {};

  if (sleepHoursDaily >= 8) {
    updatedData.sleepStatus = "Good";
    updatedData.sleepMessage = "Jam tidur kamu bagus, pertahankan!";
  } else {
    updatedData.sleepStatus = "Bad";
    updatedData.sleepMessage =
      "Coba tidur lebih awal supaya durasi tidurmu cukup.";
  }

  if (eatDaily >= 2) {
    updatedData.eatStatus = "Good";
    updatedData.eatMessage = "Pola makan kamu baik, pertahankan!";
  } else {
    updatedData.eatStatus = "Bad";
    updatedData.eatMessage = "Jangan malas makan ya! Jumlah makan mu kurang";
  }

  if (screenTimeDaily <= 8) {
    updatedData.screenTimeStatus = "Good";
    updatedData.screenTimeMessage = "Screen time kamu bagus, pertahankan!";
  } else {
    updatedData.screenTimeStatus = "Bad";
    updatedData.screenTimeMessage = "Kurangi waktu main hp kamu ya!";
  }

  await updateReminderUser(userId, userReminderToday.date, updatedData); // ini kamu bikin repo sendiri
};
