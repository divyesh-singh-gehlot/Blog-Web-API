const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {type:String , required:true},
    email : {type:String, required:true, unique:true, trim:true},
    password : {type:String, required:true, minlength:10},
    role : {type:Number, default:3}
    //Role: 1 -> Super Admin
    //Role: 2 -> Admin
    //Role: 3 -> Normal user
});

const User = mongoose.model("user", userSchema);

module.exports = User;