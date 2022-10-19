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
const Post = React.lazy(() => import('./views/admin/Post'));
const Report = React.lazy(() => import('./views/admin/Report'));
const ViewDetailFreelancerAdmin = React.lazy(() => import('./views/admin/ViewDetailFreelancer'));
const ViewDetailRecruiterAdmin = React.lazy(() => import('./views/admin/ViewDetailRecruiter'));
const ViewDetailPostAdmin = React.lazy(() => import('./views/admin/ViewDetailPost'));
const ContentHome = React.lazy(() => import('./views/pages/ContentHome'));
const Login = React.lazy(() => import('./views/pages/login'));
const Register = React.lazy(() => import('./views/pages/register'));
const UpdateFreelancerProfile = React.lazy(() => import('./views/freelancer/Update'));
const UpdateRecruiterProfile = React.lazy(() => import('./views/recruiter/Update'));
const ViewDetailFreelancer = React.lazy(() => import('./views/pages/ViewDetailFreelancer'));
const PostJob = React.lazy(() => import('./views/recruiter/Post'));
const ChangePassword = React.lazy(() => import('./views/pages/ChangePassword'));
const UserReport = React.lazy(() => import('./views/pages/UserReport'));
const Recharge = React.lazy(() => import('./views/pages/Recharge'));
const RechargeHistory = React.lazy(() => import('./views/pages/RechargeHistory'));
const Statistic = React.lazy(() => import('./views/pages/Statistic'));
const UserService = React.lazy(() => import('./views/pages/UserService'));
const FreelancerProfile = React.lazy(() => import('./views/freelancer/Profile'));
const SearchJob = React.lazy(() => import('./views/freelancer/SearchJob'));
const JobApply = React.lazy(() => import('./views/freelancer/JobApply'));
const RecruiterProfile = React.lazy(() => import('./views/recruiter/Profile'));
const SearchFreelancer = React.lazy(() => import('./views/recruiter/SearchFreelancer'));
const PostManagement = React.lazy(() => import('./views/recruiter/PostManagement'));

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
    { path: config.routes.post, element: Post },
    { path: config.routes.report, element: Report },
    { path: config.routes.viewDetailFreelancerAdmin, element: ViewDetailFreelancerAdmin },
    { path: config.routes.viewDetailRecruiterAdmin, element: ViewDetailRecruiterAdmin },
    { path: config.routes.viewDetailPostAdmin, element: ViewDetailPostAdmin },
    { path: config.routes.updateFreelancer, element: UpdateFreelancerProfile, layout: HomeLayout },
    { path: config.routes.updateRecruiter, element: UpdateRecruiterProfile, layout: HomeLayout },
    { path: config.routes.viewDetailFreelancer, element: ViewDetailFreelancer, layout: HomeLayout },
    { path: config.routes.postJob, element: PostJob, layout: HomeLayout },

    { path: config.routes.changePassword, element: ChangePassword, layout: HomeLayout },
    { path: config.routes.userReport, element: UserReport, layout: HomeLayout },
    { path: config.routes.recharge, element: Recharge, layout: HomeLayout },
    { path: config.routes.rechargeHistory, element: RechargeHistory, layout: HomeLayout },
    { path: config.routes.statistic, element: Statistic, layout: HomeLayout },
    { path: config.routes.userService, element: UserService, layout: HomeLayout },
    { path: config.routes.freelancerProfile, element: FreelancerProfile, layout: HomeLayout },
    { path: config.routes.searchJob, element: SearchJob, layout: HomeLayout },
    { path: config.routes.jobApply, element: JobApply, layout: HomeLayout },
    { path: config.routes.recruiterProfile, element: RecruiterProfile, layout: HomeLayout },
    { path: config.routes.searchFreelancer, element: SearchFreelancer, layout: HomeLayout },
    { path: config.routes.postManagement, element: PostManagement, layout: HomeLayout },
];

// Admin routes
export const adminRoutes = [
    { path: config.routes.dashboard, element: Dashboard },
    { path: config.routes.freelancer, element: Freelancer },
    { path: config.routes.recruiter, element: Recruiter },
    { path: config.routes.staff, element: Staff },
    { path: config.routes.service, element: Service },
    { path: config.routes.viewDetailFreelancerAdmin, element: ViewDetailFreelancerAdmin },
    { path: config.routes.viewDetailRecruiterAdmin, element: ViewDetailRecruiterAdmin },
];

// Staff routes
export const staffRoutes = [
    { path: config.routes.freelancer, element: Freelancer },
    { path: config.routes.recruiter, element: Recruiter },
    { path: config.routes.career, element: Career },
    { path: config.routes.subCareer, element: SubCareer },
    { path: config.routes.payment, element: Payment },
    { path: config.routes.post, element: Post },
    { path: config.routes.report, element: Report },
    { path: config.routes.viewDetailFreelancerAdmin, element: ViewDetailFreelancerAdmin },
    { path: config.routes.viewDetailRecruiterAdmin, element: ViewDetailRecruiterAdmin },
];

// Freelancer
export const freelancerRoutes = [
    { path: config.routes.changePassword, element: ChangePassword, layout: HomeLayout },
    { path: config.routes.userReport, element: UserReport, layout: HomeLayout },
    { path: config.routes.recharge, element: Recharge, layout: HomeLayout },
    { path: config.routes.rechargeHistory, element: RechargeHistory, layout: HomeLayout },
    { path: config.routes.statistic, element: Statistic, layout: HomeLayout },
    { path: config.routes.userService, element: UserService, layout: HomeLayout },
    { path: config.routes.freelancerProfile, element: FreelancerProfile, layout: HomeLayout },
    { path: config.routes.searchJob, element: SearchJob, layout: HomeLayout },
    { path: config.routes.jobApply, element: JobApply, layout: HomeLayout },
];

// Recruiter
export const recruiterRoutes = [
    { path: config.routes.changePassword, element: ChangePassword, layout: HomeLayout },
    { path: config.routes.userReport, element: UserReport, layout: HomeLayout },
    { path: config.routes.recharge, element: Recharge, layout: HomeLayout },
    { path: config.routes.rechargeHistory, element: RechargeHistory, layout: HomeLayout },
    { path: config.routes.statistic, element: Statistic, layout: HomeLayout },
    { path: config.routes.userService, element: UserService, layout: HomeLayout },
    { path: config.routes.recruiterProfile, element: RecruiterProfile, layout: HomeLayout },
    { path: config.routes.searchFreelancer, element: SearchFreelancer, layout: HomeLayout },
    { path: config.routes.postManagement, element: PostManagement, layout: HomeLayout },
    { path: config.routes.postJob, element: PostJob, layout: HomeLayout },
];

export default routes;
