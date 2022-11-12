import React from 'react';

import { DAppProvider } from '@usedapp/core';
import ReactDOM from 'react-dom/client';

import './index.scss';

import App from './App';
import { config } from './contans/connection';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <DAppProvider config={config}>
            <App />
        </DAppProvider>
    </React.StrictMode>
);
