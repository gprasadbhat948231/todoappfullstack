const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel } = require("../model/user.model")
const userRouter=express.Router()
require("dotenv").config()

userRouter.post("/register",async(req,res)=>{
    const {name,job,email,pass}=req.body;
    try{
        bcrypt.hash(pass,6,async(err,password)=>{
            if(err)
            {
                console.log(err)
            }
            else{
                const user=new UserModel({name,email,job,pass:password})
                await user.save()
                res.send("Registration Successfull")
            }
        })
    }
    catch(err)
    {
        console.log(err)
        console.log("Error while registering")
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try{
        const user=await UserModel.find({email})
        if(user.length>0)
        {
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
                if(result)
                {
                    const token=jwt.sign({userID:user[0]._id},process.env.key,{expiresIn:60*60})
                    res.send({"token":token})
                }
                else{
                    res.send("Wrong Credentials")
                }
            })
        }
        else{
            res.send("Wrong Credentials")
        }
    }
    catch(err)
    {
        console.log(err)
        console.log("Wrong credentials")
    }
})

module.exports={userRouter}