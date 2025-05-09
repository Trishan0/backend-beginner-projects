import {createTodoService, getAllTodoService} from "../services/todo.services.js";

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
        const id = req.params.id;
        const todos = await getAllTodoService(parseInt(id))
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
export {createTodoController,getAllTodoController}