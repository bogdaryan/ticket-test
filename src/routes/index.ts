import { Router } from 'express';
import taskRouter from './task';

const rootRouter = Router();

rootRouter.use('/task', taskRouter);

export default rootRouter;
