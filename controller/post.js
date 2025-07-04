const { File, Category, Post } = require("../models");

const addPost = async (req, res, next) => {
    try {
        const { title, description, file, category } = req.body;
        const { _id } = req.user;

        if (file) {
            const isFile = await File.findById(file);
            if (!isFile) {
                res.code = 404;
                throw new Error("File not found");
            }
        }

        const isCategory = await Category.findById(category);
        if (!isCategory) {
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

        res.status(201).json({ code: 201, status: true, message: "Post created successfully!" });

    } catch (error) {
        next(error);
    }
}

const updatePost = async (req, res, next) => {
    try {
        const { title, description, file, category } = req.body;
        const{id} = req.params;
        const { _id } = req.user;

        if (file) {
            const isFile = await File.findById(file);
            if (!isFile) {
                res.code = 404;
                throw new Error("File not found");
            }
        }

        const isCategory = await Category.findById(category);
        if (!isCategory) {
            res.code = 404;
            throw new Error("Category not found");
        }

        const post = await Post.findById(id);
        if(!post){
            res.code = 404;
            throw new Error("Post not found");
        }

        post.title = title ? title : post.title;
        post.description = description ? description : post.description;
        post.file = file ? file : post.file;
        post.category = category ? category : post.category;

        await post.save();
        res.status(200).json({code:200, status:true, message:"Post updated Successfully!", data:{post}});

    } catch (error) {
        next(error);
    }
}

const deletePost = async (req, res, next) => {
    try {
        const {id} = req.params;
        
        const post = Post.findById(id);
        
        if(!post){
            res.code = 404;
            throw new Error("Post not found!");
        }
        
        await Post.findByIdAndDelete(id);

        res.status(200).json({code:200, status:true, message:"Post deleted Successfully!"});

    } catch (error) {
        next(error);
    }
}

module.exports = {
    addPost,
    updatePost,
    deletePost
}