const mongoose = require("mongoose");
const PostModel = require("../models/blogsModel");
const UserModel = require("../models/userModel");

const Comments = {
  create: async (data) => {
    try {
      const { userId, description, postId } = data;
      const userData = await UserModel.findById(userId, { name: 1 }); 
      const comment = { description, userData};
      console.log(postId,comment);
      const updatedPost = await PostModel.findByIdAndUpdate(postId, { $push: { comments: comment } }, { new: true });
      return updatedPost;
    } catch (error) {
      throw error;
    }
  },

  getCommentById: async (id) => {
    try {
      const post = await PostModel.findById(id);
      if (!post) throw new Error("Post not found");
      return post.comments;
    } catch (error) {
      throw error;
    }
  },

  getCommentByPost: async (postId) => {
    try {
      const post = await PostModel.findById(postId);
      if (!post) throw new Error("Post not found");
      return post.comments;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const { postId, text } = data;
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId, "comments._id": id },
        { $set: { "comments.$.description": text } },
        { new: true }
      );
      return updatedPost;
    } catch (error) {
      throw error;
    }
  },

  delete: async (commentId, postId) => {
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
      return updatedPost;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Comments;
