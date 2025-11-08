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

export const countEatTracker = async (userId, username) => {
  const date = new Date();
  const dateNow = date.toLocaleDateString();
  const dateWeekAgo = `${date.getDate() - 7}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const resultTemp = await findAllEatTracker(userId);
  if (!resultTemp.length)
    throw new Error(`${username} does not have any tracker id!`);
  const filterEatWeekly = resultTemp.filter(
    (e) =>
      e.createdAt.toLocaleDateString() >= dateWeekAgo &&
      e.createdAt.toLocaleDateString() <= dateNow
  );
  console.log(filterEatWeekly);
  return filterEatWeekly.length;
};

export const addEatTracker = async (data, userId) => {
  const { date, meal_type } = data;

  // convert date ke ISO string
  const dateIso = dateInputIso(date);
  data.date = dateIso;
  data.meal_type = meal_type;

  const dateFromUser = dateIso.split("T")[0];
  const isExist = (await findAllEatTracker(userId)).filter(
    (e) =>
      e.createdAt.toLocaleDateString() === dateFromUser &&
      e.meal_type.toLowerCase() === data.meal_type.toLowerCase()
  );
  if (isExist.length)
    throw new Error(
      `Eat tracker data with meal_type ${data.meal_type} and date ${dateFromUser} already exist!`
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
