import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { Auth0Provider } from '../utils/Auth0Context';

import Theme from '../components/Theme/Theme';
import NavBar from '../components/NavBar/NavBar';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Routes from '../pages/Routes/Routes';

function App() {
    const { i18n } = useTranslation();

    return (
        <I18nextProvider i18n={i18n}>
            <Theme>
                <BrowserRouter>
                    <Auth0Provider>
                        <NavBar />
                        <ErrorBoundary>
                            <Routes />
                        </ErrorBoundary>
                    </Auth0Provider>
                </BrowserRouter>
            </Theme>
        </I18nextProvider>
    );
}

export default App;
