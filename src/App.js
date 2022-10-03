import React, { Component, Suspense, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './scss/style.scss';
import { routes } from './routes';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
class App extends Component {
    render() {
        return (
            <Router>
                <Suspense fallback={loading}>
                    <Routes>
                        {routes.map((route, index) => {
                            const Page = route.element;
                            let Layout = DefaultLayout;

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
}

export default App;
