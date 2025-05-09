import {Router} from 'express';
import {createTodoController, getAllTodoController, getTodoByIdController} from "../controllers/todo.controller.js";

const todoRouter = Router();

todoRouter.post("/todos", createTodoController);
todoRouter.get("/todos", getAllTodoController);
todoRouter.get("/todos/:id", getTodoByIdController);
export {todoRouter}