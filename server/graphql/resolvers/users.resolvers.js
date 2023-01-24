import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server';

import config from '../../config.js';

import {
  validateRegisterInput,
  validateLoginInput,
} from '../../util/validators.js';
import User from '../../models/userModel.js';
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    'SECRET_KEY',
    { expiresIn: '3h' }
  );
};

const userResolvers = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) throw new UserInputError('Errors', { errors });

      // Check if username or email already exists in db
      const emailExists = await User.findOne({ email });
      const usernameExists = await User.findOne({ username });

      if (emailExists)
        throw new UserInputError('Email is already in use', {
          error: {
            email: 'Email is already in use',
          },
        });

      if (usernameExists)
        throw new UserInputError('Username is already in use', {
          error: {
            username: 'Username is already in use',
          },
        });

      /**
       * Salt: adds random chars to data, to stop hackers who look for
       * consistent words and phrases in sensitive data in order to decode it.
       * Hash: takes plaintext data and converts them into consistent ciphertext
       *
       * Hashing salting is essentially an additional step to keep passwords
       *  out of the hands of malicious hackers
       */

      if (password != confirmPassword)
        throw new Error('Passwords do not match');

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        password: hashedPassword,
        email,
      });

      await newUser.save();

      // Generate new token
      const token = generateToken(newUser);

      // Returns new user, id, and token
      return {
        ...newUser._doc,
        id: newUser._id,
        token,
      };
    },

    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) throw new UserInputError('Errors', { errors });

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};

export default userResolvers;
