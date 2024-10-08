import express from "express"
import {addTask, getTask, removeTask, updateTask, getDataTask} from "../controllers/taskController.js"

const taskRouter = express.Router();

taskRouter.post("/add", addTask);
taskRouter.post("/remove", removeTask);
taskRouter.get("/list", getTask);
taskRouter.post("/getDataTask", getDataTask);
taskRouter.put("/update", updateTask);

export default taskRouter;