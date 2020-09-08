import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersControllers'
import UserAvatarController from '../controllers/UserAvatarController'

import ensureAuthenticaded from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

// Patch usado para lateração de informação unica
usersRouter.patch('/avatar', ensureAuthenticaded, upload.single('avatar'), userAvatarController.update);

export default usersRouter;