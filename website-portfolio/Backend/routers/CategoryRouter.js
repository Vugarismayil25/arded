import express from "express"
import { CategoryController } from "../controllers/CategoryController.js"
import authenticateToken from "../middlewares/TokenMiddleware.js"
export const categoryRouter = express.Router()

categoryRouter.post("/", authenticateToken, CategoryController.createCategory)
categoryRouter.get("/", CategoryController.getCategories)
categoryRouter.delete("/:id", authenticateToken, CategoryController.deleteCategory)