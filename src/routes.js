import React from 'react';
import config from './config';

// Layouts
const HomeLayout = React.lazy(() => import('./layout/HomeLayout'));
const UserLayout = React.lazy(() => import('./layout/UserLayout'));
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
const ResetPassword = React.lazy(() => import('./views/pages/ResetPassword'));
const ForgetPassword = React.lazy(() => import('./views/pages/ForgetPassword'));
const UpdateRecruiterProfile = React.lazy(() => import('./views/recruiter/Update'));
const ViewDetailFreelancer = React.lazy(() => import('./views/pages/ViewDetailFreelancer'));
const ChangePassword = React.lazy(() => import('./views/pages/ChangePassword'));
const UserReport = React.lazy(() => import('./views/pages/UserReport'));
const Recharge = React.lazy(() => import('./views/pages/Recharge'));
const RechargeHistory = React.lazy(() => import('./views/pages/RechargeHistory'));
const StatisticFreelancer = React.lazy(() => import('./views/freelancer/StatisticFreelancer'));
const StatisticRecruiter = React.lazy(() => import('./views/recruiter/StatisticRecruiter'));
const UserService = React.lazy(() => import('./views/pages/UserService'));
const FreelancerProfile = React.lazy(() => import('./views/freelancer/Profile'));
const SearchJob = React.lazy(() => import('./views/freelancer/SearchJob'));
const JobApply = React.lazy(() => import('./views/freelancer/JobApply'));
const ViewDetailPost = React.lazy(() => import('./views/freelancer/ViewDetailPost'));
const PostJob = React.lazy(() => import('./views/recruiter/Post'));
const RecruiterProfile = React.lazy(() => import('./views/recruiter/Profile'));
const SearchFreelancer = React.lazy(() => import('./views/recruiter/SearchFreelancer'));
const PostManagement = React.lazy(() => import('./views/recruiter/PostManagement'));
const PostApplyManagement = React.lazy(() => import('./views/recruiter/PostApplyManagement'));
const VerifyOTP = React.lazy(() => import('./views/pages/VerifyOTP'));

// Public routes
export const routes = [
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
    { path: config.routes.updateRecruiter, element: UpdateRecruiterProfile, layout: HomeLayout },

    { path: config.routes.home, element: ContentHome, layout: HomeLayout },
    { path: config.routes.login, element: Login, layout: HomeLayout },
    { path: config.routes.register, element: Register, layout: HomeLayout },
    { path: config.routes.verifyOTP, element: VerifyOTP, layout: HomeLayout },
    { path: config.routes.forgetPassword, element: ForgetPassword, layout: HomeLayout },
    { path: config.routes.resetPassword, element: ResetPassword, layout: HomeLayout },
    { path: config.routes.changePassword, element: ChangePassword, layout: UserLayout },
    { path: config.routes.userReport, element: UserReport, layout: UserLayout },
    { path: config.routes.recharge, element: Recharge, layout: UserLayout },
    { path: config.routes.rechargeHistory, element: RechargeHistory, layout: UserLayout },

    { path: config.routes.statisticFreelancer, element: StatisticFreelancer, layout: UserLayout },
    { path: config.routes.userService, element: UserService, layout: UserLayout },
    { path: config.routes.freelancerProfile, element: FreelancerProfile, layout: UserLayout },
    { path: config.routes.searchJob, element: SearchJob, layout: UserLayout },
    { path: config.routes.jobApply, element: JobApply, layout: UserLayout },
    { path: config.routes.viewDetailPost, element: ViewDetailPost, layout: UserLayout },

    { path: config.routes.postJob, element: PostJob, layout: UserLayout },
    { path: config.routes.recruiterProfile, element: RecruiterProfile, layout: UserLayout },
    { path: config.routes.searchFreelancer, element: SearchFreelancer, layout: UserLayout },
    { path: config.routes.postManagement, element: PostManagement, layout: UserLayout },
    { path: config.routes.postApplyManagement, element: PostApplyManagement, layout: UserLayout },
    { path: config.routes.statisticRecruiter, element: StatisticRecruiter, layout: UserLayout },
    { path: config.routes.viewDetailFreelancer, element: ViewDetailFreelancer, layout: UserLayout },
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
    { path: config.routes.changePassword, element: ChangePassword, layout: UserLayout },
    { path: config.routes.userReport, element: UserReport, layout: UserLayout },
    { path: config.routes.recharge, element: Recharge, layout: UserLayout },
    { path: config.routes.rechargeHistory, element: RechargeHistory, layout: UserLayout },
    { path: config.routes.statisticFreelancer, element: StatisticFreelancer, layout: UserLayout },
    { path: config.routes.userService, element: UserService, layout: UserLayout },
    { path: config.routes.freelancerProfile, element: FreelancerProfile, layout: UserLayout },
    { path: config.routes.searchJob, element: SearchJob, layout: UserLayout },
    { path: config.routes.jobApply, element: JobApply, layout: UserLayout },
];

// Recruiter
export const recruiterRoutes = [
    { path: config.routes.changePassword, element: ChangePassword, layout: UserLayout },
    { path: config.routes.userReport, element: UserReport, layout: UserLayout },
    { path: config.routes.recharge, element: Recharge, layout: UserLayout },
    { path: config.routes.rechargeHistory, element: RechargeHistory, layout: UserLayout },
    { path: config.routes.statisticRecruiter, element: StatisticRecruiter, layout: UserLayout },
    { path: config.routes.userService, element: UserService, layout: UserLayout },
    { path: config.routes.recruiterProfile, element: RecruiterProfile, layout: UserLayout },
    { path: config.routes.searchFreelancer, element: SearchFreelancer, layout: UserLayout },
    { path: config.routes.postManagement, element: PostManagement, layout: UserLayout },
    { path: config.routes.postJob, element: PostJob, layout: UserLayout },
    { path: config.routes.postApplyManagement, element: PostApplyManagement, layout: UserLayout },
];

export default routes;
