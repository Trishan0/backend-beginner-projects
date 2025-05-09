import {Router} from 'express';
import {createTodoController, getAllTodoController, getTodoByIdController, updateTodoByIdController, deleteTodoByIdController} from "../controllers/todo.controller.js";

const todoRouter = Router();

todoRouter.post("/todos", createTodoController);
todoRouter.get("/todos", getAllTodoController);
todoRouter.get("/todos/:id", getTodoByIdController);
todoRouter.put("/todos/:id", updateTodoByIdController);
todoRouter.delete("/todos/:id", deleteTodoByIdController);
export {todoRouter}