const mongoose = require('mongoose');

class Post {
  constructor(userId, content) {
    this.userId = userId;
    this.content = content;
    this.createdAt = new Date();
  }

  // Getter methods
  getUserId() {
    return this.userId;
  }

  getContent() {
    return this.content;
  }

  // Other methods for post-related operations can be added here
}

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

postSchema.loadClass(Post);
const PostModel = mongoose.model('Post', postSchema);

module.exports = { PostModel };
