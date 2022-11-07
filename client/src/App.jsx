import React from 'react';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';
import { useRoutes } from './routes';

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={ { token, login, logout, userId, isAuthenticated } }>
      <div>
        <RouterProvider router={ useRoutes(isAuthenticated) }/>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
