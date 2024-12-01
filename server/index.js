const express=require('express');
const cors=require('cors');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const multer=require("multer")
require("dotenv").config();
const productmodel=require("./databases/productmodel.js")
const adminmodel=require("./databases/adminmodel.js");
const cookieParser = require('cookie-parser');
const path=require("path")

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.static('uploads'))


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "_" + Date.now() + (Math.random()*5) + path.extname(file.originalname))
    }
})

const upload =multer({
    storage:storage
});

const adminauth=async(req,res,next)=>{

    try {
        if(!req.headers.token){
            return res.status(403).send({message:"token missing"});
        }
        else{
            const token=req.headers.token;
            console.log(token)
        const dass=jwt.verify(token,process.env.API_SECRET)
        console.log(dass)
        if(!dass){
            return res.send({message:'something went wrong'});
        }
        else{
            const data=await adminmodel.findOne({email:dass.email})

            if(data){
                next();
            }
            else{
                return res.send({message:"something went wrong at auth"});
            }
                
        }
    
        }

        
    } catch (error) {
   return res.status(500).send({message:"unauthorised user"})
        
    }
}



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

app.post('/api/addproducts',adminauth,upload.single('image'),async(req,res)=>{

    const {name,type,stock,old_price,new_price,description}=req.body;
    const image=req.file.filename;
    
    const meta= await productmodel.findOne({name:name})
    if(meta){
        return res.send({message:'product already added'})
    }else{
        const data= await productmodel.create({
            name,
            type,
            stock,
            old_price,
            new_price,
            description,
            image:image
        })
        if(data){
            return res.send({message:"product created"});
        }
        else{
            return res.send({message:'something went wrong'});
        }
    }
    
})

app.get("/api/allproducts",adminauth,async(req,res)=>{
    const data=await productmodel.find();
    if(data){
        return res.send({message:"data fetched",details:data});
    }
    else{
        return res.send({message:"something went wrong"});
    }
})


app.listen(process.env.PORT,()=>{
    console.log(`server started at http://localhost:${process.env.PORT}`);
})