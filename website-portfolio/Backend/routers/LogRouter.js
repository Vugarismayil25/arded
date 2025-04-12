import express from 'express';

import { LogController } from '../controllers/LogController.js';

export const logRouter = express.Router()

logRouter.post("/", LogController.createLog)
logRouter.get("/", LogController.getAllLogs)