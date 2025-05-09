import {
    createTodoService,
    getPaginatedTodoService,
    getTodoByIdService,
    updateTodoByIdService,
    deleteTodoByIdService
} from "../services/todo.services.js";

const createTodoController = async (req, res) => {
    try {
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
    } catch (error) {
        console.error("Error in createTodoController:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        });
    }
}

//get all todos
const getAllTodoController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 0;

        const { todos, totalCount } = await getPaginatedTodoService(page, limit)
        res.status(200).json({
            success: true,
            total:totalCount,
            page,
            limit,
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
        const {id} = req.params;
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

//update todos by it's id
const updateTodoByIdController = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedData = req.body;

        const todoData = await updateTodoByIdService(parseInt(id), updatedData);

        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            Updated_data: todoData
        })
    } catch (error) {
        console.error("Error in updateTodoByIdController:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        });
    }
}

//delete todos by it's id
const deleteTodoByIdController = async (req, res) => {
    try {
        const {id} = req.params;

        const existingTodo = await getTodoByIdService(parseInt(id));
        if (!existingTodo) {
            res.status(404).json({
                success: false,
                message: "Todo not found"
            });
            return;
        }
        const deletedTodo = await deleteTodoByIdService(parseInt(id));
        res.status(200).json({
            success: true,
            message: "Successfully Deleted the todo",
            deletedTodo: deletedTodo
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


export {createTodoController, getAllTodoController, getTodoByIdController, updateTodoByIdController, deleteTodoByIdController}