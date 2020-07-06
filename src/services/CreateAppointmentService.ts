import Appointment from '../models/Appointments';
import {startOfHour} from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository'

/**
 * Recibemento das informações
 * Tratativas de erros/excessões
 * Acesso ao repositório
 */

 // Quando é no service se chama Request
 interface RequestDTO {
    provider: string;
    date: Date;
 }

 /**
  * Dependency Inversion
  */

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;
    
    constructor(appointmentsRepository: AppointmentsRepository){
        this.appointmentsRepository = appointmentsRepository;
    }

    // Todo service tem um único método chamado run ou execute (publico sempre)
    public execute({ provider, date}: RequestDTO): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate
        );
        
        // Sempre é feito por meio desses throw Error no service
        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked')
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }

}

export default CreateAppointmentService;