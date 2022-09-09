const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String, 
        required: true,
        trim: true,
    },
    email: {
        type: String, 
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin", "super"],
        default: "user",
    },
    token: {
        type: String,
        required: false,
        default: null,
    },
    },
    {
        timestamps: true,
    }
);

const model = mongoose.model("User", userSchema);

module.exports = model;