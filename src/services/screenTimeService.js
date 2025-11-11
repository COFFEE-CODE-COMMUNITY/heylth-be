import { nanoid } from "nanoid";
import {
  findAllScreenTime,
  findScreenTimeById,
  newScreenTime,
  updateScreenTime,
} from "../repositories/screenTimeRepository.js";
import { dateInputIso } from "../utils/dateIso.js";

export const allScreenTime = async (userId) => {
  const result = await findAllScreenTime(userId);
  return result;
};

export const averageScreenTime = async (userId, username) => {
  const date = new Date();
  const dateNow = new Date(date.toISOString());
  const dateWeekAgo = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 7}`);

  const resultTemp = await findAllScreenTime(userId);
  if (!resultTemp.length)
    throw new Error(`${username} does not have any screen time tracker!`);
  const filterWeeklyScreenTime = resultTemp.filter(
    (st) =>
      st.createdAt >= dateWeekAgo &&
      st.createdAt <= dateNow 
  );
  const result = (
    filterWeeklyScreenTime.reduce((total, st) => total + st.duration, 0) /
    filterWeeklyScreenTime.length
  ).toFixed(1);
  return parseFloat(result);
};

export const addOrUpdateScreenTime = async (data, userId) => {
  const { date, duration } = data;

  // convert date ke ISO string
  const dateIso = dateInputIso(date);
  data.date = dateIso;
  data.duration = duration;

  const allScreenTime = await findAllScreenTime(userId);

  const isExist = allScreenTime.find(
    (st) => st.createdAt.toISOString().split("T")[0] === dateIso.split("T")[0]
  );
  if (isExist) {
    const result = await updateScreenTime(data, isExist.id);
    return {
      ...result,
      message: "Success to update screen time!",
      statusCode: 200,
    };
  }
  const inputData = { id: nanoid(), userId, ...data };
  const result = await newScreenTime(inputData);
  return {
    ...result,
    message: "Success to create a new screen time!",
    statusCode: 201,
  };
};

export const screenTimeById = async (screenTimeId, userId) => {
  const resultTemp = await findScreenTimeById(screenTimeId, userId);
  if (!resultTemp)
    throw new Error(
      `Screen time with id ${screenTimeId} in user id ${userId} not found!`
    );
  const result = {
    date: resultTemp.createdAt.toLocaleDateString(),
    ...resultTemp,
  };
  return result;
};
