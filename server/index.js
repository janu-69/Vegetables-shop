const express=require('express');
const cors=require('cors');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require("dotenv").config();
const productmodel=require("./databases/productmodel.js")
const adminmodel=require("./databases/adminmodel.js");
const cookieParser = require('cookie-parser');

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.post("/api/adminsignup",async(req,res)=>{
   console.log(req.body)
   const {name,email,password}=req.body
   if(!name || !email || !password){
    return res.send({message:"fill all the details"})
   }
   const data=await adminmodel.findOne({email:email})
   console.log(data)
   if(data){
    return res.send({message:"user already exist"})
   }
   else{
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
           const admin=await adminmodel.create({
            name,
            email,
            password:hash
           })
           if(admin){
            return res.send({message:"admin created"})
           }
           else{
            return res.send({message:"something went wrong"})
           }
        })
    })
   }
})


app.post("/api/adminlogin",async(req,res)=>{
    console.log(req.body)
    const {email,password}=req.body;

    if(!email || !password){
        return res.send({message:"fill the details"});
    }

    const data=await adminmodel.findOne({email:email})
    console.log(data);
    if(!data){
        return res.send({message:"something went wrong"});
    }
    else{
        bcrypt.compare(password,data.password,(err,result)=>{
           if(result){
            const token=jwt.sign({email},process.env.API_SECRET,{ expiresIn:'1h'});
            console.log(token)
            return res.send({message:"login successfull",token:token,name:data.name})
           }
           else{
            return res.send({message:"incorrect credentials"})
           }
        })
    }
})



app.listen(process.env.PORT,()=>{
    console.log(`server started at http://localhost:${process.env.PORT}`);
})