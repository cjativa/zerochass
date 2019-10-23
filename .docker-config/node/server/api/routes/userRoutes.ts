import * as express from 'express';
import { UserController } from '../controllers/userController';

const uc = new UserController();

export const userRouter = express.Router().use(uc.handler);

userRouter.get('/account', uc.getAccount);
userRouter.get('/profile', uc.getProfile);

userRouter.post('/profile', uc.updateProfile);
/* userRouter.post('/account', uc.updateAccount); */

/* userRouter.get('/connect', uc.getConnect);
userRouter.post('/connect', uc.updateConnect) */