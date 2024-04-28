const likeServices = require('../services/likeService');

exports.createLike = (req,res)=>{
    const createdLike = likeServices.create(req.body);
    res.json(createdLike);
}

exports.getLikebyPostUser = async (req,res) => {
    const likes = await likeServices.getLikebyPostUser(req.query);
    res.json(likes);
}

exports.delete = (req,res)=>{ 
    const deletedLike = likeServices.delete(req.body);
    res.json(deletedLike);
}
