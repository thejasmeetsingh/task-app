const express = require("express")
const Task = require("../models/task")
const authMiddleware = require("../middleware/auth")

const router = new express.Router()

router.post("/task/", authMiddleware, async (req, res) => {
    const task = new Task({
        ...req.body,
        user: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.get("/task/", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id })
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.get("/task/:id/", authMiddleware, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        return res.status(200).send(task)

    } catch (error) {
        res.status(500).send(error)
    }

})

router.patch("/task/:id/", authMiddleware, async (req, res) => {
    try {

        const updates = Object.keys(req.body)
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        
        return res.status(200).send(task)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.delete("/task/:id/", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        
        task.remove()
        return res.status(200).send('Deleted Successfull!')
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router