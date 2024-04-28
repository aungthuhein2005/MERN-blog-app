const dbService = require('./dbServices');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const OTP = require('otplib');
const nodemailer = require('nodemailer');
const { ObjectId } = require('mongodb');
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const BlogModel = require('../models/blogsModel');

const secret = 'FSDRETVXFERWER#%$TDGCV^$$%#';

//nodemailer setup

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aaron547456@gmail.com',
        pass: 'emos wvpo kvij fcyu',
    }
})

const User = {
    create: async (data) => {
        try {
            const user = new UserModel(data);
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    },

    login: async (data) => {
        console.log(data);
        try {
            const user = await UserModel.findOne({ email: data.email, password: data.password });
            if (!user) throw new Error('User not found');

            // const isPasswordValid = await bcrypt.compare(data.password, user.password);
            // if (!isPasswordValid) throw new Error('Invalid password');

            const token = jwt.sign({ userID: user.email }, secret);
            return { token, user };
        } catch (error) {
            throw error;
        }
    },

    getAllUsers: async () => {
        try {
            const users = await UserModel.find();
            return users;
        } catch (error) {
            throw error;
        }
    },

    getUserById: async (userId) => {
        try {
            const user = await UserModel.findById(userId);
            return user;
        } catch (error) {
            throw error;
        }
    },

    saveBlog: async (data) => {
        try{
            const {blogId,userId} = data;
            const user = await UserModel.findOneAndUpdate(userId, {$addToSet: {saved: blogId}} )
            return user;
        }catch(error){
            throw error;
        }
    },

    getSavedBlog : async(id) => {
        try{
            const savedBlogs = await UserModel.findById(id).populate("saved");
            const saved = await Promise.all(savedBlogs.saved.map(async (blog)=> {
                return await BlogModel.findById(blog);
            }))
            return saved;
        }catch(error){
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
            return user;
        } catch (error) {
            throw error;
        }
    },

    sendEmailOTP: async (data) => {
        try {
            const totp = OTP.authenticator.generate(secret);
            const mailOptions = {
                from: "Blog",
                to: data.receiver,
                subject: `OTP for Password Recovery`,
                text: `Your OTP is ${totp}`,
            }
            await transporter.sendMail(mailOptions);
            return "OTP sent successfully";
        } catch (error) {
            throw error;
        }
    },

    verifyOTP: async (data) => {
        try {
            const isValidOTP = await OTP.authenticator.check(data.otp, secret);
            if (isValidOTP) {
                return 'OTP verification successful';
            } else {
                return "OTP verification failed";
            }
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const user = await UserModel.findByIdAndDelete(id);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;