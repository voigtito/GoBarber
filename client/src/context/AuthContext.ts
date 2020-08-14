import { createContext } from 'react';

interface AuthContextData {
    name: string;
}

// createContext exige um contexto padrão, entao forçamos para ser as AuthContext 
// para não precisar passar um valor no objeto.
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default AuthContext;