import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
//
import { mainRoutes } from './main';
import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';
import { componentsRoutes } from './components';
import AuthClassicLayout from 'src/layouts/auth/classic';
import { JwtLoginView } from 'src/sections/auth/jwt';


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    // {
    //   path: '/',
    //   element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    // },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    {
      path: '/',
      element: (
        <AuthClassicLayout>
          <JwtLoginView />
        </AuthClassicLayout>
      ),
    },

    // Auth routes
    ...authRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // Main routes
    ...mainRoutes,

    // Components routes
    ...componentsRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
