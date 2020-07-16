import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '../utils/Auth0Context';

import Theme from '../components/Theme/Theme';
import NavBar from '../components/NavBar/NavBar';
import Routes from '../pages/Routes/Routes';

function App() {
    return (
        <Theme>
            <BrowserRouter>
                <Auth0Provider>
                    <NavBar />
                    <Routes />
                </Auth0Provider>
            </BrowserRouter>
        </Theme>
    );
}

export default App;
