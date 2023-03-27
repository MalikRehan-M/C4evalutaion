const JWT=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        const decoded=JWT.verify(token,"malik")
        if(decoded){
            req.body.userID=decoded.userID
            next()
        }else{
            res.status(400).send({"msg":"Kindly login first"});
        }
    }else{
        res.status(400).send({"msg":"Kindly login first"})
    }
}

module.exports={auth}