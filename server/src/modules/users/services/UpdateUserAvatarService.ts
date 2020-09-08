import path from 'path';
import User from '../infra/typeorm/entities/User';
import fs from 'fs';

import uploadConfig from '@config/upload';
import upload from '@config/upload';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    constructor( private usersRepository: IUsersRepository) {}

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Only authenticated users can change avatar.', 401);
        }

        if (user.avatar) {
            // Deletar o avatar anterior
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            // File System do node. Realiza uma promise com a função stat para verificar se o arquivo existe
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
            
        }

        user.avatar = avatarFilename;

        // Método save() funciona para criar um usuário, mas também para atualizar as informações de um usuário.
        await this.usersRepository.save(user);
        
        return user;

    }
}

export default UpdateUserAvatarService;