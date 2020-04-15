import React from 'react';
import { renderToString } from 'react-dom/server';
import { Application } from './app';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store, persistor } from './store/store';
import { StaticRouter } from 'react-router-dom';

export const render = (req, context) => {

    console.log(`The contex,`, context);

    // Model the initial state  
    const content = renderToString(
        <StaticRouter location={req.url} context={context}>
            <Application />
        </StaticRouter>
    );
    return { content, context };
};

/**
 *
 */