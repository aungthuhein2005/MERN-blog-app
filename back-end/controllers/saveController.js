const saveService = require('../services/saveService');

exports.save = async (req,res) => {
    const saved = await saveService.save(req.body);
    res.json(saved)
}

exports.getSavedById = async (req,res) => {
    const savedBlogs = await saveService.getSavedById(req.params.id)
    res.json(savedBlogs)
}

exports.delete = async (req,res) =>{
    const response = await saveService.delete(req.body);
    res.json(response);
}