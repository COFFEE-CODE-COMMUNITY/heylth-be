import { addSleepTracker, getAllSleepTracker, getSleepTrackerById } from "../services/sleepTrackerService.js";

export const getAllSleepTrackerController = async (req, res) => {
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
};

export const getSleepTrackerByIdController = async (req, res) => {
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
};

export const addSleepTrackerController = async (req, res) => {
    const result = await addSleepTracker(req.body, req.user.id);
    try {
        return res.status(201).json({
            success: true,
            message: 'Success to create new sleep tracker!',
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
            message: 'Failed to create new sleep tracker!',
            error: error.message,
        });
    }
};