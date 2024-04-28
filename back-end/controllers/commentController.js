const commnetServices = require('../services/commentService');

exports.createComment = (req,res)=>{
    const createdComment = commnetServices.create(req.body);
    res.json(createdComment);
}

exports.getCommentById = (req,res)=>{
    const comment = commnetServices.createUser(req.params.id);
    res.json(comment);
}

exports.getCommentByPost = (req,res) =>{
    let postId = req.params.postId;
    const comment = commnetServices.getCommentByPost(postId);
    res.json(comment);
}

exports.update = async (req,res)=>{
    // console.log(req.body);
    const updatedComment = await commnetServices.update(req.params.id,req.body);
    res.json(updatedComment);
}

exports.delete = async (req,res)=>{
    const deletedComment = await commnetServices.delete(req.params.id,req.body.postId);
    res.json(deletedComment);
}
