import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123123123',
        });

        // para verificar se foi criado, deve garantir as propriedades do appointment, para ver se foi criado
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123123');

    });

    it('should not be able to create to appointment on the same date and time', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

        const appointmentDate = new Date(2020, 4, 10, 11);

        const appointment = await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123123',
        });

        expect(createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123123',
        })).rejects.toBeInstanceOf(AppError);

    });
});