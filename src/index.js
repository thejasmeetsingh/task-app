require("./db/mongoose")
const express = require("express")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")
const authRouter = require("./routers/auth")

const app = express();
const port  = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(authRouter)

app.listen(port, () => { 
    console.log(`Server is up at port ${port}`) 
})