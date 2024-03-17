const express = require('express');
const { PostModel } = require('../model/postModel');
const { authMiddleware } = require('../middleware/authenticate');

const postRouter = express.Router();

// Create a new post
postRouter.post('/create', authMiddleware, async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user._id; // Extract user ID from authenticated request

        const newPost = new PostModel({ userId, content });
        await newPost.save();

        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error(error, "Failed to retrieve posts");
        res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
});

// Retrieve posts of the authenticated user and the users they follow
postRouter.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from authenticated request

        // Fetch user IDs of users that the authenticated user follows
        const followingIds = req.followingIds;

        // Find posts of the authenticated user and the users they follow
        const posts = await PostModel.find({ $or: [{ userId }, { userId: { $in: followingIds } }] })
            .populate('userId', 'username');

        res.json(posts);
    } catch (error) {
        console.error(error, "Failed to retrieve posts");
        res.status(500).json({ message: 'Failed to retrieve posts', error: error.message });
    }
});

module.exports = { postRouter };
