import Task, { TASK_STATUSES } from '../../models/Task';
import { sendTemplatedEmail } from '../../services/email';
import logger from '../../services/logger';

const log = logger.child({ module: 'claimTaskController' });

export default async function claimTaskController(req, res) {
  const { user } = req;

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    if (task.assignee.includes(user._id)) {
      return res.status(400).send();
    }

    task.status = TASK_STATUSES.IN_PROGRESS;
    task.assignee.push(user._id);

    task.log.push({
      body: `Assigned to ${user.profile.name}`,
      actor: user._id,
      user: user._id,
    });

    await task.save();

    // Send a confirmation email to the volunteer
    await sendTemplatedEmail({
      templateName: 'claim-task',
      email: user.profile.email,
      subject: `You have claimed a request - "${task.title}"`,
      data: {
        task,
        user,
      },
    });

    // TODO: Notify co-ordinator - digest?

    return res.send(task);
  } catch (e) {
    console.error(e);
    return res.status(500).send({ code: 'FAILED', error: e.message });
  }
}
