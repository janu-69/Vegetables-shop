const mongoose=require("mongoose");

const adminschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const adminmodel=new mongoose.model("admin",adminschema);

module.exports=adminmodel;