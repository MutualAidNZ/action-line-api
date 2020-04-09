import mongoose, { Schema } from 'mongoose';

export const USER_TYPES = {
  ADMINISTRATOR: 'ADMINISTRATOR',
  COORDINATOR: 'COORDINATOR',
  VOLUNTEER: 'VOLUNTEER',
  AUDITOR: 'AUDITOR',
};

const UserSchema = new Schema(
  {
    sub: {
      type: String,
      required: true,
    },
    profile: {
      type: Object,
    },
    type: {
      type: String,
      enum: Object.keys(USER_TYPES),
      required: true,
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    communities: [{ type: Schema.Types.ObjectId, ref: 'Community' }],
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
