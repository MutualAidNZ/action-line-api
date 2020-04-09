import Task, { TASK_STATUSES } from '../../models/Task';
import { USER_TYPES } from '../../models/User';

const select = 'title status body requester.postcode tag';

async function getMyTasks(req) {
  const tasks = await Task.where({
    assignee: { $in: req.user._id },
  })
    .select(select)
    .populate('community', '_id type name')
    .exec();

  return tasks;
}

export default async function listTasksController(req, res) {
  const { type } = req.user;

  let query = {
    status: { $in: [TASK_STATUSES.READY] },
  };

  switch (type) {
    case USER_TYPES.ADMINISTRATOR:
      query = query;
      break;
    case USER_TYPES.COORDINATOR:
      query = {
        community: { $in: req.user.communities },
      };
    case USER_TYPES.VOLUNTEER:
      query = {
        ...query,
        community: { $in: req.user.communities },
      };
      break;
  }

  try {
    const myTasks = await getMyTasks(req);
    const tasks = await Task.where(query)
      .select(select)
      .populate('community', '_id type name')
      .exec();

    return res.send({
      myTasks,
      tasks,
      role: type,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ code: 'FAILED', error: e.message });
  }
}
