import { LogModel } from "../models/LogModel.js";


export const LogController = {
    createLog: async (req, res) => {
        const { user, role, action } = req.body;
        try {
         
            console.log(user);
            const newLog = LogModel(
                {
                    user,
                    role,
                    action
                });
            await newLog.save();
            res.status(201).send({ message: "Log created successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error creating log", error });
        }
    },
    getAllLogs: async (req, res) => {
        try {
            const logs = await LogModel.find().sort({ time: -1 });  // son emaliyyatlari ilk gostermek ucun 
            res.status(200).send(logs);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error fetching logs", error });
        }
    },
}