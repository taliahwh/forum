import colors from 'colors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { ApolloServer } from 'apollo-server';

import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';
import connectDB from './db.js';

dotenv.config();

// connectDB();

// app.use(bodyParser.urlencoded());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// Connect to MongoDB
const PORT = process.env.PORT;
server.listen({ port: PORT }).then((res) => {
  console.log(`Server running on at ${res.url}`.blue.bold);
});
