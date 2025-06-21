const { User } = require("../models")
const { validationResult } = require('express-validator');

const signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password, role } = req.body;
        const newUser = new User({ name, email, password, role });

        await newUser.save();

        res.status(201).json({ code: 201, status: true, message: "User Registered Successfully!" })

    } catch (error) {
        next(error);
    }
}



module.exports = {
    signup,
}