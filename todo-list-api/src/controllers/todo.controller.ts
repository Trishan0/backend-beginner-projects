import { Request, Response } from "express";
import { createTodo } from "../services";

export const createTodoController = async (req: Request, res: Response)=>{
    try {
        const {title, description, date, status} = req.body;
        const newTodo = await createTodo({title, description, date, status})
        return res.status(201).json({
            success: true,
            data: newTodo
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server Error", e
        })
    }
}