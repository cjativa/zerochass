import express from 'express';
import TutorialController from '../controllers/tutorialController';

// Create the Tutorial Router
const TutorialRouter = express.Router();

TutorialRouter.get('/:slug', TutorialController.getTutorial);

export default TutorialRouter;