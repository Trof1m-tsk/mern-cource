import { createBrowserRouter, Navigate } from 'react-router-dom';
import LinksPage from './pages/LinksPage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage.jsx';
import React from 'react';
import CommonPage from './components/CommonPage';
import AuthPage from './pages/AuthPage';

export const useRoutes = ( isAuthenticated ) => {
  return createBrowserRouter(
    [
      {
        path: '/',
        element: isAuthenticated
          ? <CommonPage isAuthenticated={ isAuthenticated }/>
          : <AuthPage/>,
        children: [
          {
            path: '/',
            element: <Navigate to={ 'create' }/>,
          },
          {
            path: '/create',
            element: <CreatePage/>,
          },
          {
            path: '/links',
            element: <LinksPage/>,
          },
          {
            path: '/detail/:id',
            element: <DetailPage/>,
          },
        ],
      },
    ],
  );
};
