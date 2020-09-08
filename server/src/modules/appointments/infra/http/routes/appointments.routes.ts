import { Router } from 'express';
// startOfHour zera a hora em que se está sendo feito o agendamento
// parseISO converte a data do insomnia para uma Date do javascript
//isEqual é para procurar no banco uma data igual a inserida
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router();

// Here the route is using the middleware to authenticate
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
    
    //     const appointments = await appointmentsRepository.find();
    
    //     return response.json(appointments)
    // });
    
    appointmentsRouter.post('/', async (request, response) => {
        
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
})

export default appointmentsRouter;