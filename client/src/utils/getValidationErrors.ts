import { ValidationError } from 'yup'

// Indica que a interface pode ser qualquer string, pode usar qualquer nome no lugar do "key".
// Usa-se isso para se tornar mais genérica
interface Errors {
    [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
    const validationErrors: Errors = {};
    
    // Para cada erro recebido, cria-se um nome com o 'path' com a mensagem do erro 'message'
    err.inner.forEach( error => {
        validationErrors[error.path] = error.message
    });

    return validationErrors;
}