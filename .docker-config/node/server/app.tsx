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

import { dom } from "@fortawesome/fontawesome-svg-core";
import { generateStaticHtml } from 'react-metatags-hook'



const server = express();
const port = Config.port;

server.use(express.json());
server.use(express.static(path.join(__dirname, '/assets')));
server.use('/app.css', express.static(path.join(__dirname, '/app.css')));
server.use('/assets', express.static(path.join(__dirname, '/assets')));
server.use('/favicon.ico', express.static(path.join(__dirname, '../public/favicon.ico')));
server.use('/api/user/', isUserAuthenticated, userRouter);
server.use('/api/', router);

const buildPath = path.join(__dirname, '/build', 'index.html');


server.get('*', async (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) as any;

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  const data = await promise;

  const markup = renderToString(
    <StaticRouter location={req.url} context={{}}>
      <Application />
    </StaticRouter>
  );

  const metaHTML = generateStaticHtml();

  res.send(
    `
        <!DOCTYPE html>
        <html>
          <head>
          <!-- Global site tag (gtag.js) - Google Analytics -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-163465719-1"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-163465719-1');
            </script>

            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${metaHTML}
            <script src="/assets/bundle.js" defer></script>
            <link href="/assets/app.css" rel="stylesheet">
            <script>window.__INITIAL_DATA__=${serializeJavascript({...data})}</script>
            <style type="text/css">${dom.css()}</style>
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