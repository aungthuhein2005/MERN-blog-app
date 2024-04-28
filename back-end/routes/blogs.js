const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/blog/:id',blogController.getBlogById);
router.get('/latest/:count',blogController.latestBlogs);
router.get('',blogController.getAllBlogs);
router.post('',blogController.createBlog);
router.get('/search',blogController.search);
// router.get('/imageUpload/',blogController.imageUpload);
router.get('/relatedBlogs/:category',blogController.relatedBlogs);
router.get('/popular',blogController.popularBlogs);
router.get('/categories/:category',blogController.blogByCategory);
router.get('/categories',blogController.categories);
router.patch('/:id',blogController.update);
router.delete('/:id',blogController.delete);

module.exports = router;