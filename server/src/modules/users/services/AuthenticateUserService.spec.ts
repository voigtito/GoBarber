import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
    it('should be able to autenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456'
        });

        // para verificar se foi criado, deve garantir as propriedades do appointment, para ver se foi criado
        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);

    });
});