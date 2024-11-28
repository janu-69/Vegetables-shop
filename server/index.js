const express=require('express');
const cors=require('cors');
require("dotenv").config();
const productmodel=require("./databases/productmodel.js")

const app=express();




app.listen(process.env.PORT,()=>{
    console.log(`server started at http://localhost:${process.env.PORT}`);
})