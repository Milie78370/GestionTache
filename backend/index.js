import express from "express"
import cors from "cors"
import connectDB from "./config/config.js"
import taskRouter from "./routes/taskRoute.js"

//config api
const app = express()
const port = 4000

app.use(express.json())
app.use(cors())

// base de donnée
connectDB();

// endpoint api
app.use("/task", taskRouter)

app.get("/", (request, response)=>{
    response.send("API Working")
})

app.listen(port, ()=>{
    console.log(`Server start on http://localhost:${port}`)
})
