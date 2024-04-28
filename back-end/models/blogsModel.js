const mongoose = require("mongoose");

const BlogShema = new mongoose.Schema({
    author: {
      name: {
        type: String,
        required: true,
      },
      author_id: {
        type: String,
        required: true,
      },
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    comments: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      default: '',
    },
  },{ collection: 'posts' });

  module.exports = mongoose.model("Blog", BlogShema);
