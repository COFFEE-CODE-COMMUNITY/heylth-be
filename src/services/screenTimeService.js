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
    const dateNow = date.toLocaleDateString();
    const dateWeekAgo = `${date.getDate() - 7}/${date.getMonth() + 1}/${date.getFullYear()}`;

    const resultTemp = await findAllScreenTime(userId);
    if(!resultTemp.length) throw new Error(`${username} does not have any screen time tracker!`);
    const filterWeeklyScreenTime = resultTemp.filter(st => (
        st.createdAt.toLocaleDateString() >= dateWeekAgo &&
        st.createdAt.toLocaleDateString() <= dateNow
    ));
    const result = (filterWeeklyScreenTime.reduce((total, st) => total + st.duration, 0)/filterWeeklyScreenTime.length).toFixed(1); 
    return parseFloat(result);
};

export const addScreenTime = async (data, userId) => {
  const { date, duration } = data;

  // convert date ke ISO string
  const dateIso = dateInputIso(date);
  data.date = dateIso;
  data.duration = duration;
  
  const allScreenTime = await findAllScreenTime(userId);
  const isExist = allScreenTime.find(
    (st) =>
      st.createdAt.toLocaleDateString() === new Date().toLocaleDateString()
  );
  if (isExist)
    throw new Error(
      `Screen time already exist at date ${new Date().toLocaleDateString()}`
    );
  const inputData = { id: nanoid(), userId, ...data };
  const result = await newScreenTime(inputData);
  return result;
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

export const updateScreenTimeById = async (
  updateData,
  screenTimeId,
  userId
) => {
  const isExist = await findScreenTimeById(screenTimeId, userId);
  if (!isExist)
    throw new Error(
      `Screen time with id ${screenTimeId} at user id ${userId} not found!`
    );

  const inputData = await updateScreenTime(updateData, screenTimeId, userId);
  const result = {
    date: inputData.createdAt.toLocaleDateString(),
    ...inputData,
  };
  return result;
};
