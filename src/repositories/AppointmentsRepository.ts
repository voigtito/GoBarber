import Appointment from '../models/Appointments';
import { isEqual } from 'date-fns';

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public findByDate(date: Date): Appointment | null {
        // vai percorrrer o banco para achar uma data igual ao parseDate recebido
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );

        return findAppointment || null;
    }

    public create(provider: string, date: Date): Appointment {
        const appointment = new Appointment(provider, date);

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;