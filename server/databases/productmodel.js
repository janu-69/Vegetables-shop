const mongoose=require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb is connected");
})
.catch((err)=>{
    console.log("err is" , err)
})

const productschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    type:{
        type:String,
    },
    stock:{
        type:Number,
    },
    old_price:{
        type:Number,
    },
    new_price:{
        type:Number,
    },
    description:{
        type:String,
    },
},{timestamps:true})

const productmodel=new mongoose.model("products",productschema)

module.exports=productmodel;

