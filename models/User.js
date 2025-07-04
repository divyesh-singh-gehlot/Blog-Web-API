const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {type:String , required:true},
    email : {type:String, required:true, unique:true, trim:true},
    password : {type:String, required:true, minlength:6},
    role : {type:Number, default:3},
    //Role: 1 -> Super Admin
    //Role: 2 -> Admin
    //Role: 3 -> Normal user
    isVerified : {type: Boolean, default: false},
    verificationCode : {type: String, default: null},
    forgotPasswordCode : {type: String, default: null},
    profilePic : {type: mongoose.Types.ObjectId , ref:"file"}
});

const User = mongoose.model("user", userSchema);

module.exports = User;