import { getRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {

    public async execute({name, email, password}: Request): Promise<User> {
        const userRepository = getRepository(User);

        // Will check if the user exists in database
        const checkUserExists = await userRepository.findOne({
            where: { email: email },
        });

        // Error in case the user exists
        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 8);

        // Create and store the user in a var
        const user = userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        // Save the user created in the database
        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;