import React from 'react';
import { Image } from 'react-native'

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/Logo.png';

import { Container, Title } from './styles';

const SignIn: React.FC = () => (
    <>
        <Container>
            <Image source={logoImg} />

            <Title>Faça seu Logon</Title>

            <Input name="email" icon="mail" placeholder="E-mail"/>
            <Input name="password" icon="lock" placeholder="Senha"/>

            <Button onPress={()=>{console.log('pressionado')}}>Entrar</Button>
        </Container>
    </>
);

export default SignIn;