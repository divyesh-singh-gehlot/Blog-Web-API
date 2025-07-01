const { check, param } = require("express-validator");
const { default: mongoose } = require("mongoose");
param

const addCategoryValidator = [
    check("title").notEmpty().withMessage("Title is Required")
]

const idValidator = [
    param("id").custom(async (id) => {
        if(id && !mongoose.Types.ObjectId.isValid(id)){
            throw "Invalid Category Id"
        }
    })
]

module.exports = {
    addCategoryValidator,
    idValidator
}