import { inject, injectable} from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokenRepository from '../repositories/IUserTokenRepository'
import AppError from '@shared/errors/AppError';
import IHasProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    password: string;
    token: string;
}
@injectable()
class ResetPasswordService {
    constructor( 
        @inject('UserRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokenRepository')
        private userTokensRepository: IUserTokenRepository,

        @inject('HasProvider')
        private hasProvider: IHasProvider,
        ) {}

    public async execute({token, password}: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exist');
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token Expired');
        }

        user.password = await this.hasProvider.generateHash(password);

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;