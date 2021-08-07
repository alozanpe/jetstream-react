require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress';

import rootReducer from './store';

import './i18n';

const store = configureStore({
    reducer: rootReducer,
});

InertiaProgress.init({ color: '#4B5563' });

createInertiaApp({
    id: 'app',
    resolve: name => import(`./Pages/${name}`),
    setup({ el, App, props }) {
        render(<Provider store={store}><App {...props} /></Provider>, el)
    },
})
