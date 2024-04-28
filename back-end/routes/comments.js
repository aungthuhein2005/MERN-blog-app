const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/:id',commentController.getCommentById);
router.get('/:postId',commentController.getCommentByPost);
router.post('/',commentController.createComment);
router.patch('/:id',commentController.update);
router.delete('/:id',commentController.delete);

module.exports = router;