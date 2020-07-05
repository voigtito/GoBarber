import { uuid } from "uuidv4";

class Appointment {
    id: string;

    provider: string;

    date: Date;

    // Omit para nao ser alterado o id, pois está sendo gerado automaticamente. Com o Omit ele nao pode ser acessado.
    constructor({ provider, date }: Omit<Appointment, 'id'>) {
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
}

export default Appointment;