const dbService = require("./dbServices");
const { ObjectId } = require("mongodb");
const Blog = require("../models/blogsModel");
const mongoose = require("mongoose");

const Blogs = {
  create : async (data) => {
    try {
      const newBlog = new Blog(data);
      const savedBlog = await newBlog.save();
      return "success";
  } catch (error) {
      console.error("Error saving blog:", error);
      return "fail";
  }
  },

  search: async (search) => {
    let blog;
    if (search === "") {
      blog = await Blog.find()
    } else {
      blog = await Blog
        .find({ description: { $regex: new RegExp(search, "i") } })
        
    }
    return blog;
  },

  getBlogById: async (id) => {
    const blog = await Blog.findById(id);
    return blog;
  },

  getLatestBlogs: async () => {
    const blog = await 
      Blog
      .find()
      .sort({ date: -1 })
      // .limit(parseInt(count))
      
    return blog;
  },

  getPopularBlogs: async () => {
    const blog = await Blog
      .aggregate([
        {
          $addFields: {
            likes: { $size: { $ifNull: ["$likes", []] } },
            comments: { $size: { $ifNull: ["$comments", []] } },
          },
        },
        {
          $sort: { likes: -1 },
        },
        {
          $limit: 6,
        },
      ])
      

    return blog;
  },

  getAllBlogs: async () => {
    const blog = await Blog.find();
    console.log(blog);
    return blog;
  },

  getRelatedBlogs: async (category) => {
    const blog = await Blog
      .find({ category: category })
      .limit(8)
      
    return blog;
  },

  getBlogByCategory: async (category) => {
    const blog = await Blog.find({ category: { $regex: new RegExp("^" + category + "$", "i") } });
    return blog;
  },

  getCategories: async () => {
    const categories = await Blog.distinct('category');
    return categories;
  },

  update: async (id, data) => {
    const blog = await Blog
      .updateOne({ _id: new ObjectId(id) }, { $set: data });
    return blog;
  },

  delete: async (id) => {
    const blog = await Blog
      .deleteOne({ _id: new ObjectId(id) });
    return blog;
  },

  // imageUpload: async(data) => {
  //  
  //     const image = await
  // }
};

module.exports = Blogs;
