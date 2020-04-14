import express from 'express';
import * as path from 'path';
import * as fs from 'fs';

import { Config } from './config';
import { router } from './api/routes/routes';
import { userRouter } from './api/routes/userRoutes';
import { isUserAuthenticated } from './api/middleware/authenticationMiddleware';
import { template } from '../src/template';
import { render } from '../src/server'

const server = express();
const port = Config.port;

server.use(express.json());
// server.use(express.static(path.join(__dirname, 'build')));
const clientPath = path.join(__dirname, '/assets/client.js');
const bundlePath =  path.join(__dirname, '/assets/bundle.js.js');

server.use('/assets/client.js', express.static(clientPath));
server.use('compiled/bundle.js', express.static(bundlePath));

server.use('/api/user/', isUserAuthenticated, userRouter);
server.use('/api/', router);

const buildPath = path.join(__dirname, '/build', 'index.html');

server.get('/', function (req, res) {
    const { content } = render(req);
    console.log(`The conddtent`, content);
    const response = template("Server Rendered Page", content)
    res.send(response);
});

server.listen(port, () => {
    console.log('Server listening on port', 4000);
});