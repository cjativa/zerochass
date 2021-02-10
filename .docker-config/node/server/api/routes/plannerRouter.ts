import express from 'express';
import PlannerController from '../controllers/plannerController';

// Create the Planner Router
const PlannerRouter = express.Router();

PlannerRouter.get('/enroll', PlannerController.handleTutorialEnrollment);

export default PlannerRouter;