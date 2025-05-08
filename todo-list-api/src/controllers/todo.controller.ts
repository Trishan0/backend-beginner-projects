import {Request, Response} from "express";
import {createTodo, getAllTodos, getTodoById, updateTodoById, deleteTodoById} from "../services";
import {ITodo} from "../models";

const createTodoController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {title, description, date, status} = req.body;

        if (!title) {
            res.status(400).json({
                success: false,
                message: "Title is required"
            });
            return;
        }

        const newTodo: ITodo = await createTodo({title, description, date, status});

        res.status(201).json({
            success: true,
            data: newTodo
        });
    } catch (error) {
        console.error("Error in createTodoController:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        });
    }
};

const viewTodoController = async (req:Request, res:Response):Promise<void> => {
    try {
        const todos: ITodo[] = await getAllTodos()
        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        });

    } catch (error) {
        console.error("Error in viewTodoController:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        })
    }
}

const viewTodoByIdController = async (req:Request, res:Response):Promise<void> => {
    try {
        const { id } = req.params;
        const todo = await getTodoById(parseInt(id));
        if (!todo) {
            res.status(404).json({
                success:false,
                message: "Todo not found"
            });
            return
        }
        res.status(200).json({
            success:true,
            data: todo
        })
    } catch (error) {
        console.error("Error in viewTodoByIdController:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        })
    }
}

const updateTodoByIdController = async (req:Request, res:Response):Promise<void> => {
    try {
        const { id } = req.params;
        const updatedData = req.body

        const existingTodo = await getTodoById(parseInt(id));
        if (!existingTodo) {
            res.status(404).json({
                success: false,
                message: "Todo not found"
            });
            return;
        }
        const updatedTodo = await updateTodoById(parseInt(id), updatedData)
        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: updatedTodo
        })
    } catch (error) {
        console.error("Error in updateTodoByIdController:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        })
    }
}

const deleteTodoByIdController = async (req:Request, res:Response):Promise<void>=>{
    try {
        const { id } = req.params;

        const existingTodo = await getTodoById(parseInt(id));
        if (!existingTodo) {
            res.status(404).json({
                success: false,
                message: "Todo not found"
            });
            return;
        }
        const deletedTodo = await deleteTodoById(parseInt(id));
        res.status(200).json({
            success:true,
            message:"Successfully Deleted the todo",
            deletedTodo:deletedTodo
        })
    } catch (error) {
        console.error("Error in deleteTodoByIdController:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        })
    }
}


export {createTodoController, viewTodoController, viewTodoByIdController, updateTodoByIdController, deleteTodoByIdController}