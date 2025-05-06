import {ITodo, Todo} from "../models";


const createTodo = async (data: Partial<ITodo>): Promise<ITodo> => {
    const newTodo = new Todo(data)
    return await newTodo.save()
}

export {createTodo}