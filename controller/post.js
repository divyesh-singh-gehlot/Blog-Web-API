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
        
        const post = await Post.findById(id);
        
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

const getPosts = async (req, res, next) => {
    try {
        const {q, size, page , category} = req.query;
        
        let query = {};
        const sizeNumber = size ? parseInt(size) : 6;
        const pageNumber = page ? parseInt(page) : 1;

        if (q) {
            const search = RegExp(q, "i");
            query = {
                $or: [
                    { title: search }
                ]
            };
        }

        if(category){
            query = {...query , category};
        }

        const totalPosts = await Post.countDocuments(query);
        const totalPages = Math.ceil(totalPosts / sizeNumber);
        
        const posts = await Post.find(query).populate("file").populate("category").populate("updatedby", "-password -verificationCode -forgotPasswordCode").skip((pageNumber - 1) * sizeNumber).limit(sizeNumber).sort({ updatedAt: -1 });

        res.status(200).json({ code: 200, status: true, message: "Posts fetched successfully!", data: { posts , totalPages , totalPosts } });
    } catch (error) {
        next(error);
    }
}

const getPost = async (req , res , next) => {
    try {
        const {id} = req.params;

        const post = await Post.findById(id).populate("file").populate("category").populate("updatedby", "-password -verificationCode -forgotPasswordCode");

        if(!post){
            res.code = 404;
            throw new Error("Post not found!");
        }
        res.status(200).json({code:200, status:true, message:"Post fetched successfully!" , data:{post}});
    } catch (error) {
        next(error);
    }
}

const getTopContributors = async (req, res, next) => {
  try {
    const topContributors = await Post.aggregate([
      {
        $group: {
          _id: "$updatedby",
          postCount: { $sum: 1 },
        },
      },
      {
        $sort: { postCount: -1 },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "users", // Replace with actual collection name if different
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.name",
          email: "$user.email",
          postCount: 1,
        },
      },
    ]);

    res.status(200).json({
      code: 200,
      status: true,
      message: "Top contributors fetched successfully!",
      data: topContributors,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
    addPost,
    updatePost,
    deletePost,
    getPosts,
    getPost,
    getTopContributors
}