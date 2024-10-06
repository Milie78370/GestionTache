import express from "express"
import {addTask, getTask, removeTask} from "../controllers/taskController.js"

const taskRouter = express.Router();

taskRouter.post("/add", addTask);
taskRouter.post("/remove", removeTask);
taskRouter.get("/list", getTask);

export default taskRouter;