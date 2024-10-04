import { Router } from "express";
import { login, singup } from "../controllers/auth";

const authRouter:Router = Router()

authRouter.get('/login', login)
authRouter.post('/signup', singup)

export default authRouter;