import Post from '../../models/postModel.js';
import checkAuth from '../../util/check-auth.js';
import { UserInputError } from 'apollo-server';

const commentResolvers = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username } = checkAuth(context);

      try {
        if (!body.trim().length)
          throw new UserInputError('Empty comment', {
            errors: {
              body: 'Comment body must not be empty',
            },
          });

        const post = await Post.findById(postId);

        if (!post)
          throw new UserInputError(`Post not found with id: ${postId}`);

        post.comments.unshift({
          username,
          body,
          createdAt: new Date().toISOString(),
        });

        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default commentResolvers;
