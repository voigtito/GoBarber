import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticaded from '../middlewares/ensureAuthenticated';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository'

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        
        const usersRepository = new UsersRepository();
        const createUser = new CreateUserService(usersRepository);

        const user = await createUser.execute({ name, email, password });

        delete user.password;

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
});

// Patch usado para lateração de informação unica
usersRouter.patch('/avatar', ensureAuthenticaded, upload.single('avatar'), async (request, response) => {
    const usersRepository = new UsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user)
});

export default usersRouter;