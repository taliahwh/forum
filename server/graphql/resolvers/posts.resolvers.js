import Post from '../../models/postModel.js';

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
  },
};

export default postResolvers;
