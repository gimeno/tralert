import React, { Fragment, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth0 } from '../../utils/Auth0Context';
import Loader from '../../components/Loader/Loader';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';

const Profile = lazy(() => import('../Profile/Profile'));
const NotFoundPage = lazy(() => import('../NotFoundPage/NotFoundPage'));

const useStyles = makeStyles((theme) => ({
    layout: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6)
        }
    }
}));

function Routes() {
    const classes = useStyles();
    const { loading } = useAuth0();

    if (loading) {
        return <Loader loaderSize={80} />;
    }

    return (
        <Suspense fallback={<Fragment />}>
            <Container fixed className={classes.layout}>
                <Switch>
                    <Route path="/" exact />
                    <PrivateRoute path="/profile" component={Profile} />
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Container>
        </Suspense>
    );
}

export default Routes;
