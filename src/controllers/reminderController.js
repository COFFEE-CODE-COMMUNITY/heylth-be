import { getReminder } from "../services/reminderService.js";


export const getReminderController = async (req, res) => {
  const result = await getReminder(req.user.id);
  if (!result.length)
    return res.status(200).json({
      success: true,
      message: "You do not have any reminder!",
    });
  return res.status(200).json({
    success: true,
    message: `Success to get user's reminder controller!`,
    data: result,
  });
};
