import React from 'react';
import config from './config';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const routes = [
    { path: config.routes.home, exact: true, name: 'Home' },
    { path: config.routes.dashboard, name: 'Dashboard', element: Dashboard },
];

export default routes;
