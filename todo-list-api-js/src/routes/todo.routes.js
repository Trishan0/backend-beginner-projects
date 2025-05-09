import {Router} from 'express';
import {createTodoController, getAllTodoController} from "../controllers/todo.controller.js";

const todoRouter = Router();

todoRouter.post("/todos", createTodoController);
todoRouter.get("/todos", getAllTodoController);
export {todoRouter}