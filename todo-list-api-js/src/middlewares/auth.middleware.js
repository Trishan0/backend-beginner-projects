import jwt from "jsonwebtoken";
import {CONFIG} from "../config/config.js";

export const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    console.log(authHeader)

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided. Please login to continue."
        });
    }

    try {
        const decodedToken = jwt.verify(token, CONFIG.JWT_SECRET_KEY);
        console.log(decodedToken);

        req.userInfo = decodedToken;

        next();
    } catch (error) {
        console.error("Token verification failed:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token. Please login again.",
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        });
    }
}