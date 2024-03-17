
// userRelationshipController.js
const express = require('express');
const relationshipRouter = express.Router();
const UserRelationship = require('../model/userRelationshipModel');

// Follow a user
relationshipRouter.post('/follow', async (req, res) => {
    const { followerId, followingId } = req.body;

    try {
        // Check if the relationship already exists
        const existingRelationship = await UserRelationship.findOne({ followerId, followingId });

        if (existingRelationship) {
            return res.status(400).json({ message: 'Relationship already exists' });
        }

        // Create a new relationship
        const newRelationship = await UserRelationship.create({ followerId, followingId });
        res.status(201).json({ message: 'User followed successfully', relationship: newRelationship });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to follow user', error: error.message });
    }
});

// Unfollow a user
relationshipRouter.post('/unfollow', async (req, res) => {
    const { followerId, followingId } = req.body;

    try {
        // Find and delete the relationship
        await UserRelationship.findOneAndDelete({ followerId, followingId });
        res.json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to unfollow user', error: error.message });
    }
});

module.exports = { relationshipRouter };
