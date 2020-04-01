import Task from '../../models/Task';
import { USER_TYPES } from '../../models/User';

export default async function listTasksController(req, res) {
  const { type } = req.user;

  let query;
  const select = 'title status body requester.postcode tag';

  switch (type) {
    case USER_TYPES.ADMINISTRATOR:
      query = {};
      break;
    case USER_TYPES.COORDINATOR:
      query = {
        location: { $in: req.user.locations },
      };
      break;
    default:
    case USER_TYPES.VOLUNTEER:
      query = {
        $or: [
          {
            location: { $in: req.user.locations },
          },
          {
            assignee: { $in: req.user.locations },
          },
        ],
      };
      break;
  }

  console.log(query);

  try {
    const tasks = await Task.where(query)
      .select(select)
      .populate('location', '_id type name')
      .exec();
    return res.send(tasks);
  } catch (e) {
    console.error(e);
    return res.status(500).send({ code: 'FAILED', error: e.message });
  }
}
