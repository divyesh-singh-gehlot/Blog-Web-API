const mongoose = require("mongoose");
const { connectionUrl } = require("../config/keys");

const connectDb = async () => {
    try {
        await mongoose.connect(connectionUrl);
        console.log("Database connected Successfuly!")
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message)
    }
}

module.exports = connectDb;