import express from 'express';
import * as path from 'path';
import * as React from 'react';
import serializeJavascript from 'serialize-javascript';

import { Config } from './config';
import { router } from './api/routes/routes';
import { userRouter } from './api/routes/userRoutes';
import { isUserAuthenticated } from './api/middleware/authenticationMiddleware';
import { routes } from '../shared/routes';
import { matchPath, StaticRouter } from "react-router-dom"
import { renderToString } from "react-dom/server"
import { Application } from '../src/app';

const server = express();
const port = Config.port;

server.use(express.json());

server.use('/assets/bundle.js', express.static(path.join(__dirname, '/assets/bundle.js')));
server.use('/assets', express.static(path.join(__dirname, '/assets')));
server.use('/favicon.ico', (req, res) => res.json(''))
server.use('/api/user/', isUserAuthenticated, userRouter);
server.use('/api/', router);

const buildPath = path.join(__dirname, '/build', 'index.html');


server.get('*', async (req, res, next) => {
  const objectAny = {} as { [key: string]: any };
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || objectAny;

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  const context = await promise;

  const markup = renderToString(
    <StaticRouter location={req.url} context={context}>
      <Application />
    </StaticRouter>
  );


  res.send(
    `
        <!DOCTYPE html>
        <html>
          <head>
            <title>SSR with RR</title>
            <script src="/assets/bundle.js" defer></script>
            <script>window.__INITIAL_DATA__=${serializeJavascript(context)}</script>
          </head>
          <body>
            <div id="app">
                ${markup}
            </div>
          </body>
        </html>
      `
  );
});



server.listen(port, () => {
  console.log('Server listening on port', 4000);
});