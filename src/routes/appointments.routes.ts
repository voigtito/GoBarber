import { Router, response } from 'express';
import { uuid } from 'uuidv4';
// startOfHour zera a hora em que se está sendo feito o agendamento
// parseISO converte a data do insomnia para uma Date do javascript
//isEqual é para procurar no banco uma data igual a inserida
import { startOfHour, parseISO, isEqual } from 'date-fns'

const appointmentsRouter = Router();

interface Appointment {
    id: string;
    provider: string;
    date: Date;
}

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

    const appointment = {
        id: uuid(),
        provider,
        date: parsedDate,
    };

    appointments.push(appointment);
    return response.json(appointment);
})

export default appointmentsRouter;