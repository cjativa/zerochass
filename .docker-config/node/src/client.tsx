import React from 'react'
import { hydrate } from 'react-dom'
import { Application } from './app';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store, persistor } from './store/store';
import { BrowserRouter } from 'react-router-dom'


// Read the state sent with markup
// const state = window.__STATE__;

// delete the state from global window object
// delete window.__STATE__;

// reproduce the store used to render the page on server
// const store = configureStore(state)

/**
 * hydrate the page to make sure both server and client
 * side pages are identical. This includes markup checking,
 * react comments to identify elements and more.
 */
console.log(`Hydrating`);
hydrate(
    <BrowserRouter>
        < Application />
    </BrowserRouter>,

    document.querySelector('#app')
)

/*  <Provider store={Store}>
        < PersistGate loading={null} persistor={persistor} >

         </PersistGate>
    </Provider> */