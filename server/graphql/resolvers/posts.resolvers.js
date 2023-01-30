import { UserInputError, AuthenticationError } from 'apollo-server';
import Post from '../../models/postModel.js';
import checkAuth from '../../util/check-auth.js';

const postResolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
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

      try {
        const newPost = new Post({
          body,
          username: authorizedUser.username,
          user: authorizedUser.id,
        });

        await newPost.save();

        return newPost;
      } catch (error) {
        throw new Error(error);
      }
    },

    async deletePost(_, { postId }, context) {
      const authorizedUser = checkAuth(context);

      try {
        const post = await Post.findById(postId);

        if (!post) throw new Error('Post not found by that id');

        if (String(post.user) !== String(authorizedUser.id)) {
          throw new AuthenticationError('Not authorized to delete post');
        }

        await post.delete();

        return 'Post deleted from database';
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default postResolvers;
