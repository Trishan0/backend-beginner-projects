import {ITodo, Todo} from "../models";


const createTodo = async (data: Partial<ITodo>): Promise<ITodo> => {
    const newTodo = new Todo(data)
    return await newTodo.save()
}

const getAllTodos = async (): Promise<ITodo[]> => {
    return await Todo.find().sort({ createdAt: -1 });
}

const getTodoById = async (todoId: string | number): Promise<ITodo | null> => {
    return await Todo.findOne({ todoId });
};

const updateTodoById = async (todoId: string | number, updatedData: Partial<ITodo>): Promise<ITodo | null> => {
    return await Todo.findOneAndUpdate({ todoId }, updatedData, { new: true });
};

const deleteTodoById = async (todoId: string | number): Promise<ITodo | null> => {
    return await Todo.findOneAndDelete({ todoId });
}
export {createTodo, getAllTodos, getTodoById, updateTodoById, deleteTodoById}