import express from "express"
import { ImageController } from "../controllers/ImageController.js"
import { Upload } from "../middlewares/ImgUploadMiddleware.js"
import authenticateToken from "../middlewares/TokenMiddleware.js"
export const imageRouter = express.Router()


imageRouter.post("/", Upload.single("image"), authenticateToken, ImageController.createImg)
imageRouter.delete("/:id", authenticateToken, ImageController.deleteImg)
imageRouter.get("/", ImageController.getImagesBySection)
imageRouter.get("/images", ImageController.getImages)