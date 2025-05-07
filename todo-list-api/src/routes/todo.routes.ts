import { Router } from 'express';
import { createTodoController, viewTodoController } from "../controllers";

const todoRouter = Router();

todoRouter.post("/todos", createTodoController);
todoRouter.get("/todos", viewTodoController);
export { todoRouter };