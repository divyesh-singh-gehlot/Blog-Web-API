const { File, Category, Post } = require("../models");

const addPost = async (req, res, next) => {
    try {
        const {title , description , file , category} = req.body;
        const {_id} = req.user;

        const isFile = await File.findById(file);
        if(!isFile){
            res.code = 404;
            throw new Error("File not found");
        }

        const isCategory = await Category.findById(category);
        if(!isCategory){
            res.code = 404;
            throw new Error("Category not found");
        }

        const newPost = new Post({
            title,
            description,
            file,
            category,
            updatedby: _id
        });

        await newPost.save()

        res.status(201).json({code:201, status:true, message:"Post created successfully!"});

    } catch (error) {
        next(error);
    }
}

module.exports = {
    addPost
}