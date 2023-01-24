import postResolvers from './posts.resolvers.js';
import userResolvers from './users.resolvers.js';

const resolvers = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
  },
};

export default resolvers;
