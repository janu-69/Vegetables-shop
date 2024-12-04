import React, { useState } from 'react'
import axios from "axios";
import {Link} from 'react-router-dom'

const Usersignup = () => {

    const [username,setusername]=useState();
    const[useremail,setuseremail]=useState();
    const [usernumber,setusernumber]=useState();
    const[userpassword,setuserpassword]=useState();

    const handleusersignup=()=>{
        const data={
         name:username,
         email:useremail,
         number:usernumber,
         password:userpassword
        }
        console.log(data)
        axios.post("http://localhost:9999/api/usersignup",data)
        .then((res)=>{
         console.log(res.data)
         setusername('');
         setuseremail('');
         setusernumber('');
         setuserpassword('');
         if(res.data.message === "fill all the details"){
           alert("please fill all the details");
         }
         if(res.data.message === "user already exist"){
           alert('user already exist try another email');
         }
         if(res.data.message === "user created"){
           alert("user created successfully");
         }
        })
        .catch((err)=>{
         console.log(err)
        })
       }

  return (
    <>
     <div className='h-screen w-full flex justify-center items-center'>
      <div className='h-1/2 w-1/2 bg-green-300 rounded-2xl flex flex-col justify-center p-10 max-sm:p-2 max-sm:w-11/12'>
      <h1 className='text-center font-bold text-2xl'>SIGNUP FORM</h1>
      <input className='p-1 mt-3 pl-4 rounded-xl border-none' type='text' placeholder='enter the name' value={username} onChange={(e)=>setusername(e.target.value)}></input>
      <input className='p-1 mt-3 pl-4 rounded-xl border-none' type='email' placeholder='enter the email' value={useremail} onChange={(e)=>setuseremail(e.target.value)}></input>
      <input className='p-1 mt-3 pl-4 rounded-xl border-none' type='number' placeholder='enter the number' value={usernumber} onChange={(e)=>setusernumber(e.target.value)}></input>
      <input className='p-1 mt-3 pl-4 rounded-xl border-none' type='password' placeholder='enter the password' value={userpassword} onChange={(e)=>setuserpassword(e.target.value)}></input>
      <button className='bg-green-600 rounded-2xl mt-4 px-1/2 py-1 hover:bg-green-700' onClick={handleusersignup}>Signup</button> 
      <div className='flex justify-between mt-4'><p>Already have an account ?</p> <Link to={"/userlogin"}><p className='text-blue-600 cursor-pointer'>Login</p></Link></div>
      </div>
    </div>
    
    
    </>
  )
}

export default Usersignup