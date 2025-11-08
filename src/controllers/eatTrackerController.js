import {
  allEatTracker,
  eatTrackerById,
  countEatTracker,
  addEatTracker,
  updateEatTrackerById,
} from "../services/eatTrackerService.js";
import { checkAndGenerateReminder } from "../utils/checkAndGenerateReminder.js";

export const getAllEatTrackerController = async (req, res) => {
  const result = await allEatTracker(req.user.id);
  if (!result.length)
    return res.status(200).json({
      success: true,
      message: "You do not have any eat tracker!",
    });
  return res.status(200).json({
    success: true,
    message: `Success to get all histories user's eat!`,
    username: req.user.username,
    user_id: req.user.id,
    data: result.map((r) => ({
      id: r.id,
      meal_type: r.meal_type,
      date: r.createdAt.toLocaleDateString(),
    })),
  });
};

export const getEatTrackerByIdController = async (req, res) => {
  try {
    const result = await eatTrackerById(req.user.id, req.params.eatId);
    return res.status(200).json({
      success: true,
      message: `Success to get user's eat!`,
      data: {
        id: result.id,
        meal_type: result.meal_type,
        date: result.date,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: `Failed to get user's eat!`,
      error: error.message,
    });
  }
};

export const getCountEatTrackerController = async (req, res) => {
  try {
    const result = await countEatTracker(req.user.id, req.user.username);
    if (!result)
      return res.status(200).json({
        success: true,
        message: error.message,
      });
    return res.status(200).json({
      success: true,
      message: `Success to user's count meal!`,
      data: {
        user_id: req.user.id,
        count_meal: result,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false, 
      message: `Failed to count user's meal!`,
      error: error.message,
    });
  }
};

export const addEatTrackerController = async (req, res) => {
  try {
    const result = await addEatTracker(req.body, req.user.id);
    const date = req.body.date;

    await checkAndGenerateReminder(req.user.id, date);

    return res.status(201).json({
      success: true,
      message: `Success to create new eat tracker!`,
      username: req.user.username,
      data: {
        id: result.id,
        meal_type: result.meal_type,
        date: result.date,
      },
    });
  } catch (error) {
    return res.status(409).json({
      success: true,
      messsage: "Failed to create new eat tracker!",
      error: error.message,
    });
  }
};

export const updateEatTrackerController = async (req, res) => {
  try {
    const result = await updateEatTrackerById(
      req.body,
      req.user.id,
      req.params.eatId
    );
    return res.status(200).json({
      success: true,
      message: `Success to update eat tracker!`,
      data: {
        id: result.id,
        meal_type: result.meal_type,
        date: result.date,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Failed to update eat tracker!",
      error: error.message,
    });
  }
};
