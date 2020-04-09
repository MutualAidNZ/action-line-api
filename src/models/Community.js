import mongoose, { Schema } from 'mongoose';

export const COMMUNITY_TYPES = {
  COUNTRY: 'COUNTRY',
  COUNTY: 'COUNTY',
  STATE: 'STATE',
  DISTRICT: 'DISTRICT',
  POSTAL_CODE: 'POSTAL_CODE',
  STREET: 'STREET',
  CITY: 'CITY',
  FORMAL: 'FORMAL',
  INFORMAL: 'INFORMAL',
};

export const COMMUNITY_ACCESS_TYPES = {
  OPEN: 'OPEN',
  OPEN_MUST_APPLY: 'OPEN_MUST_APPLY',
  INVITE_ONLY: 'INVITE_ONLY',
};

const CommunitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.keys(COMMUNITY_TYPES),
      required: true,
    },
    access: {
      type: String,
      enum: Object.keys(COMMUNITY_ACCESS_TYPES),
      required: true,
      default: COMMUNITY_ACCESS_TYPES.OPEN_MUST_APPLY,
    },
    parent: {
      type: Schema.ObjectId,
      ref: 'Community',
    },
    controllers: [
      {
        type: Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const Community = mongoose.model('Community', CommunitySchema);

export default Community;
