import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../config/upload';

import UpdateUserAvatarService from '../../modules/users/services/UpdateUserAvatarService';

import CreateUserService from '../../modules/users/services/CreateUserService';

import ensureAuthenticaded from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        console.log(request.body)
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });

        delete user.password;

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
});

// Patch usado para lateração de informação unica
usersRouter.patch('/avatar', ensureAuthenticaded, upload.single('avatar'), async (request, response) => {

    const updateUserAvatar = new UpdateUserAvatarService;

    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user)
});

export default usersRouter;