import React, { useState } from 'react'
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';

const UserLogin = () => {
  const[useremail,setuseremail]=useState();
  const[userpassword,setuserpassword]=useState();
  const navigate=useNavigate();

  const handleuserlogin=()=>{
    const data={
     email:useremail,
     password:userpassword
    }
 
    console.log(data)
 
    axios.post("http://localhost:9999/api/userlogin",data)
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
       const username=res.data.name;
       const token=res.data.token;
       localStorage.setItem("token",token);
       localStorage.getItem("name",username);
       alert(`Login Success ...... ${username}`);
       navigate("/home");
     }
     setuseremail('');
     setuserpassword('');
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
      <input className='p-1 mt-3 pl-4 rounded-xl border-none' type='email' placeholder='enter the  email' value={useremail} onChange={(e)=>setuseremail(e.target.value)}></input>
      <input className='p-1 mt-3 pl-4 rounded-xl border-none' type='password' placeholder='enter the password' value={userpassword} onChange={(e)=>setuserpassword(e.target.value)}></input>
      <button className='bg-green-600 rounded-2xl mt-4 px-1/2 py-1 hover:bg-green-700' onClick={handleuserlogin}>login</button> 
      <div className='flex justify-between mt-4'><p>Dont have an account?</p> <Link to={"/usersignup"}><p className='text-blue-600 cursor-pointer'>Signup</p></Link></div>
      </div>
    </div>
    </>
  )
}

export default UserLogin