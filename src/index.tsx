import React from 'react';

import { defaultTheme, Provider } from '@adobe/react-spectrum';
import { DAppProvider } from '@usedapp/core';
import ReactDOM from 'react-dom/client';

import './index.scss';

import App from './App';
import { config } from './contans/connection';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider theme={defaultTheme}>
            <DAppProvider config={config}>
                <App />
            </DAppProvider>
        </Provider>
    </React.StrictMode>
);
