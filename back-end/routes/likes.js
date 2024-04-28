const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

// router.get('/count/:id',likeController.likeCount);
router.post('/',likeController.createLike);
router.get('/',likeController.getLikebyPostUser);
router.patch('/',likeController.delete);

module.exports = router;