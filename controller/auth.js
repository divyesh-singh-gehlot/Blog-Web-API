const { User } = require("../models");
const comparePassword = require("../utils/comparePassword");
const hashPassword = require("../utils/hashPassword");


const signup = async (req, res, next) => {
    try {
        
        const { name, email, password, role } = req.body;
        const isEmailExists = await User.findOne({email});
        
        if(isEmailExists){
            res.code = 400;
            throw new Error('Email already exists.')
        }

        const hashedPassword = await hashPassword(password);
        
        const newUser = new User({ name, email, password: hashedPassword, role });

        await newUser.save();

        res.status(201).json({ code: 201, status: true, message: "User Registered Successfully!" })

    } catch (error) {
        next(error);
    }
}

const signin = async (req,res,next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        
        if(!user){
            res.code = 401;
            throw new Error("Invalid Email or Password");
        }

        const match = await comparePassword(password, user.password);

        if(!match){
            res.code = 401;
            throw new Error("Invalid Email or Password")
        }

        res.status(200).json({code:200, status: true, message:"Sign in Successful!"})

    } catch (error) {
        next(error);
    }
}

module.exports = {
    signup,
    signin
}