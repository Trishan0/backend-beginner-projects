import {Todo} from "../models/todo.model.js";

const createTodoService = async (data)=>{
    const newTodo = new Todo(data);
    return await newTodo.save();
}

const getAllTodoService = async ()=>{
    return await Todo.find({}).sort({createdAt: -1});
}
const getPaginatedTodoService = async (page, limit) => {
    const skip = (page - 1) * limit;

    let query = Todo.find({}).sort({createdAt: -1});
    if (limit>0) {
        query = query.skip(skip).limit(limit);
    }

    const todos = await query;
    const totalCount = await Todo.countDocuments();

    return {todos, totalCount}
}
const getTodoByIdService = async (todoId) => {
    return await Todo.findOne({ id: todoId });
}

const updateTodoByIdService = async (todoId, updatedData) => {
    return await Todo.findOneAndUpdate({id:todoId},{updatedData}, {new:true})
}

const deleteTodoByIdService = async (todoId) => {
    return await Todo.findOneAndDelete({id:todoId})
}
export {createTodoService, getPaginatedTodoService, getTodoByIdService, updateTodoByIdService, deleteTodoByIdService};