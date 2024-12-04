const mongoose=require("mongoose");

const adminschema=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        require:[true,'provide email'],
        unique:true
    },
    password:{
        type:String,
        require:[true,'provide password']
    },

        role:{
            type:String,
            enum:["admin","user"],
            default:"admin"
        },
        
},{timestamps:true})

const adminmodel=new mongoose.model("admin",adminschema);

module.exports=adminmodel;