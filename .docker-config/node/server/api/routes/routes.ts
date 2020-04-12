import * as express from 'express';

import { AuthenticationController } from '../controllers/authenticationController';
import * as TutorialsController from '../controllers/tutorialsController';
import * as SinglesController from '../controllers/singlesController';

const router = express.Router();

const ac = new AuthenticationController();

// Tutorial routes
router.get('/tutorials', TutorialsController.getTutorials);
router.get('/tutorial/:slug', TutorialsController.getTutorial);

// Authentication routes
router.post('/login', ac.login);
router.post('/sign-up', ac.signUp);
router.get('/verify-account', ac.verifyAccount);
router.post('/sign-out', ac.signOut);

// Singles routes
router.get('/about', SinglesController.getAbout);
router.get('/contact', SinglesController.getContact);

export { router };
  