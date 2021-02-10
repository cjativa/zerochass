import express from 'express';
import TutorialRouter from './tutorialRouter';
import PlannerRouter from './plannerRouter';

// Create the API Router
const apiRouter = express.Router();

// Use the Tutorial router for /tutorial and /tutorials paths
apiRouter.use('/tutorials', TutorialRouter);
apiRouter.use('/tutorial', TutorialRouter);

// Use the Planner router for /planner paths
apiRouter.use('/planner', PlannerRouter);
