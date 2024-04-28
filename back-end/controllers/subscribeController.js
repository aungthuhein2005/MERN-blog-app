const subscribeService = require('../services/subscribeService');

exports.subscribe= async (req,res)=>{
    const subscribe = await subscribeService.create(req.body);
    res.json(subscribe);
}

exports.getSubscribeByUserId = async (req,res) => {
    const subscribed = await subscribeService.getSubscribeByUserId(req.params.id);
    res.json(subscribed);
}

exports.getSubscribeByAuthor = async(req,res) => {
    const subscribed = await subscribeService.getWithUserIdAuthorId(req.query);
    res.json(subscribed);
}

exports.getWithUserAndAuthor = async (req,res) => {
    const subscribe = await subscribeService.getWithUserIdAuthorId(req.query);
    res.json(subscribe);
}

exports.delete = async(req,res) => {
    const deleted = await subscribeService.delete(req.body);
    res.json(deleted);
}