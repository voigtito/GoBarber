import { Router, response } from 'express';
// startOfHour zera a hora em que se está sendo feito o agendamento
// parseISO converte a data do insomnia para uma Date do javascript
//isEqual é para procurar no banco uma data igual a inserida
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentsRepository.findByDate(
        parsedDate
        );

    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointment is already booked' })
    }

    const appointment = appointmentsRepository.create(provider, parsedDate);

    return response.json(appointment);
})

export default appointmentsRouter;