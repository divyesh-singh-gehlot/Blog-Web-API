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

const verifyUserValidator = [
    check("email")
        .notEmpty().withMessage("Email is required.")
        .bail()
        .isEmail().withMessage("Invalid email address."),
    check("code")
    .notEmpty().withMessage("Code is required")
];

const recoverPasswordValidator = [
    check("email")
        .notEmpty().withMessage("Email is required.")
        .bail()
        .isEmail().withMessage("Invalid email address."),
    check("code")
    .notEmpty().withMessage("Code is required"),
    check("newPassword")
        .notEmpty().withMessage("Password is required.")
        .isLength({ min: 6 }).withMessage("Password should be at least 6 characters long.")
];

const changePasswordValidator = [
    check("oldPassword").notEmpty().withMessage("Old Password is required"),
    check("newPassword").notEmpty().withMessage("New Password is required"),
];

module.exports = { signupValidator, signinValidator , emailValidator, verifyUserValidator, recoverPasswordValidator, changePasswordValidator};
