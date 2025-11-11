import {
  allScreenTime,
  screenTimeById,
  averageScreenTime,
  addOrUpdateScreenTime,
} from "../services/screenTimeService.js";
import { checkAndGenerateReminder } from "../utils/checkAndGenerateReminder.js";

export const getAllScreenTimeController = async (req, res) => {
  const result = await allScreenTime(req.user.id);
  if (!result.length)
    return res.status(200).json({
      success: true,
      message: `You do not have any history screen time!`,
    });
  return res.status(200).json({
    success: true,
    message: `Success to get all histories user's screen time!`,
    username: req.user.username,
    user_id: req.user.id,
    data: result.map((s) => ({
      id: s.id,
      duration: s.duration,
      date: s.createdAt.toLocaleDateString(),
    })),
  });
};

export const getAverageScreenTimeController = async (req, res) => {
  try {
    const result = await averageScreenTime(req.user.id, req.user.username);
    return res.status(200).json({
      success: true,
      message: `Success to get user's screen time average!`,
      data: {
          user_id: req.user.id,
          average_screen_time: result,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Failed to get user's average screen time`,
      error: error.message,
    });
  }
};

export const getScreenTimeByIdController = async (req, res) => {
  try {
    const result = await screenTimeById(req.params.screenTimeId, req.user.id);
    return res.status(200).json({
      success: true,
      message: `Success to get user's screen time!`,
      data: {
        id: result.id,
        duration: result.duration,
        date: result.date,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: `Failed to get user's screen time!`,
      error: error.message,
    });
  }
};

export const addOrUpdateScreenTimeController = async (req, res) => {
  try {
    const result = await addOrUpdateScreenTime(req.body, req.user.id);
    const date = req.body.date;
    await checkAndGenerateReminder(req.user.id, date);

    return res.status(result.statusCode).json({
      success: true,
      message: result.message,
      username: req.user.username,
      data: {
        id: result.id,
        duration: result.duration,
        date: result.date,
      },
    });
  } catch (error) {
    res.status(409).json({
      success: true,
      message: `Failed to create new screen time!`,
      error: error.message,
    });
  }
};

