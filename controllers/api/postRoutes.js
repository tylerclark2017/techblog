const express = require('express');
const router = express.Router();

const {Post} = require('../../models')

// Import any necessary models or dependencies

// GET route to fetch all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching posts' });
    }
});

// GET route to fetch a specific post by ID
router.get('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the post' });
    }
});

// DELETE route to delete a specific post by ID
router.delete('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the post' });
    }
});

// PUT route to edit a specific post by ID
router.put('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    const updatedPostData = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, updatedPostData, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the post' });
    }
});

module.exports = router;