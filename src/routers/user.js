const express = require("express")
const User = require("../models/user")
const authMiddleware = require("../middleware/auth")

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

router.get("/user/", authMiddleware, async (req, res) => {
    res.send(req.user)
})

router.patch("/user/", authMiddleware, async (req, res) => {
    try {        
        const updates = Object.keys(req.body)

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        
        return res.status(200).send(req.user)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.delete("/user/", authMiddleware, async (req, res) => {
    try {
        req.user.remove()
        return res.status(200).send("Deleted Successfully!")
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router