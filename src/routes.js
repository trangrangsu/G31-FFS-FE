import React from 'react';
import config from './config';

// Layouts
const HomeLayout = React.lazy(() => import('./layout/HomeLayout'));
// Pages
const Dashboard = React.lazy(() => import('./views/admin/dashboard/Dashboard'));
const Freelancer = React.lazy(() => import('./views/admin/Freelancer'));
const Recruiter = React.lazy(() => import('./views/admin/Recruiter'));
const Staff = React.lazy(() => import('./views/admin/Staff'));
const Career = React.lazy(() => import('./views/admin/Career'));
const SubCareer = React.lazy(() => import('./views/admin/SubCareer'));
const Service = React.lazy(() => import('./views/admin/Service'));
const Payment = React.lazy(() => import('./views/admin/Payment'));
const Support = React.lazy(() => import('./views/admin/Support'));
const ContentHome = React.lazy(() => import('./views/pages/ContentHome'));
const Login = React.lazy(() => import('./views/pages/login'));
const Register = React.lazy(() => import('./views/pages/register'));
const UpdateFreelancerProfile = React.lazy(() => import('./views/Freelancer/Update'));
const UpdateRecruiterProfile = React.lazy(() => import('./views/recruiter/Update'));
const ViewDetailFreelancer = React.lazy(() => import('./views/pages/ViewDetailFreelancer'));

// Public routes
export const routes = [
    { path: config.routes.home, element: ContentHome, layout: HomeLayout },
    { path: config.routes.login, element: Login, layout: HomeLayout },
    { path: config.routes.register, element: Register, layout: HomeLayout },
    { path: config.routes.dashboard, element: Dashboard },
    { path: config.routes.freelancer, element: Freelancer },
    { path: config.routes.recruiter, element: Recruiter },
    { path: config.routes.staff, element: Staff },
    { path: config.routes.career, element: Career },
    { path: config.routes.subCareer, element: SubCareer },
    { path: config.routes.service, element: Service },
    { path: config.routes.payment, element: Payment },
    { path: config.routes.support, element: Support },
    { path: config.routes.updateFreelancer, element: UpdateFreelancerProfile, layout: HomeLayout },
    { path: config.routes.updateRecruiter, element: UpdateRecruiterProfile, layout: HomeLayout },
    { path: config.routes.viewDetailFreelancer, element: ViewDetailFreelancer, layout: HomeLayout },
];

// Private routes
export const privateRoutes = [];
export default routes;
