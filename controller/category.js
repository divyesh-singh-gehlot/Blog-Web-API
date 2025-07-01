const { User, Category } = require("../models");

const addCategory = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const { _id } = req.user;

        const isCategory = await Category.findOne({ title });

        if (isCategory) {
            res.code = 404;
            throw new Error("Category already exists.");
        }

        const user = await User.findById(_id);

        if (!user) {
            res.code = 400;
            throw new Error("User not found!");
        }

        const newCategory = new Category({ title, description, updatedBy: _id });

        await newCategory.save();

        res.status(200).json({ code: 200, status: true, message: "Category added Seccessfully!" });
    } catch (error) {
        next(error);
    }
}

const updateCategory = async (req, res, next) => {
    const {id} = req.params;
    const { _id } = req.user;
    const { title, description } = req.body;

    const category = await Category.findById(id);

    if (!category) {
        res.code = 404;
        throw new Error("No such category found!");
    }

    const isCategory = await Category.findOne({title});

    if(isCategory && String(isCategory._id) !== String(category._id)){
        res.code = 400;
        throw new Error("Title already Exists!");
    }

    category.title = title ? title : category.title;
    category.description = description;
    await category.save();

    res.status(200).json({code:200, status:true, message:"Category updated Successfully!", data:{category}})
}

const deleteCategory = async (req, res, next) => {
    try {
        const {id} = req.params;

        const category = await Category.findById(id);

        if(!category){
            res.code = 404;
            throw new Error("Category not found!");
        }

        await Category.findByIdAndDelete(id);
        res.status(200).json({code:200, status:true, message:"Category Deleted Successfully!"});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addCategory,
    updateCategory,
    deleteCategory
}