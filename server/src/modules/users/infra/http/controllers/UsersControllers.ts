import { Response, Request} from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import uploadConfig from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticaded from '../middlewares/ensureAuthenticated';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository'

const upload = multer(uploadConfig);

export default class UsersControllers {
    public async create(request: Request, response: Response): Promise<Response> {
        
        try {
            const { name, email, password } = request.body;
            
            // const usersRepository = new UsersRepository();
            // const createUser = new CreateUserService(usersRepository);
            const createUser = container.resolve(CreateUserService)
            const user = await createUser.execute({ name, email, password });
    
            delete user.password;
    
            return response.json(user);
        } catch (err) {
            return response.status(400).json({ error: err.message })
        }
    }
}