import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/apiClient';

import { useToast } from '../../context/ToastContext'

import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logoImg.svg';
import Input from '../../components/input'
import Button from '../../components/button'
import { Container, Content, Background, AnimationContainer } from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    // FormHandles para acessar as tipagens das funções
    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {
            // Zerando os erros
            formRef.current?.setErrors({});

            // para validação de um objeto geralmente se cria um schema:
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/users', data);

            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer seu logon no GoBarber!'
            });

        } catch (err) {

            // para validação de um objeto geralmente se cria um schema:
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/users', data);

            history.push('/');

            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer cadastro, tente novamente.'
            });
        }
    }, [addToast, history]);

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu cadastro</h1>
                        <Input
                            name='name'
                            icon={FiUser}
                            placeholder="Nome"
                        />
                        <Input
                            name='email'
                            icon={FiMail}
                            placeholder="E-mail"
                        />
                        <Input
                            name='password'
                            icon={FiLock}
                            type="password"
                            placeholder="Senha"
                        />

                        <Button type="submit">Cadastrar</Button>
                    </Form>

                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para Logon
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    )
};

export default SignUp;