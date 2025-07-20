const mongoose = require("mongoose");
const passport = require("passport");
const Schema = mongoose.Schema;
const PassportLocalMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
});


//This is used for mongoose automatically assinged username as well as  password with salting and hashing 
userSchema.plugin(PassportLocalMongoose);

module.exports=mongoose.model("user",userSchema);