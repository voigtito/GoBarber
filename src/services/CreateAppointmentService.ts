import Appointment from '../models/Appointments';
import {startOfHour} from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

/**
 * Recibemento das informações
 * Tratativas de erros/excessões
 * Acesso ao repositório
 */

 // Quando é no service se chama Request
 interface RequestDTO {
    provider_id: string;
    date: Date;
 }

 /**
  * Dependency Inversion
  */

class CreateAppointmentService {
    // Todo service tem um único método chamado run ou execute (publico sempre)
    public async execute({ provider_id, date}: RequestDTO): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate
        );
        
        // Sempre é feito por meio desses throw Error no service
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked')
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }

}

export default CreateAppointmentService;