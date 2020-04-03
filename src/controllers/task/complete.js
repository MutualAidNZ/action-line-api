import Task, { TASK_STATUSES } from '../../models/Task';

export default async function completeTaskController(req, res) {
  const { user } = req;

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    if (!task.assignee.includes(user._id)) {
      return res.status(400).send();
    }

    task.status = TASK_STATUSES.CLOSED_SUCCESS;

    task.log.push({
      body: `${user.profile.name} completed the task`,
      actor: user._id,
      user: user._id,
    });

    await task.save();

    return res.send(task);
  } catch (e) {
    console.error(e);
    return res.status(500).send({ code: 'FAILED', error: e.message });
  }
}
