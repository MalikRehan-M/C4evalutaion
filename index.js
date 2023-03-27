const express=require("express");
const {connection}=require("./db")
require("dotenv").config()
const{userRouter}=require("./routes/user.routes")
const{postRouter}=require("./routes/post.routes")
const{auth}=require("./middleware/auth.middleware")
const cors=require("cors")

const app=express()

app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connection to DB successful")
    } catch (error) {
        console.log("Connection to DB Unsuccessful")
        console.log(error)
    }
    console.log(`Sever is running at post ${process.env.port}`)
})