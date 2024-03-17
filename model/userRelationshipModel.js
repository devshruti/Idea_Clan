const mongoose = require('mongoose');

class UserRelationship {
    constructor(followerId, followingId) {
        this.followerId = followerId;
        this.followingId = followingId;
    }

    // Getter methods
    getFollowerId() {
        return this.followerId;
    }

    getFollowingId() {
        return this.followingId;
    }

    // Other methods for user relationship-related operations can be added here
}

const userRelationshipSchema = new mongoose.Schema({
    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

userRelationshipSchema.loadClass(UserRelationship);
const UserRelationshipModel = mongoose.model('UserRelationship', userRelationshipSchema);

module.exports = { UserRelationshipModel };
