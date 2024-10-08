import express from "express"
import {getUser, updateUser, getHeureTravailForEmp} from "../controllers/userController.js"

const userRoute = express.Router();

// endPoint specifique aux employes
userRoute.get("/list", getUser);
userRoute.put("/update", updateUser);
userRoute.post("/getHeureTravailForEmp", getHeureTravailForEmp);

export default userRoute;