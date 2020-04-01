import mongoose, { Schema } from 'mongoose';

export const LOCATION_TYPES = {
  COUNTRY: 'COUNTRY',
  COUNTY: 'COUNTY',
  STATE: 'STATE',
  DISTRICT: 'DISTRICT',
  POSTAL_CODE: 'POSTAL_CODE',
  STREET: 'STREET',
  CITY: 'CITY',
};

const LocationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.keys(LOCATION_TYPES),
      required: true,
    },
    parent: {
      type: Schema.ObjectId,
      ref: 'Location',
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

const Location = mongoose.model('Location', LocationSchema);

export default Location;
