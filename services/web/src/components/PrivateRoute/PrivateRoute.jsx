import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '../../utils/Auth0Context';

function PrivateRoute({ component: Component, path, ...rest }) {
    const { i18n } = useTranslation();
    const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (loading || isAuthenticated) {
            return;
        }

        const fn = async () => {
            await loginWithRedirect({
                ui_locales: i18n.language,
                appState: { targetUrl: window.location.pathname }
            });
        };
        fn();
    }, [loading, isAuthenticated, loginWithRedirect, path, i18n.language]);

    const render = (props) => (isAuthenticated === true ? <Component {...props} /> : null);

    return <Route path={path} render={render} {...rest} />;
}

export default PrivateRoute;
