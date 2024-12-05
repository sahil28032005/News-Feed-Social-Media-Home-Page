const express = require('express');
const router = express.Router();
const { createPost, getPosts, likePost, commentPost } = require('../controllers/postController');


//route that fetches controllers from controllers files

//route for creating post
router.post('/create-post', createPost);

//route for fetching posts
router.get('/posts', getPosts);

// Route to like a post
router.post('/:postId/like', likePost);

// Route to comment on a post
router.post('/:postId/comment', commentPost);

module.exports = router;