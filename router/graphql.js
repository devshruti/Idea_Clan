const { buildSchema } = require('graphql');
const { UserModel } = require('../model/userModel');
const { PostModel } = require('../model/postModel');

// Define GraphQL schema
const schema = buildSchema(`
  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
  }

  type Post {
    _id: ID!
    userId: ID!
    content: String!
    createdAt: String!
  }

  type Query {
    getUser(userId: ID!): User
    getAllUsers: [User]
    getPost(postId: ID!): Post
    getAllPosts: [Post]
  }

  type Mutation {
    createPost(userId: ID!, content: String!): Post
  }
`);

// Define resolvers
const resolvers = {
    getUser: async ({ userId }) => {
        return await UserModel.findById(userId);
    },
    getAllUsers: async () => {
        return await UserModel.find();
    },
    getPost: async ({ postId }) => {
        return await PostModel.findById(postId);
    },
    getAllPosts: async () => {
        return await PostModel.find();
    },
    createPost: async ({ userId, content }) => {
        const newPost = new PostModel({ userId, content });
        await newPost.save();
        return newPost;
    }
};

module.exports = { schema, resolvers };
