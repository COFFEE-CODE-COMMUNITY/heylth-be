import { allScreenTime } from "../services/screenTimeService.js";

export const getAllScreenTimeController = async (req, res) => {
    const result = await allScreenTime(req.user.id);
    if(!result.length) return res.status(200).json({
        success: true,
        message: `You do not have any history screen time!`,
    });
    return res.status(200).json({
        success: true,
        message: `Success to get all histories user's screen time!`,
        username: req.user.username,
        user_id: req.user.id,
        data: result.map(s => ({
            id: s.id,
            duration_minutes: s.durationMinutes,
            date: s.createdAt.toLocaleDateString(),
        })),
    });
};