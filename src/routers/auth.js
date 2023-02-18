const express = require("express")
const User = require("../models/user")

const router = new express.Router()


router.post("/login/", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        return res.send(user)
    } catch (error) {
        return res.status(400).send()
    }
})

module.exports = router