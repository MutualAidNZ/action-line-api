import Task from '../../models/Task';

export default async function viewTaskController(req, res) {
  const { id } = req.params;

  try {
    const task = await Task.findById(id)
      .populate('community')
      .populate('assignee')
      .exec();

    if (!task) {
      return res.status(404).send();
    }

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
