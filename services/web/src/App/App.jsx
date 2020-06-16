import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '../utils/Auth0Context';

import NavBar from '../components/NavBar/NavBar';
import Routes from '../pages/Routes/Routes';

function App() {
    return (
        <BrowserRouter>
            <Auth0Provider>
                <NavBar />
                <Routes />
            </Auth0Provider>
        </BrowserRouter>
    );
}

export default App;
