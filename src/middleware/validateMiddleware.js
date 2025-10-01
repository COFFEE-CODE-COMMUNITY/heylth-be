const validateMiddleware = schema => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { aboutEarly: false });
        if (error) return res.status(400).json({
            success: false,
            message: 'Validation failed!',
            details: error.message[0].details,
        });
        next();
    };
};