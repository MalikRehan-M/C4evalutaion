const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {type:String,unique:true},
  email: String,
  gender: String,
  password: String,
  age: Number,
  city: String,
  is_married: Boolean,
},{
    versionKey:false
});
const UserModel=mongoose.model("user",userSchema)
module.exports={
    UserModel
}
