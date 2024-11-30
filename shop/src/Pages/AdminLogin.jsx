import React, { useState } from 'react'
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';


const AdminLogin = () => {

  const[adminemail,setadminemail]=useState();
  const[adminpassword,setadminpassword]=useState();
  const navigate=useNavigate();

  const handlelogin=()=>{
   const data={
    email:adminemail,
    password:adminpassword
   }

   console.log(data)

   axios.post("http://localhost:8000/api/adminlogin",data)
   .then((res)=>{
    console.log(res.data)
    if(res.data.message==="fill the details"){
      alert('please fill all the details');
    }
    if(res.data.message==="something went wrong"){
      alert("something went wrong please try again later");
    }
    if(res.data.message==="incorrect credentials"){
      alert('something went wrong');
    }
    if(res.data.message==="login successfull"){
      const adminname=res.data.name;
      const token=res.data.token;
      localStorage.setItem("token",token);
      localStorage.getItem("name",adminname);
      alert(`Login Success ...... ${adminname}`);
      navigate("/adminhome");
    }
    setadminemail('');
    setadminpassword('');
   })
   .catch((err)=>{
    console.log(err)
   })
  }
  return (
    <>
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='h-1/2 w-1/2 bg-green-300 rounded-2xl flex flex-col justify-center p-10 max-sm:p-2 max-sm:w-11/12'>
      <h1 className='text-center font-bold text-2xl'>LOGIN FORM</h1>
      <input className='p-1 mt-3 pl-4 rounded-xl border-none' type='email' placeholder='enter the admin email' value={adminemail} onChange={(e)=>setadminemail(e.target.value)}></input>
      <input className='p-1 mt-3 pl-4 rounded-xl border-none' type='password' placeholder='enter the password' value={adminpassword} onChange={(e)=>setadminpassword(e.target.value)}></input>
      <button className='bg-green-600 rounded-2xl mt-4 px-1/2 py-1 hover:bg-green-700' onClick={handlelogin}>login</button> 
      <div className='flex justify-between mt-4'><p>Dont have an account?</p> <Link to={"/adminsignup"}><p className='text-blue-600 cursor-pointer'>Signup</p></Link></div>
      </div>
    </div>
    </>
  )
}

export default AdminLogin
