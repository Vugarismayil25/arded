import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import "./config/config.js";
import path from "path"
import { fileURLToPath } from "url";
import { userRouter } from "./routers/UserRouter.js";
import { categoryRouter } from "./routers/CategoryRouter.js";
import { imageRouter } from "./routers/ImageRouter.js";
import { logRouter } from "./routers/LogRouter.js";

dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const port = process.env.PORT
// Apis
app.use("/api/auth", userRouter)
app.use("/api/category", categoryRouter)
app.use("/api/image", imageRouter)
app.use("/api/log", logRouter)


// listen
app.listen(port, () => {
    console.log("Server is running on port 3000");
})