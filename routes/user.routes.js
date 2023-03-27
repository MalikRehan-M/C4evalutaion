const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../model/user.model")
const JWT=require("jsonwebtoken")
const bcrypt=require("bcrypt")

userRouter.post("/register",async(req,res)=>{
    const {email,name,password,gender,age,city,is_married}=req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            const user=new UserModel({email,name,password:hash,gender,age,city,is_married})
            await user.save()
            res.status(200).send({"msg":"User has been registered successfully"})
        })
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    res.status(200).send({"msg":"Login Succesfull","token":JWT.sign({"userID":user._id},"malik")})
                }else{
                    res.status(200).send({"msg":"Please enter correct credentials"})
                }
            })
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
module.exports={userRouter}