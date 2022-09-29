import React from 'react';
import config from './config';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Freelancer = React.lazy(() => import('./views/Freelancer'));
const Recruiter = React.lazy(() => import('./views/Recruiter'));
const Staff = React.lazy(() => import('./views/Staff'));
const Career = React.lazy(() => import('./views/Career'));
const SubCareer = React.lazy(() => import('./views/SubCareer'));
const Service = React.lazy(() => import('./views/Service'));
const Payment = React.lazy(() => import('./views/Payment'));
const Support = React.lazy(() => import('./views/Support'));

const routes = [
    { path: config.routes.home, exact: true, name: 'Home' },
    { path: config.routes.dashboard, name: 'Dashboard', element: Dashboard },
    { path: config.routes.freelancer, name: 'Freelancer', element: Freelancer },
    { path: config.routes.recruiter, name: 'Recruiter', element: Recruiter },
    { path: config.routes.staff, name: 'Staff', element: Staff },
    { path: config.routes.career, name: 'Career', element: Career },
    { path: config.routes.subCareer, name: 'SubCareer', element: SubCareer },
    { path: config.routes.service, name: 'Service', element: Service },
    { path: config.routes.payment, name: 'Payment', element: Payment },
    { path: config.routes.support, name: 'Support', element: Support },
];

export default routes;
