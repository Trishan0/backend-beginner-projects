import {ITodo, Todo} from "../models";


const createTodo = async (data: Partial<ITodo>): Promise<ITodo> => {
    const newTodo = new Todo(data)
    return await newTodo.save()
}

const getAllTodos = async (): Promise<ITodo[]> => {
    return await Todo.find().sort({ createdAt: -1 });
}

export {createTodo, getAllTodos}