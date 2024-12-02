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
    axios.get("http://localhost:9999/api/allproducts",{headers})
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
  const hanldeeditproduct=(element)=>{
    console.log(element);
    navigate(`/editproducts/${element._id}`)
  }

  const handledelete=(element)=>{
    const headers={
      token:localStorage.getItem("token")
    }
    console.log(element._id)
    const id={
      id:element._id
    }
    axios.post("http://localhost:9999/api/deleteproduct",id,{headers})
    .then((res)=>{
      console.log(res)
      if(res.data.message==='deleted'){
        window.location.reload();
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  const handlelogout=()=>{
    localStorage.clear();
    navigate("/adminlogin");
  }
  return (
    <>
    <Adminheader/>
    <div className='flex justify-between p-5'>
      <p className='font-bold text-2xl'>Admin Panel</p>
      <button className='px-5 bg-red-500 text-white rounded-xl' onClick={handlelogout}>Logout</button>
    </div>
  
 <div className='w-full flex justify-center items-center'>
 <div className='w-11/12 gap-16 p-10 flex flex-wrap place-items-center'>

{
  products.map(element => {
    return (
      <>
      <div className='w-[50vh] h-[56vh] max-sm:h-[45vh] rounded-xl border-2 border-zinc-600 overflow-auto p-2'>

        <img className='h-52 w-96' src={`http://localhost:9999/${element.image}`}></img>
       <div className='mt-3'>
       <p className=''>Name : {element.name}</p>
        <p className=''>type : {element.type}</p>
        <div className='flex gap-1'><p>Only</p><p className='text-red-500 font-semibold'>{element.stock}</p><p>KG'S Left !!!</p></div>
        <div> Description : {element.description}</div>
        <div className='flex gap-2'><p>Price :</p><p className='line-through'>{element.old_price}</p><p className='font-semibold'>{element.new_price}</p></div>
        <div className='w-full flex justify-around max-xl:mt-2'><button className='px-5 bg-pink-400 rounded-md text-white' onClick={()=>{hanldeeditproduct(element)}}>Edit</button><button className='px-5 bg-red-500 rounded-md text-white' onClick={()=>{handledelete(element)}}>Delete</button></div>
       </div>
      </div>
      </>
    )
  })
}

</div>
 </div>
    </>
  )
}

export default Adminhome