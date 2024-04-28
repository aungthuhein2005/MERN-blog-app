const mongoose = require("mongoose");

const UserShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    subscribed:{
        type: Array,
        default: [],
    },
    saved: {
        type: Array,
        default: [],
    },
    favourite: {
        type: Array,
        default: [],
    }
});

module.exports = mongoose.model("User", UserShema);