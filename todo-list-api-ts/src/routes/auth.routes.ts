import { Router } from 'express';
import { registerUserController, loginUserController } from "../controllers";

const authRouter = Router();

authRouter.post('/register', registerUserController)
authRouter.post('/login', loginUserController)
export {authRouter};