const mongoose=require("mongoose");

const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    address: [
        {
          street: { type: String, required: true },
          city: { type: String, required: true },
          state: { type: String, required: true },
          district: { type: String, required: true },
          mandel: { type: String, required: true },
          postalCode: { type: String, required: true },
          phoneNumber:{type:Number,required:true}
        },
      ],
      shoppingcart:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"products"
        }
    ],
    orderhistory:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"orders"
        }
    ],
    password:{
        type:String,
        required:true
    },
},{timestamps:true})

const usermodel=new mongoose.model("users",userschema);

module.exports=usermodel;