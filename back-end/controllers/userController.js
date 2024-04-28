const userService = require('../services/userServices');

exports.createUser = async (req,res)=>{
    const createdUser = await userService.create(req.body);
    res.json(createdUser);
}

exports.login = async (req,res) => {
    const user = await userService.login(req.body);
    res.json(user);
}

exports.getAllUsers =async (req,res)=>{
    const users = await userService.getAllUsers();
    res.json(users);
}

exports.getUserById = async (req,res)=>{
    const user = await userService.getUserById(req.params.id);
    res.json(user);
}

exports.saveBlog = async(req,res) => {
    const blog = await userService.saveBlog(req.body);
    res.json(blog);
}

exports.getSavedBlog = async(req,res) => {
    const blog = await userService.getSavedBlog(req.params.id);
    res.json(blog);
}


exports.sentEmailOTP = async (req,res) => {
    console.log(req.query);
    const data = await userService.sendEmailOTP(req.query);
    res.json(data);
}

exports.verifyOTP = async (req,res)=>{
    console.log(req.params);
    const data = await userService.verifyOTP(req.params);
    res.json(data);
}

exports.update = async (req,res)=>{
    const updatedUser = await userService.update(req.params.id,req.body);
    res.json(updatedUser);
}

exports.delete = async (req,res)=>{
    const deletedUser = await userService.delete(req.params.id);
    res.json(deletedUser );
}
