import * as express from 'express';

import { AuthenticationController } from '../controllers/authenticationController';
import { TutorialsController } from '../controllers/tutorialsController';

const router = express.Router();

const ac = new AuthenticationController();
const tc = new TutorialsController();

// Tutorial routes
router.get('/tutorials', tc.getTutorials);
router.get('/tutorial/:slug', tc.getTutorial);

// Authentication routes
router.post('/login', ac.login);
router.post('/sign-up', ac.signUp);
router.get('/verify-account', ac.verifyAccount);
router.post('/sign-out', ac.signOut);

export { router };
  