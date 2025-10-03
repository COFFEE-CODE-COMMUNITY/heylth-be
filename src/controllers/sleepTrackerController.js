import { getAllSleepTracker } from "../services/sleepTrackerService.js";

export const getAllSleepTrackerController = async (req, res) => {
    try {
        const userSleepTracker = await getAllSleepTracker(req.user.id);
        if(!userSleepTracker.length) return res.status(200).json({
            success: true,
            message: `You do not have any histories user's sleep!`,
        });
        return res.status(200).json({
            success: true,
            message: `Success to get all histories user's sleep!`,
            data: userSleepTracker,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: `Failed to get all histories user's sleep`,
            error: error.message,
        });
    }

};