import {ITodo, Todo} from "../models";


const createTodo = async (data: Partial<ITodo>): Promise<ITodo> => {
    const newTodo = new Todo(data)
    return await newTodo.save()
}

const getAllTodos = async (): Promise<ITodo[]> => {
    return await Todo.find().sort({ createdAt: -1 });
}

const getPaginatedTodos = async (page:number = 1, limit:number = 0): Promise<{todos: ITodo[], totalCount:number}> => {
    const skip:number = (page - 1) * limit;

    let query = Todo.find().sort({createdAt: -1});
    if (limit>0) {
        query = query.skip(skip).limit(limit);
    }

    const todos = await query;
    const totalCount = await Todo.countDocuments();

    return {todos, totalCount}
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
export {createTodo, getAllTodos, getPaginatedTodos, getTodoById, updateTodoById, deleteTodoById}