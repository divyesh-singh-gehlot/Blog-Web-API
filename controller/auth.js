const { User, File } = require("../models");
const comparePassword = require("../utils/comparePassword");
const generateCode = require("../utils/generateCode");
const generateToken = require("../utils/generateToken");
const hashPassword = require("../utils/hashPassword");
const sendEmail = require("../utils/sendEmail");


const signup = async (req, res, next) => {
    try {

        const { name, email, password, role } = req.body;
        const isEmailExists = await User.findOne({ email });

        if (isEmailExists) {
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

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.code = 401;
            throw new Error("Invalid Email or Password");
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            res.code = 401;
            throw new Error("Invalid Email or Password")
        }

        const token = generateToken(user);

        res.status(200).json({ code: 200, status: true, message: "Sign in Successful!", data: { token } })

    } catch (error) {
        next(error);
    }
}

const verifyCode = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.code = 404;
            throw new Error("User not Found!");
        }

        if (user.isVerified) {
            res.code = 404;
            throw new Error("User is already Verified!")
        }

        const code = generateCode(6);
        user.verificationCode = code;
        await user.save();

        await sendEmail({
            emailTo: user.email,
            subject: "Blog app - Email Verification code",
            code,
            content: "verify your account"
        })

        res.status(200).json({ code: 200, status: true, msg: "Verification code sent successfully!" })

    } catch (error) {
        next(error);
    }
}

const verifyUser = async (req, res, next) => {
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.code = 404;
            throw new Error("No user Found");
        }

        if (user.verificationCode !== code) {
            res.code = 400;
            throw new Error("Invalid Verification Code");
        }

        user.isVerified = true;
        user.verificationCode = null;
        await user.save();

        res.status(200).json({ code: 200, status: true, message: "User Verified Successfully!" })

    } catch (error) {
        next(error);
    }
}

const forgotPasswordCode = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.code = 404;
            throw new Error("No User Found");
        }

        const code = generateCode(6);
        user.forgotPasswordCode = code;
        await user.save();

        await sendEmail({
            emailTo: email,
            subject: "Forgot Password Code",
            code,
            content: " Change your password "
        });

        res.status(200).json({ code: 200, status: true, message: "Forgot password code sent Successfully!" })

    } catch (error) {
        next(error);
    }
}

const recoverPassword = async (req, res, next) => {
    try {
        const { email, code, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.code = 404;
            throw new Error("User not Found!");
        }
        if (code !== user.forgotPasswordCode) {
            res.code = 400;
            throw new Error("Invalid Code!");
        }

        const hashedPassword = await hashPassword(newPassword);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ code: 200, status: true, message: "Password Changed Successfully!" });

    } catch (error) {
        next(error);
    }
}

const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const { _id } = req.user;

        const user = await User.findById(_id);

        if (!user) {
            res.status = 404;
            throw new Error("User not found!");
        }

        const match = await comparePassword(oldPassword, user.password);

        if (!match) {
            res.code = 400;
            throw new Error("Old password doesn't match!")
        }

        if (oldPassword === newPassword) {
            res.code = 400;
            throw new Error("You are providing old password!");
        }

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ code: 200, status: true, message: "Password Changed Successfully!" });

    } catch (error) {
        next(error);
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { name, email, profilePic } = req.body;

        const user = await User.findById(_id).select("-password -forgotPasswordCode -verificationCode");

        if (!user) {
            res.code = 404;
            throw new Error("User not found!");
        }

        if (email) {
            const isUserExist = await User.findOne({ email });
            if (isUserExist && isUserExist.email === email && String(user._id) !== String(isUserExist._id)) {
                res.code = 400;
                throw new Error("Email already exists.");
            }
        }

        if (profilePic) {
            const file = await File.findById(profilePic);
            if (!file) {
                res.code = 404;
                throw new Error("File not found!");
            }
        }

        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.profilePic = profilePic;

        if (email) {
            user.isVerified = false;
        }

        await user.save();

        res.status(200).json({ code: 200, status: true, message: "Profile Updated Successfully!" , data:{user}})

    } catch (error) {
        next(error);
    }
}

const currentUser = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const user = await User.findById(_id).select("-password -forgotPasswordCode -verificationCode").populate("profilePic");

        if (!user) {
            res.code = 404;
            throw new Error("User not found!");
        }

        res.status(200).json({ code: 200, status: true, message: "Profile fetched Successfully!" , data:{user}})
    } catch (error) {
        next(error);
    }
}

module.exports = {
    signup,
    signin,
    verifyCode,
    verifyUser,
    forgotPasswordCode,
    recoverPassword,
    changePassword,
    updateProfile,
    currentUser
}