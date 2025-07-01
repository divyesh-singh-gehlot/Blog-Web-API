const { User, Category } = require("../models");

const addCategory = async (req, res, next) => {
    const {title , description} = req.body;
    const {_id} = req.user;
    
    const isCategory = Category.findOne({title});

    if(!isCategory){
        res.code = 404;
        throw new Error("Category already exists.");
    }

    const user = User.findById(_id);

    if(!user){
        res.code = 400;
        throw new Error("User not found!");
    }

    const newCategory = new Category({title, description, updatedby:_id});

    await newCategory.save();

    res.status(200).json({code:200, status:true, message:"Category added Seccessfully!"});
}



modules.exports = {
    addCategory
}