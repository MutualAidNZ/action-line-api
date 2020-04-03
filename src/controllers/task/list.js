import Task, { TASK_STATUSES } from '../../models/Task';
import { USER_TYPES } from '../../models/User';

const select = 'title status body requester.postcode tag';

async function getMyTasks(req) {
  const tasks = await Task.where({
    assignee: { $in: req.user._id },
  })
    .select(select)
    .populate('location', '_id type name')
    .exec();

  return tasks;
}

export default async function listTasksController(req, res) {
  const { type } = req.user;

  let query = {
    status: { $in: [TASK_STATUSES.CREATED] },
  };

  switch (type) {
    case USER_TYPES.ADMINISTRATOR:
      query = query;
      break;
    case USER_TYPES.COORDINATOR:
    case USER_TYPES.VOLUNTEER:
      query = {
        ...query,
        location: { $in: req.user.locations },
        assignee: { $nin: req.user._id },
      };
      break;
  }

  try {
    const myTasks = await getMyTasks(req);
    const tasks = await Task.where(query)
      .select(select)
      .populate('location', '_id type name')
      .exec();

    return res.send({
      myTasks,
      tasks,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ code: 'FAILED', error: e.message });
  }
}
