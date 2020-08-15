import React from 'react';

import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn/index'
// import SignUp from './pages/SignUp/index'

import { AuthProvider } from './context/AuthContext';

// AuthContext.Provider todo componente dentro dele tem acesso as informações do authContext

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyle />
  </>
)

export default App;
