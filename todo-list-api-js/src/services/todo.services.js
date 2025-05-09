import {Todo} from "../models/todo.model.js";

const createTodoService = async (data)=>{
    const newTodo = new Todo(data);
    return await newTodo.save();
}

export {createTodoService};