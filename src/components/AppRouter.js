import React, { Suspense, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { guestRoutes, adminRoutes, staffRoutes, freelancerRoutes, recruiterRoutes } from '../routes';
import * as httpRequest from '../utils/httpRequest';
const AdminLayout = React.lazy(() => import('../layout/AdminLayout'));
//routes,
const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);
const permissions = (role) => {
    if (role === 'admin') {
        console.log('admin');
        return adminRoutes;
    } else if (role === 'staff') {
        console.log('staff');
        return staffRoutes;
    } else if (role === 'freelancer') {
        console.log('freelancer');
        return freelancerRoutes;
    } else if (role === 'recruiter') {
        console.log('recruiter');
        return recruiterRoutes;
    } else {
        return [];
    }
};
function AppRouter() {
    const account = useSelector((state) => state.account);
    httpRequest.setDefaultAuthorization(localStorage.getItem('token'));
    const userRole = localStorage.getItem('userRole');
    const routes = permissions(userRole);

    return (
        <Router>
            <Suspense fallback={loading}>
                <Routes>
                    {guestRoutes.map((route, index) => {
                        const Page = route.element;
                        let Layout = AdminLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {routes.map((route, index) => {
                        const Page = route.element;
                        let Layout = AdminLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Suspense>
        </Router>
    );
}

export default AppRouter;
