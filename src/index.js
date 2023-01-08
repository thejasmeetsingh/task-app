const express = require("express");

const app = express();
const port  = process.env.PORT || 3000

app.use(express.json());

app.post("/users/", (req, res) => {
    res.send({"data": "testing"})
})

app.listen(port, () => { 
    console.log(`Server is up at port ${port}`) 
})