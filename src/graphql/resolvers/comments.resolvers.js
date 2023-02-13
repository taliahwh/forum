import Post from '../../models/postModel.js';
import checkAuth from '../../util/check-auth.js';
import { AuthenticationError, UserInputError } from 'apollo-server';

const commentResolvers = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username, id: userId } = checkAuth(context);

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

        const newComment = {
          username,
          body,
          createdAt: new Date().toISOString(),
        };
        post.comments.unshift(newComment);

        await post.save();

        return post;
      } catch (error) {
        throw new Error(error);
      }
    },

    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (!post)
          throw new UserInputError(`Post not found with id: ${postId}`);

        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        // Check if usernames match -> user is authorized to delete comment
        if (post.comments[commentIndex].username !== username)
          throw new AuthenticationError(
            `Not authorized to delete comment: usernames 
            ${post.comments[commentIndex].username} and ${username} do not match`
          );

        // delete comment from post and return updated post
        post.comments.splice(commentIndex, 1);
        const updatedPost = await post.save();
        return updatedPost;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default commentResolvers;
