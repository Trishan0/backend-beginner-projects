import {findUserByEmail, registerUserService, verifyUserCredentialsService } from "../services/auth.services.js";
import {CONFIG} from "../config/config.js";
import jwt from "jsonwebtoken";

const registerUserController = async (req, res) => {
   try {
       const {name, email, password} = req.body;
       if (!name || !email || !password) {
           return res.status(400).json({
               success: false,
               message: "Name, email, and password are required in the request body."
           });
       }
       const existingUser = await findUserByEmail(email);
       if (existingUser) {
           return res.status(400).json({
               success: false,
               message: "User with this email already exists"
           });
       }
       const newUser = await registerUserService({ name, email, password });

       if (newUser) {
           res.status(201).json({
               success: true,
               message: "User created successfully"
           })
       } else {
           res.status(500).json({
               success: false,
               message: "Internal Server Error"
           })
       }
   } catch (error) {
       console.error("Error in registerUser:", error);
       res.status(500).json({
           success: false,
           message: "Server Error",
           error: error instanceof Error ? error.message : "An unexpected error occurred"
       })
   }
}

// login controller
const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Verify user credentials
        const authResult = await verifyUserCredentialsService(email, password);

        if (!authResult.isAuthenticated) {
            return res.status(authResult.statusCode || 400).json({
                success: false,
                message: authResult.message
            });
        }
        const accessToken = jwt.sign({
            userId: authResult._id,
            email: authResult.email
        }, CONFIG.JWT_SECRET_KEY, {'expiresIn': '1h'})

        // Successful login
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: authResult.user,
            accessToken
        });

    } catch (error) {
        console.error("Error in loginUserController:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        });
    }
};


export {registerUserController, loginUserController}