const { check } = require("express-validator");

const signupValidator = [
    check("name").notEmpty().withMessage("Name is required."),
    check("email")
        .notEmpty().withMessage("Email is required.")
        .bail()
        .isEmail().withMessage("Invalid email address."),
    check("password")
        .notEmpty().withMessage("Password is required.")
        .isLength({ min: 6 }).withMessage("Password should be at least 6 characters long."),
];

const signinValidator = [
    check("email")
        .notEmpty().withMessage("Email is required.")
        .bail()
        .isEmail().withMessage("Invalid email address."),
    check("password")
        .notEmpty().withMessage("Password is required.")
        .isLength({ min: 6 }).withMessage("Password should be at least 6 characters long."),
];

const emailValidator = [
    check("email")
        .notEmpty().withMessage("Email is required.")
        .bail()
        .isEmail().withMessage("Invalid email address.")
];


module.exports = { signupValidator, signinValidator , emailValidator};
