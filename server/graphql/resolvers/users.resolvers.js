import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server';

import config from '../../config.js';

import User from '../../models/userModel.js';

const SECRET_KEY = process.env.SECRET_KEY;

const userResolvers = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // TODO: Validate user data

      console.log(username, email);
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

      const token = jwt.sign(
        {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
        'SECRET_KEY',
        { expiresIn: '3h' }
      );

      return {
        ...newUser._doc,
        id: newUser._id,
        token,
      };
    },
  },
};

export default userResolvers;
