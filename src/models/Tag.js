import mongoose, { Schema } from 'mongoose';

const Tag = mongoose.model(
  'Tag',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

export default Tag;
