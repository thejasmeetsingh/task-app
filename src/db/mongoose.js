const mongoose = require("mongoose");
const validator = require("validator");

mongoose.set("strictQuery", false);

async function createUserModel() {
    await mongoose.connect("mongodb://127.0.0.1:27017/task-app", { useNewUrlParser: true })

    const UserSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Please enter a valid email address")
                }
            }
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error("Age must be greater than 0")
                }
            }
        },
    })

    const User = mongoose.model("User", UserSchema)

    const user = new User({
        email: "JASMEET@random.com",
        name: " Jasmeet ",
        // age: 24
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