import { lifestyleStatus } from "../services/lifestyleService.js";

export const getLifestyleStatusController = async (req, res) => {
    try {
        const result = await lifestyleStatus(req.user.id, req.user.username);
        return res.status(200).json({
            success: true,
            message: `Success to get user's lifestyle status!`,
            data: {
                user_id: req.user.id,
                status: result.status,
                color: result.color,
            },
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Failed to get lifestyle status!',
            error: error.message,
        });
    }
};