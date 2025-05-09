import {Router} from 'express';
import {createTodoController} from "../controllers/todo.controller.js";

const todoRouter = Router();

todoRouter.post("/todos", createTodoController);

export {todoRouter}