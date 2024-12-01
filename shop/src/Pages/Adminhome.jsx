import React, { useEffect, useState } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import Adminheader from './Adminheader'
import axios from 'axios';

const Adminhome = () => {

  const [products,setproducts]=useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
    let token=localStorage.getItem("token");
    if(!token){
      navigate("/adminlogin");
    }
  },[])

  useEffect(()=>{
    const headers={
      token:localStorage.getItem("token"),
    }
    axios.get("http://localhost:8000/api/allproducts",{headers})
    .then((res)=>{
      console.log(res);
      setproducts(res.data.details);
    })
    .catch((err)=>{
      console.log(err);
      if(err.response.data.message==='unauthorised user'){
        alert("token missing please relogin");
        navigate('/adminlogin');
      }
    })
  },[])
  return (
    <>
    <Adminheader/>
  
  <div className='w-11/12 p-5 gap-5 flex flex-wrap justify-items-start items-center'>

    {
      products.map(element => {
        return (
          <>
          </>
        )
      })
    }

  </div>
    </>
  )
}

export default Adminhome