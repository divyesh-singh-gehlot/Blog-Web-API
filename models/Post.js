const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String},
    file: {type: mongoose.Types.ObjectId , ref:"file"},
    category: {type: mongoose.Types.ObjectId , ref:"category" , required:true},
    updatedby: {type: mongoose.Types.ObjectId , ref:"user" , required:true}
},{timestamps:true});

const Post = mongoose.model("post", postSchema);

module.exports = Post;