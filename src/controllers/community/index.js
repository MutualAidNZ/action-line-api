import { Router } from 'express';
import { ensurePermission } from '../../helpers/permissions';
import viewCommunityController from './view';

const communityRouter = new Router();

// TODO: Add permissions
// communityRouter.get('/', listCommunityController);
communityRouter.get('/:id', viewCommunityController);

export default communityRouter;
