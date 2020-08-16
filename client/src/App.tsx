import React from 'react';

import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn/index'
// import SignUp from './pages/SignUp/index'
import { AppProvider } from './context/index';

// AuthContext.Provider todo componente dentro dele tem acesso as informações do authContext

const App: React.FC = () => (
  <>
    <AppProvider>
        <SignIn />
    </AppProvider>
    <GlobalStyle />
  </>
)

export default App;
