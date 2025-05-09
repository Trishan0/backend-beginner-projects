import {createTodoService, getAllTodoService, getTodoByIdService} from "../services/todo.services.js";

const createTodoController = async (req, res)=>{
    try{
        const {title, description} = req.body;
        if (!title) {
            res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }
        const newTodo = await createTodoService({title, description})
        res.status(201).json({
            success: true,
            data: newTodo
        });
    }catch (error) {
        console.error("Error in createTodoController:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        });
    }
}

//get all todos
const getAllTodoController = async (req, res)=>{
    try {
        const todos = await getAllTodoService()
        res.status(200).json({
            success: true,
            data: todos
        })

    } catch (error) {
        console.error("Error in getAllTodoController:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        })
    }
}

//get todos by Id
const getTodoByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const todoData = await getTodoByIdService(parseInt(id));

        if (!todoData) {
            console.error("No Todo found with the given id");
            return res.status(404).json({
                success: false,
                message: "No Todo found with the given id",
            });
        }

        return res.status(200).json({
            success: true,
            data: todoData
        });
    } catch (error) {
        console.error("Error in getTodoByIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        });
    }
};

export {createTodoController, getAllTodoController, getTodoByIdController}