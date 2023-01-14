const mongoose=require("mongoose")

const todoSchema=mongoose.Schema({
    todo:String,
    creator:String,
    status:String,
    deadline:String,
    userID:String
})

const TodoModel=mongoose.model("todo",todoSchema)

module.exports={TodoModel}