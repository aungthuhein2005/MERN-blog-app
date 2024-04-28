const blogServices = require('../services/blogServices');

exports.createBlog = async (req,res)=>{
    const createdBlog = await blogServices.create(req.body);
    console.log(createdBlog);
    res.json(createdBlog);
}

exports.getAllBlogs = async (req,res)=>{
    const blogs = await blogServices.getAllBlogs();
    res.json(blogs);
}

exports.getBlogById = async (req,res)=>{
    let id = req.params.id;
    const blog = await blogServices.getBlogById(id);
    res.json(blog);
}

exports.search = async(req,res)=>{
    const search = req.query.search;
    const blog = await blogServices.search(search);
    res.json(blog);
}

exports.latestBlogs = async(req,res)=>{
    const blog = await blogServices.getLatestBlogs(req.params.count);
    res.json(blog);
}

exports.relatedBlogs = async(req,res)=>{
    let category = req.params.category;
    const blog = await blogServices.getRelatedBlogs(category);
    res.json(blog);
}

exports.popularBlogs = async(req,res)=>{
    const blog = await blogServices.getPopularBlogs();
    res.json(blog)
}

exports.blogByCategory = async(req,res)=> {
    const blog = await blogServices.getBlogByCategory(req.params.category);
    res.json(blog);
}

exports.categories = async(req,res) =>{
    const categories = await blogServices.getCategories();
    res.json(categories);
}

exports.update = async (req,res)=>{
    const updatedBlog = await blogServices.update(req.params.id,req.body);
    res.json(updatedBlog);
}

exports.delete = async (req,res)=>{
    const deletedBlog = await blogServices.delete(req.params.id);
    res.json(deletedBlog);
}

// exports.imageUpload = async(req,res) => {
//     const imageUpload = await blogServices.uploadImage(req.body);
//     res.json(imageUpload);
// }