import { addUser } from  '../services/userService.js';

export const userRegister = async (req, res) => {
    try {
        const user = await addUser(req.body);
        return res.status(201).json({
            success: true, 
            message: 'Success to register!',
            data: {
                email: user.email,
                username: user.username,
                age: user.age,
                sex: user.sex,
            }
        });
    } catch (error) {
        return res.status(409).json({
            success: false,
            message: 'Failed to register!',
            error: error.message,
        });
    }
};