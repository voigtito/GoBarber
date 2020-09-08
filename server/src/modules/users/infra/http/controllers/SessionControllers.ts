import { Response, Request} from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository'

export default class SessionsControllers {
    public async create(request: Request, response: Response): Promise<Response> {
        
        const { email, password } = request.body;
        
        // const usersRepository = new UsersRepository();
        // const authenticateUser = new AuthenticateUserService(usersRepository);
        const authenticateUser = container.resolve(AuthenticateUserService)

        const { user, token } = await authenticateUser.execute({
            email,
            password
        });

        delete user.password;

        return response.json({ user, token });
    }
}