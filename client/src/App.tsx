import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import GlobalStyle from './styles/global';

import { AppProvider } from './context/index';

import Routes from './routes';

// AuthContext.Provider todo componente dentro dele tem acesso as informações do authContext

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes></Routes>
    </AppProvider>
    <GlobalStyle />
  </Router>
)

export default App;
