import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

const checkAuth = (context) => {
  // conext = { ... headers }
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];

    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);

        return user;
      } catch (error) {
        console.log('Authentication error');
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authorization token must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};

export default checkAuth;
