import React from 'react';
import { useTransition } from 'react-spring';

import { Container } from './styles';
import {ToastMessage} from '../../context/ToastContext'
import { Toast } from './Toast/index'

// Esta interface poderia ser importada, mas prefiro realizar assim (mais visual)
interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContaier: React.FC<ToastContainerProps> = ({messages}) => {
    const messagesWithTransitions = useTransition(
        messages, 
        message => message.id,
        {
            from: { right: '-120%', opacity: 0 },
            enter: { right: '0%', opacity: 1  },
            leave: { right: '-120%', opacity: 0  }
        }
        )

    return (
        <Container>
            {messagesWithTransitions.map(({item, key, props}) => (
                <Toast key={key} style={props} toast={item}/>
            ))}
        </Container>
    )
};

export default ToastContaier;