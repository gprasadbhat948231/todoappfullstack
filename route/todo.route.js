const express=require("express")

const {TodoModel}=require("../model/todo.model")

const todoRouter=express.Router()

todoRouter.get("/todos",async(req,res)=>{
    try{
        const data=await TodoModel.find();
        res.send(data)
    }
    catch(err)
    {
        console.log(err)
        console.log("Error while getting todos")
    }
})

todoRouter.post("/addtodo",async(req,res)=>{
    const payload=req.body;
    try{
        const todo=new TodoModel(payload)
        await todo.save()
        res.send("Todo Successfully added")
    }
    catch(err)
    {
        console.log("Error while adding todos")
        console.log(err)
    }
})

todoRouter.patch("/update/:id",async(req,res)=>{
        const updated_todo=req.body;
        const id=req.params.id
        const todo=await TodoModel.findOne({"_id":id})
        const userID_todo=todo.userID
        const userID_Req=req.body.userID;
        try{
            if(userID_todo!==userID_Req)
            {
             res.send("Please select yours")   
            }
            else
            {
                await TodoModel.findByIdAndUpdate({_id:id},updated_todo)
                res.send("Todo is Updated")
            }
        }
        catch(err)
        {
            console.log(err)
        }
})

todoRouter.delete("/delete/:id",async(req,res)=>{
        const id=req.params.id
        const todo=await TodoModel.findOne({"_id":id})
        const userID_todo=todo.userID
        const userID_Req=req.body.userID;
        try{
            if(userID_todo!==userID_Req)
            {
             res.send("Please select yours")   
            }
            else
            {
                await TodoModel.findByIdAndDelete({_id:id})
                res.send("Todo is Deleted")
            }
        }
        catch(err)
        {
            console.log("Error")
            console.log(err)
        }
})

module.exports={todoRouter}