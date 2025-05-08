import { Router } from 'express';
import { createTodoController, viewTodoController,viewTodoByIdController } from "../controllers";

const todoRouter = Router();

todoRouter.post("/todos", createTodoController);
todoRouter.get("/todos", viewTodoController);
todoRouter.get("/todos/:id", viewTodoByIdController);
export { todoRouter };