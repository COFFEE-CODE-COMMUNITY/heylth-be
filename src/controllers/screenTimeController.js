import {
  allScreenTime,
  screenTimeById,
  averageScreenTime,
  addScreenTime,
  updateScreenTimeById,
} from "../services/screenTimeService.js";

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

export const addScreenTimeController = async (req, res) => {
  try {
    const result = await addScreenTime(req.body, req.user.id);
    return res.status(201).json({
      success: true,
      message: `Success to create new screen time!`,
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

export const updateScreenTimeController = async (req, res) => {
  try {
    const result = await updateScreenTimeById(
      req.body,
      req.params.screenTimeId,
      req.user.id
    );
    return res.status(200).json({
      success: true,
      message: `Success to update screen time!`,
      data: {
        id: result.id,
        duration: result.duration,
        date: result.date,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: `Failed to update screen time!`,
      error: error.message,
    });
  }
};
