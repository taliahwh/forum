import { UserInputError } from 'apollo-server';
import Post from '../../models/postModel.js';
import checkAuth from '../../util/check-auth.js';

const postResolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(err);
      }
    },

    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    // can access the req.body within the context parameter
    async createPost(_, { body }, context) {
      const authorizedUser = checkAuth(context);

      const newPost = new Post({
        body,
        username: authorizedUser.username,
        user: authorizedUser.id,
      });

      await newPost.save();

      return newPost;
    },
  },
};

export default postResolvers;
