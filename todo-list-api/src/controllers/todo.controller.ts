import {Request, Response} from "express";
import {createTodo} from "../services";
import {ITodo} from "../models";

export const createTodoController = async (req: Request, res: Response): Promise<void> => {
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