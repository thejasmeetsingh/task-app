const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/task-app", { useNewUrlParser: true })


// async function createTaskModel() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/task-app", { useNewUrlParser: true })

//     const TaskSchema = new mongoose.Schema({
//         description: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         completed: {
//             type: Boolean,
//             default: false
//         }
//     })

//     const Task = mongoose.model("Task", TaskSchema)

//     const task = new Task({
//         description: " Lorem Ipsum",
//         // completed: true
//     })
    
//     await task.save().then((res) => {
//         console.log("Result:", res);
//     }).catch((error) => {
//         console.log("Error:", error);
//     })
// }

// createTaskModel()