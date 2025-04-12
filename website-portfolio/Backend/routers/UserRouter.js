import express from "express"
import { UserController } from "../controllers/UserController.js"
import { Validations } from "../middlewares/AuthValidMiddleware.js"
import { registerValidation } from "../validations/AuthValidation.js"
import { loginValidation } from "../validations/AuthValidation.js"
export const userRouter = express.Router()

userRouter.post("/register", Validations(registerValidation), UserController.register)

userRouter.post("/login", Validations(loginValidation), UserController.login)
userRouter.post("/verify", UserController.verify)
userRouter.get("/", UserController.getAllUsers)
userRouter.delete("/:id", UserController.deleteUser)