import {Todo} from "../models/todo.model.js";

const createTodoService = async (data)=>{
    const newTodo = new Todo(data);
    return await newTodo.save();
}

const getAllTodoService = async ()=>{
    return await Todo.find({}).sort({createdAt: -1});
}
export {createTodoService, getAllTodoService};