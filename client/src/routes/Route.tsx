import React from 'react';
import { RouteProps as ReactDOMRouteProps, Route as ReactDOMRoute, Redirect } from 'react-router-dom'

import { useAuth } from '../context/AuthContext';

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    // Utilizado assim pois está vindo como {componente} e não <Componente/>
    component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) =>{
    const { user } = useAuth();

    /**
     * Cenários:
     * 1-> Rota privada e usuário está autenticado = OK
     * 2-> Rota privada e usuário não autenticado = redirecionar ao login
     * 3 -> Rota não privada e autenticado = redirecionar ao Dashboard (já fez login)
     * 4 -> Rota não privada e não autenticado = OK
     */
    return (
        // render é para modificar a logisitica pra mostrar um componente em tela, é um parametro do Route
        // a 'location' é para o usuario nao perder o histório ao ser redirecionado
        <ReactDOMRoute 
            {...rest} 
            render={( {location} ) => {
                return isPrivate === !!user ? (
                    <Component/>
                ) : (
                    <Redirect to={{
                        pathname: isPrivate ? '/' : '/dashboard', 
                        state: { from: location }
                    }}/>
                )
            }} 
        />
    );
}

export default Route;