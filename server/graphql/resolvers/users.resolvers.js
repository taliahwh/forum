import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../../config.js';

import User from '../../models/userModel.js';

const userResolvers = {
  Mutation: {
    async register(
      _,
      { registerInput: username, email, password, confirmPassword },
      context,
      info
    ) {
      //  TODO: Validate user data
      // TODO: Make sure user doesn't already exist
      // TODO: Hash password and create auth token

      const hashedPassword = await bcrypt.hash(password, 12).toString();

      const newUser = User.create({
        username,
        password: hashedPassword,
        email,
      });

      console.log(newUser);

      // const token = jwt.sign(
      //   {
      //     id: newUser.id,
      //     email: newUser.email,
      //     username: newUser.username,
      //   },
      //   config.SECRET_KEY,
      //   { expiresIn: '1hr' }
      // );

      // return {
      //   ...newUser._doc,
      //   id: newUser.id,
      //   token,
      // };
    },
  },
};

export default userResolvers;
