export const createUser = async (req, res) => {
    const user = await userService.addUser;
    res.status(201).json({
        success: true, 
        message: 'Success to register!',
        data: user
    });
};