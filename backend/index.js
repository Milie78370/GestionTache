import express from "express"
import cors from "cors"
import connectDB from "./config/config.js"
import taskRouter from "./routes/taskRoute.js"
import userRouter from "./routes/userRoute.js"

//config api
const app = express();
const port = 4000;

//parse les requetes exemple d'api sous format Json et les mets dans req.body
app.use(express.json());
app.use(cors());

// base de donnée
connectDB();

// endpoint api
app.use("/task", taskRouter);
app.use("/user", userRouter);

app.get("/", (request, response)=>{
    response.send("API Working");
})

//démarrage du server et ecoute attentivement sur le port 4000
app.listen(port, ()=>{
    console.log(`Server start on http://localhost:${port}`);
})
