const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "")
        const decoded = jwt.verify(token, "somerandomsignrature")

        const user = await User.findOne({ _id: decoded._id, "tokens.token": token })

        if (!user) {
            throw new Error()
        }

        req.user = user
        next()

    } catch (error) {
        return res.status(401).send("Authentication Required.")
    }
}

module.exports = auth