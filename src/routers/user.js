const express = require("express")
const User = require("../models/user")
const authMiddleware = require("../middleware/auth")
const multer = require("multer")
const sharp = require("sharp")
const { sendWelcomeEmail, sendAccountDeletionEmail } = require("../emails/account")


const upload = multer({
    limits: {
        fileSize:1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload a jpg, jpeg or png image file"))
        }
        cb(undefined, true)
    }
})


const router = new express.Router()

router.post("/user/", async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        await sendWelcomeEmail(user.email, user.name)
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
        sendAccountDeletionEmail(req.user.email, req.user.name)
        await req.user.remove()
        return res.status(200).send("Deleted Successfully!")
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.post("/user/me/avatar/", authMiddleware, upload.single("avatar"), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ height: 250, width: 250 }).png().toBuffer()
    
    req.user.avatar = buffer
    await req.user.save()
    
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete("/user/me/avatar/", authMiddleware, async (req, res) => {
    console.log(req)
    req.user.avatar = undefined
    await req.user.save()
    
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get("/user/:id/avatar/", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router