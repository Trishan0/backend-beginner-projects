import {Request, Response} from "express";
import {registerUserService} from "../services/auth.service";

const registerUserController = async (req:Request, res:Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required in the request body."
            });
        }

        const result = await registerUserService({ name, email, password });

        // The service now returns the statusCode, so we use that directly
        return res.status(result.statusCode).json(result);

    }
    catch (error) {
        console.error("Unexpected error in registerUserController:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        });
    }
}

const loginUserController = async (req:Request, res:Response) => {
    try {

    }
    catch (error) {
        console.error("Error in loginUserController:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        })
    }
}


export {registerUserController, loginUserController}