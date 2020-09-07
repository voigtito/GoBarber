import { Router, response } from 'express';
import { getCustomRepository } from 'typeorm';
// startOfHour zera a hora em que se está sendo feito o agendamento
// parseISO converte a data do insomnia para uma Date do javascript
//isEqual é para procurar no banco uma data igual a inserida
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../../modules/appointments/entities/Appointments';
import AppointmentsRepository from '../../modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router();

// Here the route is using the middleware to authenticate
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments)
});

appointmentsRouter.post('/', async (request, response) => {

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id
    });

    return response.json(appointment);
})

export default appointmentsRouter;