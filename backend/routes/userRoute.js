import express from "express"
import {getUser, updateUser, getHeureTravailForEmp,getNomEmp} from "../controllers/userController.js"

const userRoute = express.Router();

userRoute.get("/list", getUser);
userRoute.put("/update", updateUser);
userRoute.post("/getHeureTravailForEmp", getHeureTravailForEmp);
userRoute.post("/getNomEmp", getNomEmp);
export default userRoute;