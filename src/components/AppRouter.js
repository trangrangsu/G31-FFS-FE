import React, { Suspense, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { routes } from '../routes';
const AdminLayout = React.lazy(() => import('../layout/AdminLayout'));

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);
function AppRouter() {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    // console.log(account);
    return (
        <Router>
            <Suspense fallback={loading}>
                <Routes>
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
