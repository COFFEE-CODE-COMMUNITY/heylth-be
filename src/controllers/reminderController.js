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
    data: result.map(r => ({
      id: r.id,
      userId: r.userId,
      userId: r.userId,
      sleepStatus: r.sleepStatus,
      eatStatus: r.eatStatus,
      screenTimeStatus: r.screenTimeStatus,
      sleepMessage: r.sleepMessage,
      eatMessage: r.eatMessage,
      screenTimeMessage: r.screenTimeMessage,
      dayNumber: r.createdAt.getDate(),
      dayText: Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(r.date),
      month: Intl.DateTimeFormat('en-US', {month: 'long'}).format(r.date),
      year: r.createdAt.getFullYear(),
      createdAt: r.createdAt.toISOString().split('T')[0],
      updatedAt: r.updatedAt,
    })),
  });
};
