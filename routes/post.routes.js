const express = require("express");
const postRouter = express.Router();
const { PostModel } = require("../model/post.model");
const JWT = require("jsonwebtoken");

postRouter.get("/", async (req, res) => {
    const token = req.headers.authorization;
    const decoded = JWT.verify(token, "malik");
  try {
    if (decoded) {
        const query={"userID":decoded.userID}
        if(req.query.minComments && req.query.maxComments){
            query.no_of_comments={$gte:req.query.minComments,$lte:req.query.maxComments}
        }
        if(req.query.device){
            query.device=req.query.device
        }
        const page=req.params.no
        const start=(page-1)*3
      const posts = await PostModel.find(query).skip(start).limit(3);
      res.status(200).send(posts);
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});


postRouter.post("/add", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = JWT.verify(token, "malik");
  try {
    if (decoded) {
      const post = new PostModel(req.body);
      await post.save();
      res.status(200).send({ msg: "Posted successfully" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});


postRouter.get("/top", async (req, res) => {
    const token = req.headers.authorization;
    const decoded = JWT.verify(token, "malik");
  try {
    if (decoded) {
        const query={"userID":decoded.userID}
        const page=1
        const start=(page-1)*3
      const posts = await PostModel.find(query).sort("-no_of_comments").skip(start).limit(3);
      res.status(200).send(posts);
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});


postRouter.patch("/update/:postID", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = JWT.verify(token, "malik");
  const postID=req.params.postID
  const payload=req.body
  const reqID=decoded.userID
  const post=PostModel.findOne({_id:postID})
  try {
      if(reqID==post.userID){
          await PostModel.findByIdAndUpdate({_id:postID},payload)
          res.status(200).send({"msg":"Post has been Updated"})
      }else{
          res.status(200).send({"msg":"Not authorized"})
      }
  } catch (error) {
      res.status(200).send({"msg":error.message})
  }
});

postRouter.get("/delete/:postID", async (req, res) => {
    const token = req.headers.authorization;
    const decoded = JWT.verify(token, "malik");
    const postID=req.params.postID
    const reqID=decoded.userID
    const post=PostModel.findOne({_id:postID})
    try {
        if(reqID==post.userID){
            await PostModel.findByIdAndDelete({_id:postID})
            res.status(200).send({"msg":"Post has been deleted"})
        }else{
            res.status(200).send({"msg":"Not authorized"})
        }
    } catch (error) {
        res.status(200).send({"msg":error.message})
    }
});

module.exports = { postRouter };
