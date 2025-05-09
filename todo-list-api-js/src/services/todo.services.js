import {Todo} from "../models/todo.model.js";

const createTodoService = async (data)=>{
    const newTodo = new Todo(data);
    return await newTodo.save();
}

const getAllTodoService = async ()=>{
    return await Todo.find({}).sort({createdAt: -1});
}

const getTodoByIdService = async (todoId) => {
    return await Todo.findOne({ id: todoId });
}

export {createTodoService, getAllTodoService, getTodoByIdService};