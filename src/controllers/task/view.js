import Task from '../../models/Task';
import { USER_TYPES } from '../../models/User';

export default async function viewTaskController(req, res) {
  const { type } = req.user;
  const { id } = req.params;

  try {
    const task = await Task.findById(id)
      .populate('location')
      .populate('assignee')
      .exec();

    return res.send({
      isAssignedToMe: task.assignee
        .map((a) => a._id.toString())
        .includes(req.user._id),
      ...task.toJSON(),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ code: 'FAILED', error: e.message });
  }
}
