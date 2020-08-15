import React, { useRef, useCallback} from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Container, Content, Background } from './styles';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../context/AuthContext'
import logoImg from '../../assets/logoImg.svg';
import Input from '../../components/input'
import Button from '../../components/button'

interface SignInFormData {
    email:string;
    password:string;
}

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { user, signIn } = useAuth();

    console.log(user);

    // Toda variável externa usada dentro do useCallBack deve estar dentro do array do segundo parâmetro
    const handleSubmit = useCallback( async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(5, 'Senha incorreta'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            signIn({
                email: data.email,
                password: data.password,
            });
        } catch (err) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
        }
    }, [signIn]);

    return (
    <Container>
        <Content>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu logon</h1>

                <Input name='email' icon={FiMail} placeholder="E-mail" />

                <Input name='password' icon={FiLock} type="password" placeholder="Senha" />

                <Button type="submit">Entrar</Button>

                <a href="forgot">Esqueci minha senha</a>
            </Form>

            <a href="login">
                <FiLogIn />
                Criar conta
            </a>
        </Content>
        <Background />
    </Container>)
};

export default SignIn;