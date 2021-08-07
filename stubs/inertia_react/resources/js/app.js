require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { InertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';

import rootReducer from './store';

import './i18n';

const app = document.getElementById('app');
const store = configureStore({
    reducer: rootReducer,
});

InertiaProgress.init({ color: '#4B5563' });

render(
    <Provider store={store}>
        <InertiaApp
            initialPage={JSON.parse(app.dataset.page)}
            resolveComponent={(name) => import(`./Pages/${name}`).then((module) => module.default)}
        />
    </Provider>,
    app
);
