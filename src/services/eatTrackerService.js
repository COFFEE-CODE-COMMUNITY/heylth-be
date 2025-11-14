import { nanoid } from "nanoid";
import {
  findAllEatTracker,
  findEatTracker,
  newEatTracker,
  updateEatTracker,
} from "../repositories/eatTrackerRepository.js";
import { dateInputIso } from "../utils/dateIso.js";

export const allEatTracker = async (userId) => {
  const result = await findAllEatTracker(userId);
  return result;
};

export const eatTrackerById = async (userId, eatId) => {
  const resultTemp = await findEatTracker(userId, eatId);
  if (!resultTemp) throw new Error(`Eat with id ${eatId} not found!`);
  const result = {
    ...resultTemp,
    date: resultTemp.createdAt.toLocaleDateString(),
  };
  return result;
};

export const countEatTracker = async (userId) => {
  const date = new Date();
  const dateNow = new Date(date.toISOString());
  const dateWeekAgo = new Date(
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 7}`
  );
  const resultTemp = await findAllEatTracker(userId);
  if (!resultTemp.length) return 0;
  const filterEatWeekly = resultTemp.filter(
    (e) => e.createdAt >= dateWeekAgo && e.createdAt <= dateNow
  );
  const calculateBreakfast = filterEatWeekly.filter(
    (e) => e.meal_type.toLowerCase() === "breakfast"
  ).length;
  const calculateLunch = filterEatWeekly.filter(
    (e) => e.meal_type.toLowerCase() === "lunch"
  ).length;
  const calculateDinner = filterEatWeekly.filter(
    (e) => e.meal_type.toLowerCase() === "dinner"
  ).length;
  return {
    count_breakfast: calculateBreakfast,
    count_lunch: calculateLunch,
    count_dinner: calculateDinner,
    count_all: filterEatWeekly.length,
  };
};

export const addEatTracker = async (data, userId) => {
  const { date, meal_type } = data;

  // convert date ke ISO string
  data.date = date;
  data.meal_type = meal_type;

  const dateFromUser = new Date(date);
  const isExist = (await findAllEatTracker(userId)).filter(
    (e) =>
      e.createdAt.toISOString().split("T")[0] ===
        dateFromUser.toISOString().split("T")[0] &&
      e.meal_type.toLowerCase() === data.meal_type.toLowerCase()
  );
  if (isExist.length)
    throw new Error(
      `Eat tracker data with meal_type ${data.meal_type} already exist!`
    );

  const inputData = { id: nanoid(), userId, ...data };
  const resultTemp = await newEatTracker(inputData, userId);
  const result = {
    ...resultTemp,
    date: resultTemp.createdAt.toLocaleDateString(),
  };
  return result;
};

export const updateEatTrackerById = async (updateData, userId, eatId) => {
  const isExist = await findEatTracker(userId, eatId);
  if (!isExist) throw new Error(`Eat with id ${eatId} not found!`);
  const resultTemp = await updateEatTracker(updateData, userId, eatId);
  const result = {
    ...resultTemp,
    date: resultTemp.createdAt.toLocaleDateString(),
  };
  return result;
};
