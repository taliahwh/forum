import { model, Schema } from 'mongoose';

// The requirement options will be handled in the GraphQL layer
const postSchema = new Schema(
  {
    body: String,
    username: String,
    comments: [
      {
        body: String,
        username: String,
        createdAt: Date,
      },
    ],
    likes: [
      {
        username: String,
        createdAt: Date,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  // Auto geneterates createdAt/updatedAt fields
  { timestamps: true }
);

const Post = model('Post', postSchema);

export default Post;
