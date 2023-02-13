import { model, Schema } from 'mongoose';

// The requirement options will be handled in the GraphQL layer
const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  // Auto geneterates createdAt/updatedAt fields
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
