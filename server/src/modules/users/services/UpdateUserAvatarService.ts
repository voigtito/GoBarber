import path from 'path';
import User from '../infra/typeorm/entities/User';
import fs from 'fs';
import { inject, injectable} from 'tsyringe'

import uploadConfig from '@config/upload';
import upload from '@config/upload';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor( 
        @inject('UserRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
        ) {}

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Only authenticated users can change avatar.', 401);
        }

        if (user.avatar) {
           await this.storageProvider.deleteFile(user.avatar);
        }
        // se ele já tiver, ele vai salvar em cima
        const filename = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = filename;

        // Método save() funciona para criar um usuário, mas também para atualizar as informações de um usuário.
        await this.usersRepository.save(user);
        
        return user;

    }
}

export default UpdateUserAvatarService;