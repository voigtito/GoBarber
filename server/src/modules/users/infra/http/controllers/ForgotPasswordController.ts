import { Response, Request} from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository'

export default class ForgotPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        
        const { email } = request.body;
        
        const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailService)

        await sendForgotPasswordEmail.execute({
            email
        });

        return response.status(204).json();
    }
}