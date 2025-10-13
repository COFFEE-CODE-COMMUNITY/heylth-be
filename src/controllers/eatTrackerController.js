import { allEatTracker, eatTrackerById, addEatTracker  } from "../services/eatTrackerService.js";

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
        data: result.map(r => ({
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