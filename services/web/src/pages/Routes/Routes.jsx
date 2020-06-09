import React, { Fragment, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth0 } from '../../utils/Auth0Context';
import Loader from '../../components/Loader/Loader';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';

const Profile = lazy(() => import('../Profile/Profile'));
const NotFoundPage = lazy(() => import('../NotFoundPage/NotFoundPage'));

function Routes() {
    const { loading } = useAuth0();

    if (loading) {
        return <Loader loaderSize={80} />;
    }

    return (
        <Suspense fallback={<Fragment />}>
            <Switch>
                <Route path="/" exact />
                <PrivateRoute path="/profile" component={Profile} />
                <Route>
                    <NotFoundPage />
                </Route>
            </Switch>
        </Suspense>
    );
}

export default Routes;
