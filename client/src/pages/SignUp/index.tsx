import React, {useCallback, useRef} from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles} from '@unform/core'
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logoImg.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/input'
import Button from '../../components/button'

const SignUp: React.FC = () => {
    // FormHandles para acessar as tipagens das funções
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback( async (data: object) => {
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

        } catch (err) {
            
            // Passa para a função de dentro de /utils onde faz o forEach para os erros
            const errors = getValidationErrors(err);

            // Retorna os erros para o formulário
            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <Container>
            <Background />
            <Content>
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

                <a href="login">
                    <FiArrowLeft />
                Voltar para Logon
            </a>
            </Content>
        </Container>
    )
};

export default SignUp;