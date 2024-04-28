const express = require('express');
const router = express.Router();
const subscribeController = require('../controllers/subscribeController');
const authenticatedUser = require('../middleware/userMiddleware');

router.post('/',subscribeController.subscribe);
router.get('/:id',subscribeController.getSubscribeByUserId);
router.get('/',subscribeController.getWithUserAndAuthor);
router.patch('/',subscribeController.delete);

module.exports = router;