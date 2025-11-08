import {
  addSleepTracker,
  getAllSleepTracker,
  getSleepTrackerById,
  averageSleepTracker,
  updateSleepTrackerById,
} from "../services/sleepTrackerService.js";
import { checkAndGenerateReminder } from "../utils/checkAndGenerateReminder.js";

export const getAllSleepTrackerController = async (req, res) => {
  const userSleepTracker = await getAllSleepTracker(req.user.id);
  if (!userSleepTracker.length)
    return res.status(200).json({
      success: true,
      message: `You do not have any histories user's sleep!`,
    });
  return res.status(200).json({
    success: true,
    message: `Success to get all histories user's sleep!`,
    username: req.user.username,
    user_id: req.user.id,
    data: userSleepTracker,
  });
};

export const getSleepTrackerByIdController = async (req, res) => {
  try {
    const result = await getSleepTrackerById(req.params.sleepId, req.user.id);
    return res.status(200).json({
      success: true,
      message: `Success to get specific user's sleep`,
      data: {
        id: result.id,
        sleep_start: result.sleepStart,
        sleep_end: result.sleepEnd,
        duration: result.duration,
        date: result.date,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: `Failed to get user's sleep with sleep id`,
      error: error.message,
    });
  }
};

export const getAverageSleepController = async (req, res) => {
  try {
    const result = await averageSleepTracker(req.user.id, req.user.username);
    return res.status(200).json({
      success: true,
      message: `Success to get user's sleep average!`,
      username: req.user.username,
      data: {
        user_id: req.user.id,
        average_sleep: result,
      },
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: `Failed to get user's sleep average!`,
      error: error.message,
    });
  }
};

export const addSleepTrackerController = async (req, res) => {
  try {
    const result = await addSleepTracker(req.body, req.user.id);
    const date = req.body.date;

    await checkAndGenerateReminder(req.user.id, date);
    
    return res.status(201).json({
      success: true,
      message: "Success to create new sleep tracker!",
      name: req.user.username,
      data: {
        id: result.id,
        sleep_start: result.sleepStart,
        sleep_end: result.sleepEnd,
        duration: result.duration,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to create new sleep tracker!",
      error: error.message,
    });
  }
};

export const updateSleepTrackerByIdController = async (req, res) => {
  try {
    const result = await updateSleepTrackerById(
      req.body,
      req.params.sleepId,
      req.user.id
    );
    return res.status(200).json({
      success: true,
      message: `Success to update history sleep with id ${req.params.sleepId}`,
      userId: req.user.id,
      data: {
        id: result.id,
        sleep_start: result.sleepStart,
        sleep_end: result.sleepEnd,
        duration: result.duration,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Failed to update history sleep tracker!",
      error: error.message,
    });
  }
};
