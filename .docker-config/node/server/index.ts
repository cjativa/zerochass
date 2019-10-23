import * as express from 'express';
import * as path from 'path';

import { Config } from './config';
import { router } from './api/routes/routes';
import { userRouter } from './api/routes/userRoutes';

import { isUserAuthenticated } from './api/middleware/authenticationMiddleware';

const server = express();
const port = Config.port;

server.use(express.json());
server.use(express.static(path.join(__dirname, 'build')));

server.use('/api/user/', isUserAuthenticated, userRouter);
server.use('/api/', router);

const buildPath = path.join(__dirname, '/build', 'index.html');

server.get('/*', function (req, res) {
	res.sendFile(buildPath);
});

server.listen(port, () => {
    console.log('Server listening on port', port); 
});