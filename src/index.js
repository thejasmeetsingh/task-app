require("./db/mongoose");
const express = require("express");
const User = require("./models/user")
const Task = require("./models/task");
const e = require("express");


const app = express();
const port  = process.env.PORT || 3000


app.use(express.json());


app.post("/user/", async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }

})

app.get("/user/", async (req, res) => {

    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }

})

app.get("/user/:id/", async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }
        return res.status(200).send(user)
        
    } catch (error) {
        res.status(500).send(error)
    }

})


app.patch("/user/:id/", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }
        
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
})


app.delete("/user/:id/", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }
        
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
})


app.post("/task/", async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }

})

app.get("/task/", async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }

})

app.get("/task/:id/", async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send()
        }

        return res.status(200).send(task)

    } catch (error) {
        res.status(500).send(error)
    }

})


app.patch("/task/:id/", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(404).send()
        }
        
        return res.status(200).send(task)
    } catch (error) {
        return res.status(500).send(error)
    }
})

app.delete("/task/:id/", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }
        
        return res.status(200).send(task)
    } catch (error) {
        return res.status(500).send(error)
    }
})


app.listen(port, () => { 
    console.log(`Server is up at port ${port}`) 
})