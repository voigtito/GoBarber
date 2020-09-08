import {startOfHour} from 'date-fns';
import {inject, injectable} from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointments';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

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

@injectable()
class CreateAppointmentService {

    // declarando private antes do parametro, é a mesma coisa que declarar o atributo this. na classe
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
        ) {}

    // Todo service tem um único método chamado run ou execute (publico sempre)
    public async execute({ provider_id, date}: RequestDTO): Promise<Appointment> {

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate
        );
        
        // Sempre é feito por meio desses throw Error no service
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked')
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        return appointment;
    }

}

export default CreateAppointmentService;