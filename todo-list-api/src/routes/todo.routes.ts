import { Router } from 'express';
import { createTodoController } from "../controllers";

const todoRouter = Router();

todoRouter.post("/todos", createTodoController);

export { todoRouter };