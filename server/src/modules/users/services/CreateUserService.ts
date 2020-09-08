import { inject, injectable} from 'tsyringe'
import User from '../infra/typeorm/entities/User';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
    name: string;
    email: string;
    password: string;
}
@injectable()
class CreateUserService {
    constructor( 
        @inject('UserRepository')
        private usersRepository: IUsersRepository,
        ) {}

    public async execute({name, email, password}: IRequest): Promise<User> {

        // Will check if the user exists in database
        const checkUserExists = await this.usersRepository.findByEmail(email);

        // Error in case the user exists
        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 8);

        // Create and store the user in a var
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        // Save the user created in the database
        await this.usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;