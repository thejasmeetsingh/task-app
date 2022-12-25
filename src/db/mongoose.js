const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function createUserModel() {
    await mongoose.connect("mongodb://127.0.0.1:27017/task-app", { useNewUrlParser: true })

    const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            validate(value) {
                if (value < 0) {
                    throw new Error("Age must be greater than 0")
                }
            }
        }
    })

    const User = mongoose.model("User", UserSchema)

    const user = new User({
        name: "Jasmeet",
        age: 24
    })
    
    await user.save().then((res) => {
        console.log("Result:", res);
    }).catch((error) => {
        console.log("Error:", error);
    })
}

createUserModel()


async function createTaskModel() {
    await mongoose.connect("mongodb://127.0.0.1:27017/task-app", { useNewUrlParser: true })

    const TaskSchema = new mongoose.Schema({
        description: {
            type: String
        },
        completed: {
            type: Boolean
        }
    })

    const Task = mongoose.model("Task", TaskSchema)

    const task = new Task({
        description: "Lorem Ipsum",
        completed: true
    })
    
    await task.save().then((res) => {
        console.log("Result:", res);
    }).catch((error) => {
        console.log("Error:", error);
    })
}

// createTaskModel()