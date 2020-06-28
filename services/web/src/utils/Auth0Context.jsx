import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import env from '@beam-australia/react-env';
import createAuth0Client from '@auth0/auth0-spa-js';

const AUTH0_OPTIONS = {
    domain: env('AUTH0_DOMAIN'),
    client_id: env('AUTH0_CLIENT_ID'),
    redirect_uri: window.location.origin
};

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({ children }) => {
    const history = useHistory();
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [user, setUser] = useState();
    const [auth0Client, setAuth0] = useState();
    const [loading, setLoading] = useState(true);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        const initAuth0 = async () => {
            const auth0FromHook = await createAuth0Client(AUTH0_OPTIONS);
            setAuth0(auth0FromHook);

            if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
                const { appState } = await auth0FromHook.handleRedirectCallback();
                history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
            }

            const isUserAuthenticated = await auth0FromHook.isAuthenticated();

            setIsAuthenticated(isUserAuthenticated);

            if (isUserAuthenticated) {
                const retrievedUser = await auth0FromHook.getUser();
                setUser(retrievedUser);
            }

            setLoading(false);
        };
        initAuth0();
        // eslint-disable-next-line
    }, []);

    const loginWithPopup = async (params = {}) => {
        setPopupOpen(true);
        try {
            await auth0Client.loginWithPopup(params);
        } catch (error) {
            console.error(error);
        } finally {
            setPopupOpen(false);
        }
        const retrievedUser = await auth0Client.getUser();
        setUser(retrievedUser);
        setIsAuthenticated(true);
    };

    const handleRedirectCallback = async () => {
        setLoading(true);
        await auth0Client.handleRedirectCallback();
        const retrievedUser = await auth0Client.getUser();
        setLoading(false);
        setIsAuthenticated(true);
        setUser(retrievedUser);
    };

    return (
        <Auth0Context.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                popupOpen,
                loginWithPopup,
                handleRedirectCallback,
                getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
                loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
                getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
                getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
                logout: () => auth0Client.logout({ returnTo: AUTH0_OPTIONS.redirect_uri })
            }}
        >
            {children}
        </Auth0Context.Provider>
    );
};
