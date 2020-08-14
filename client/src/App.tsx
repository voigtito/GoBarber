import React from 'react';

import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn/index'
// import SignUp from './pages/SignUp/index'

import AuthContext from './context/AuthContext';

// AuthContext.Provider todo componente dentro dele tem acesso as informações do authContext

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Voigt' }}>
      <SignIn />
    </AuthContext.Provider>
    <GlobalStyle />
  </>
)

export default App;
