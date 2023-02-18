const express = require("express")
const User = require("../models/user")

const router = new express.Router()

router.post("/user/", async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).send({ user, token })
    } catch (error) {
        res.status(500).send(error)
    }

})

router.get("/user/", async (req, res) => {

    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.get("/user/:id/", async (req, res) => {
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

router.patch("/user/:id/", async (req, res) => {
    try {
        
        const updates = Object.keys(req.body)
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.delete("/user/:id/", async (req, res) => {
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

module.exports = router