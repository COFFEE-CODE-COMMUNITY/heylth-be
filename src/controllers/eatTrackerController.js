import { allEatTracker, addEatTracker  } from "../services/eatTrackerService.js";

export const getAllEatTrackerController = async (req, res) => {
    const result = await allEatTracker(req.user.id);
    if(!result.length) return res.status(200).json({
        success: true,
        message: 'You do not have any eat tracker!',
    });
    return res.status(200).json({
        success: true,
        message: `Success to get all histories user's eat!`,
        username: req.user.username,
        user_id: req.user.id,
        data: result.date,
    });
};

export const addEatTrackerController = async (req, res) => {
    const result = await addEatTracker(req.body, req.user.id);
    return res.status(200).json({
        success: true,
        message: `Success to create new eat tracker!`,
        username: req.user.username,
        data: {
            id: result.id,
            meal_type: result.meal_type,
            date: result.date,
        },
    });
};