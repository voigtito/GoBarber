import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth'
import { inject, injectable} from 'tsyringe'

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor( 
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
        ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // Compare is a method from bcrypt that comapres the password given with the user bcrypted password from database in user
        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        /**
         * Primeiro parâmetro é o payload do token, esses dados não são seguros, pois podem ser acessados.
         * Segundo é http://www.md5.cz/ uma chave secreta gerada por meio de uma string, chamado de secret da aplicação.
         * Terceiro são alguns dados a serem passados no token como id do usuário, tempo de expiração do token, etc..
         * Para checar o token basta ir em jwt.io e mostra data de criação do token, expiração, id do usuário etc..
         */
        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });

        return {
            user,
            token,
        };
    };
};

export default AuthenticateUserService;