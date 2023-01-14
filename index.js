const express = require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./route/user.route")
const { todoRouter } = require("./route/todo.route")
const { authenticate } = require("./middlewares/authenticate.middleware")
require("dotenv").config()
const app = express();
const cors=require("cors")
app.use(cors({
    origin:"*"
}))

app.use(express.json())

app.use("/user", userRouter)
app.use(authenticate)
app.use("/todo", todoRouter)


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected to mongodb")
    }
    catch (err) {
        console.log(err)
        console.log("Error while connecting to db")
    }
    console.log("Server is running")
})