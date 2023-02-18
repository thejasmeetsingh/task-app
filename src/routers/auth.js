const express = require("express")
const User = require("../models/user")
const authMiddleware = require("../middleware/auth")

const router = new express.Router()


router.post("/login/", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        return res.send({ user, token })
    } catch (error) {
        return res.status(400).send("Invalid Credentials")
    }
})

router.post("/logout/", authMiddleware, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router