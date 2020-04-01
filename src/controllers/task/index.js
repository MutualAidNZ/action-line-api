import mongooseCrudify from 'mongoose-crudify';
import Task from '../../models/Task';
import { ensurePermission } from '../../helpers/permissions';
import createTaskController from './create';
import listTaskController from './list';

export default mongooseCrudify({
  Model: Task,
  beforeActions: [
    {
      middlewares: [ensurePermission('list:task')],
      only: ['list'],
    },
    {
      middlewares: [ensurePermission('create:task')],
      only: ['create'],
    },
  ],
  actions: {
    list: listTaskController,
    create: createTaskController,
  },
});
