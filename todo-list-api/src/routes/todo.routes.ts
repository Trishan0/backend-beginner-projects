import { Router } from 'express';
import { createTodoController, viewTodoController,viewTodoByIdController, updateTodoByIdController } from "../controllers";

const todoRouter = Router();

todoRouter.post("/todos", createTodoController);
todoRouter.put("/todos/:id", updateTodoByIdController);
todoRouter.get("/todos", viewTodoController);
todoRouter.get("/todos/:id", viewTodoByIdController);
export { todoRouter };