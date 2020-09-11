import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {

    beforeEach(() => {

        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokenRepository = new FakeUserTokenRepository();
        
        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository, 
            fakeMailProvider,
            fakeUserTokenRepository
            );

    })

    it('should be able to recover the users password', async () => {
            
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        const appointment = await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        });

        expect(sendMail).toHaveBeenCalled();

    });

    it('should not be able to recover a non-existent user password', async () => {

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await expect(
            sendForgotPasswordEmail.execute({
                email: 'johndoe@example.com',
            })).rejects.toBeInstanceOf(AppError);

    });

    it('should generate a forgot password token', async () => {

        const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);

    });
});