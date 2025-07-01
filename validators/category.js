const { check } = require("express-validator");

const addCategoryValidator = [
    check("title").notEmpty().withMessage("Title is Required")
]

modules.exports = {
    addCategoryValidator
}