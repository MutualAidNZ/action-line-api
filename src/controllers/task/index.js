import { Router } from 'express';
import { ensurePermission } from '../../helpers/permissions';
import createTaskController from './create';
import listTaskController from './list';
import viewTaskController from './view';
import claimTaskController from './claim';
import completeTaskController from './complete';

const taskRouter = new Router();

taskRouter.get('/', ensurePermission('list:task'), listTaskController);
taskRouter.get('/:id', ensurePermission('read:task'), viewTaskController);
taskRouter.post('/', ensurePermission('create:task'), createTaskController);
taskRouter.post(
  '/claim/:id',
  ensurePermission('claim:task'),
  claimTaskController
);
taskRouter.post(
  '/complete/:id',
  ensurePermission('claim:task'),
  completeTaskController
);

export default taskRouter;
