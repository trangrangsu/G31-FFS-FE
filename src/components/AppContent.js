import React, { Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';

// routes config
import routes from '../routes';

const AppContent = () => {
    return (
        <CContainer lg>
            <Router>
                <Suspense fallback={<CSpinner color="primary" />}>
                    <Routes>
                        {routes.map((route, idx) => {
                            return (
                                route.element && (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        element={<route.element />}
                                    />
                                )
                            );
                        })}
                        <Route path="/dashboard" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                </Suspense>
            </Router>
        </CContainer>
    );
};

export default React.memo(AppContent);
