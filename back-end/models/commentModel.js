const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    name: String,
}, { timestamps: true });

module.exports = mongoose.model("Comment",commentSchema);