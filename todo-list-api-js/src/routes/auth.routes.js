import { Router } from 'express';
import { registerUserController, loginUserController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/register', registerUserController)
authRouter.post('/login', loginUserController)

export {authRouter};