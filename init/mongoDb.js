const mongoose = require("mongoose");
const { connectionUrl } = require("../config/keys");

const connectDb = async () => {
    try {
        await mongoose.connect(connectionUrl);
        console.log("Database connected Successfuly!")
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDb;