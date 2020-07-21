import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './i18n/i18next';
import './index.css';

ReactDOM.render(
    <Suspense fallback="loading">
        <App />
    </Suspense>,
    document.getElementById('root')
);
