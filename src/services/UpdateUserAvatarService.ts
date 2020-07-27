import path from 'path';
import { getRepository} from 'typeorm';
import User from '../models/User';
import fs from 'fs';

import uploadConfig from '../config/upload';
import upload from '../config/upload';

interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new Error('Only authenticated users can change avatar.');
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
        await usersRepository.save(user);
        
        return user;

    }
}

export default UpdateUserAvatarService;