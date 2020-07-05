import { Router, response } from 'express';
// startOfHour zera a hora em que se está sendo feito o agendamento
// parseISO converte a data do insomnia para uma Date do javascript
//isEqual é para procurar no banco uma data igual a inserida
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointments';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    // vai percorrrer o banco para achar uma data igual ao parseDate recebido
    const findAppointmentInSameDate = appointments.find(appointment =>
        isEqual(parsedDate, appointment.date),
    );

    if (findAppointmentInSameDate) {
        return response.status(400).json({message: 'This appointment is already booked'})
    }

    const appointment = new Appointment(provider, parsedDate);

    appointments.push(appointment);
    return response.json(appointment);
})

export default appointmentsRouter;