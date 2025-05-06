import { Router } from 'express';
import { createTodoController} from "../controllers";

export const router = Router();

router.post("/todos", createTodoController);

