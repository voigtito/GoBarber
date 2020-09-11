import { inject, injectable} from 'tsyringe'

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokenRepository from '../repositories/IUserTokenRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import AppError from '@shared/errors/AppError';

interface IRequest {
    email: string;
}
@injectable()
class SendForgotEmailService {
    constructor( 
        @inject('UserRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokenRepository')
        private userTokensRepository: IUserTokenRepository,
        ) {}

    public async execute({email}: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists.')
        };

        await this.userTokensRepository.generate(user.id);

        this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido.')
    }
}

export default SendForgotEmailService;