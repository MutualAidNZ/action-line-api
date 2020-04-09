import mongoose, { Schema } from 'mongoose';

export const TASK_STATUSES = {
  CREATED: 'CREATED',
  INVALID: 'INVALID',
  READY: 'READY',
  IN_PROGRESS: 'IN_PROGRESS',
  CLOSED_SUCCESS: 'CLOSED_SUCCESS',
  CLOSED_FAILED: 'CLOSED_FAILED',
  CLOSED_INVALID: 'CLOSED_INVALID',
};

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    assignee: [
      {
        type: Schema.ObjectId,
        ref: 'User',
      },
    ],
    status: {
      type: String,
      enum: Object.keys(TASK_STATUSES),
      default: TASK_STATUSES.CREATED,
    },
    community: [
      {
        type: Schema.ObjectId,
        ref: 'Community',
      },
    ],
    tag: [
      {
        type: Schema.ObjectId,
        ref: 'Tag',
      },
    ],
    requester: {
      name: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      state: String,
      county: String,
      city: String,
      district: String,
      street: String,
      postcode: {
        type: String,
        required: true,
      },
    },
    tasks: [
      {
        type: Schema.ObjectId,
        ref: 'Task',
      },
    ],
    comments: [
      new Schema(
        {
          body: {
            type: String,
            required: true,
          },
          user: {
            type: Schema.ObjectId,
            ref: 'User',
          },
        },
        { timestamps: true }
      ),
    ],
    log: [
      new Schema(
        {
          body: {
            type: String,
            required: true,
          },
          actor: {
            type: Schema.ObjectId,
            ref: 'User',
          },
          user: {
            type: Schema.ObjectId,
            ref: 'User',
          },
        },
        { timestamps: true }
      ),
    ],
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;
