import postResolvers from './posts.resolvers.js';
import userResolvers from './users.resolvers.js';
import commentResolvers from './comments.resolvers.js';

const resolvers = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};

export default resolvers;
