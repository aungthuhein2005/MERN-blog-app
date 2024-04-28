const UserModel = require("../models/userModel")

const Save = {
    save: async (data) => {
        try{
            const {userId,blogId} = data;
        const response = await UserModel.findByIdAndUpdate(userId, {$addToSet: {saved: blogId}},{new: true})
        return response;
        }catch(error){
            throw error;
        }
    },

    getSavedById: async(userId) => {
        try {
            const user = await UserModel.findById(userId).select("saved");
            return user;
        } catch (error) {
            throw error;
        }
    },

    delete: async(data) => {
        const {userId,blogId} = data;
        try{
            const response = await UserModel.findByIdAndUpdate(userId,{$pull: {saved: blogId}},{new: true});
            return response;
        }catch(error){
            throw error;
        }
    }
}

module.exports = Save;