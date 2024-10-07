import express from "express"
import {getUser} from "../controllers/userController.js"

const userRoute = express.Router();

userRoute.get("/list", getUser);

export default userRoute;