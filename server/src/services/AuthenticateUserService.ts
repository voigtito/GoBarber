import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth'

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User
    token: string;
}

class AuthenticateUserService {

    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // Compare is a method from bcrypt that comapres the password given with the user bcrypted password from database in user
        const passwordMatched = await compare(password, user.password);

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