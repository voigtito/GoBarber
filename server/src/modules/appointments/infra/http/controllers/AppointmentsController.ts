import { Request, Response} from 'express';

// startOfHour zera a hora em que se está sendo feito o agendamento
// parseISO converte a data do insomnia para uma Date do javascript
//isEqual é para procurar no banco uma data igual a inserida
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
    public async create(request: Request, response: Response): Promise<Response> {
        
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);
        // comentado porque foi feita injeção de dependencias ( colocar a variavel dentro do parametro ali)
        // const appointmentsRepository = new AppointmentsRepository();
        // const createAppointment = new CreateAppointmentService();
        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id
        });

        return response.json(appointment);
    };
}