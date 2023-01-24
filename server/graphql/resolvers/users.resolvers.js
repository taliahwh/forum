import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../../config.js';

import User from '../../models/userModel.js';

const SECRET_KEY = process.env.SECRET_KEY;

const userResolvers = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: Validate user data
      // TODO: Make sure user does not already exist
      const emailExists = User.findOne({ email });
      // const emailExists = User.findOne({ email });

      /**
       * Salt: adds random chars to data, to stop hackers who look for
       * consistent words and phrases in sensitive data in order to decode it.
       * Hash: takes plaintext data and converts them into consistent ciphertext
       *
       * Hashing salting is essentially an additional step to keep passwords
       *  out of the hands of malicious hackers
       */
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
