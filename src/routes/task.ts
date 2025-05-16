import { Router } from 'express';
import {
  createTask,
  takeInWork,
  completeTask,
  cancelTask,
  getTasks,
  cancelAllInProgress,
} from '../controlers/task-controler';
import taskValidation from '../validations/task';

const router = Router();

router.get('/', taskValidation.getTasks, getTasks);
router.post('/', taskValidation.createTask, createTask);
router.patch('/:id/take', taskValidation.takeInWork, takeInWork);
router.patch('/:id/complete', taskValidation.completeTask, completeTask);
router.patch('/:id/cancel', taskValidation.cancelTask, cancelTask);
router.patch('/cancel-all', cancelAllInProgress);

export default router;
