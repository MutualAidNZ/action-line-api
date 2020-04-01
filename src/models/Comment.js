import mongoose, { Schema } from 'mongoose';

const Comment = mongoose.model(
  'Comment',
  new Schema(
    {
      body: {
        type: String,
        required: true,
      },
      owner: {
        type: Schema.ObjectId,
        ref: 'User',
      },
    },
    { timestamps: true }
  )
);

export default Comment;
