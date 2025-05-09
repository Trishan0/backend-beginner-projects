import {Router} from 'express';
import {createTodoController, getAllTodoController, getTodoByIdController, updateTodoByIdController, deleteTodoByIdController} from "../controllers/todo.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const todoRouter = Router();

todoRouter.post("/todos", authMiddleware, createTodoController);
todoRouter.get("/todos", authMiddleware, getAllTodoController);
todoRouter.get("/todos/:id", authMiddleware, getTodoByIdController);
todoRouter.put("/todos/:id", authMiddleware, updateTodoByIdController);
todoRouter.delete("/todos/:id", authMiddleware, deleteTodoByIdController);
export {todoRouter}