import express from "express"
import {addTask, getTask, removeTask, updateTask, getDataTask} from "../controllers/taskController.js"

const taskRouter = express.Router();

// endPoint specifique aux tâches
taskRouter.post("/add", addTask);
taskRouter.post("/remove", removeTask);
taskRouter.post("/getDataTask", getDataTask);
taskRouter.get("/list", getTask);
taskRouter.put("/update", updateTask);

export default taskRouter;