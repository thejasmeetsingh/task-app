require("./db/mongoose");
const express = require("express");
const User = require("./models/user")
const Task = require("./models/task")


const app = express();
const port  = process.env.PORT || 3000


app.use(express.json());


app.post("/user/", (req, res) => {
    const user = new User(req.body)
    
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get("/user/", (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

app.post("/task/", (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get("/task/", (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((error) => {
        res.status(500).send(error)
    })
})


app.listen(port, () => { 
    console.log(`Server is up at port ${port}`) 
})