const PostModel = require('../models/blogsModel');

const Likes = {
    create: async (data) => {
        try {
            const { postId, userId } = data;
            const like = await PostModel.findByIdAndUpdate(
                postId,
                { $addToSet: { likes: userId } }, // Using $addToSet to avoid duplicate likes
                { new: true }
            );
            return like;
        } catch (error) {
            throw error;
        }
    },

    getLikebyPostUser: async (data) => {
        try {
            const { userId, postId } = data;
            const post = await PostModel.findOne({ _id: postId, likes: userId });
            return post ? true : false;
        } catch (error) {
            throw error;
        }
    },

    delete: async (data) => {
        try {
            const { postId, userId } = data;
            const like = await PostModel.findByIdAndUpdate(
                postId,
                { $pull: { likes: userId } },
                { new: true }
            );
            return like;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Likes;
