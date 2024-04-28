const User = require('../models/userModel');
const { ObjectId } = require('mongoose').Types;

const Subscribe = {
    create: async (data) => {
        try {
            const { authorId, userId } = data;
            console.log(authorId,userId);
            const user = await User.findByIdAndUpdate(userId, { $addToSet: { subscribed: authorId } }, { new: true });
            return user;
        } catch (error) {
            throw error;
        }
    },

    getSubscribeByUserId: async (userId) => {
        try {
            const subscribedUsers = await User.findById(userId).populate('subscribed');
            const subscribed = await Promise.all(subscribedUsers.subscribed.map(async (user) => {
                return await User.findById(user).select("name _id");
            }));
            return subscribed;
        } catch (error) {
            throw error;
        }
    },

    getWithUserIdAuthorId: async (data) => {
        try {
            const { authorId, userId } = data;
            const user = await User.findOne({ _id: userId, subscribed: authorId });
            return user;
        } catch (error) {
            throw error;
        }
    },

    delete: async (data) => {
        try {
          const {authorId,userId} = data;
            const user = await User.findByIdAndUpdate(userId, { $pull: { subscribed: authorId } }, { new: true });
            return user;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = Subscribe;
