import React from 'react';
import { Container } from './styles';

import {useToast, ToastMessage} from '../../context/ToastContext'
import { Toast } from './Toast/index'

// Esta interface poderia ser importada, mas prefiro realizar assim (mais visual)
interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContaier: React.FC<ToastContainerProps> = ({messages}) => {

    return (
        <Container>
            {messages.map((message) => (
                <Toast key={message.id} toast={message}/>
            ))}
        </Container>
    )
};

export default ToastContaier;