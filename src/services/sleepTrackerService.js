import { nanoid } from "nanoid";
import {
  findAllSleepTracker,
  findSleepTrackerById,
  newSleepTracker,
  updateSleepTracker,
} from "../repositories/sleepTrackerRepository.js";

export const getAllSleepTracker = async (userId) => {
  const sleepTracker = await findAllSleepTracker(userId);
  return sleepTracker;
};

export const getSleepTrackerById = async (sleepId, userId) => {
  const result = await findSleepTrackerById(sleepId, userId);
  if (!result) throw new Error(`Sleep id ${sleepId} not found!`);
  const date = result.createdAt.toLocaleDateString();
  return { ...result, date };
};

export const averageSleepTracker = async (userId, username) => {
  const date = new Date();
  const dateNow = date.toLocaleDateString();
  const oneWeekAgo = `${date.getDate() - 7}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const result = await findAllSleepTracker(userId);
  if (!result.length)
    throw new Error(`${username} does not have any sleep tracker!`);
  const filterWeekly = result.filter(
    (s) =>
      s.createdAt.toLocaleDateString() >= oneWeekAgo &&
      s.createdAt.toLocaleDateString() <= dateNow
  );
  const averageSleep = (
    filterWeekly.reduce((total, d) => total + d.duration, 0) /
      filterWeekly.length
  ).toFixed(1);
  return parseFloat(averageSleep);
};

export const addSleepTracker = async (data, userId) => {
  const { sleep_start, sleep_end } = data;

  // Validasi range jam
  if (
    sleep_start < 0 ||
    sleep_start >= 24 ||
    sleep_end < 0 ||
    sleep_end >= 24
  ) {
    throw new Error("sleep_start and sleep_end must be between 0 and 23");
  }

  // Hitung durasi
  let sleepDuration = sleep_end - sleep_start;
  if (sleepDuration < 0) sleepDuration += 24;
  if (sleep_start === sleep_end) sleepDuration = 0;

  const inputData = {
    id: nanoid(),
    sleepDuration,
    ...data,
  };

  const result = await newSleepTracker(inputData, userId);
  return result;
};

export const updateSleepTrackerById = async (data, sleepId, userId) => {
  const isExist = await findSleepTrackerById(sleepId, userId);
  if (!isExist)
    throw new Error(`Sleep with id ${sleepId} at user id ${userId} not found!`);

  // Ambil nilai terbaru kalau diupdate, kalau ga ya pakai nilai lama
  const start = data.sleep_start ?? isExist.sleepStart;
  const end = data.sleep_end ?? isExist.sleepEnd;

  // Validasi range jam
  if (start < 0 || start >= 24 || end < 0 || end >= 24) {
    throw new Error("sleep_start and sleep_end must be between 0 and 23");
  }

  // Hitung durasi (handle kasus tidur lewat tengah malam)
  let duration = end - start;
  if (duration < 0) duration += 24;
  if (duration === 24) duration = 0;

  const updateData = {
    sleepStart: start,
    sleepEnd: end,
    duration,
  };

  const result = await updateSleepTracker(updateData, sleepId, userId);
  return result;
};
