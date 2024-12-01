import React, { useState } from 'react'
import Adminheader from './Adminheader'
import axios from "axios"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Adminaddproduct = () => {
const navigate=useNavigate();
    useEffect(()=>{
        let token=localStorage.getItem("token");
        if(!token){
            alert("please login agaain");
          navigate("/adminlogin");
        }
      },[])


    const [productname,setproductname]=useState('');
    const [producttype,setproducttype]=useState('');
    const [productstock,setproductstock]=useState('');
    const [productoldprice,setproductoldprice]=useState('');
    const [productnewprice,setproductnewprice]=useState('');
    const [productdescription,setproductdescription]=useState('');
    const [image,setimage]=useState();

    const handlesubmit = (e) => {
        e.preventDefault();
        const headers = {
          token: localStorage.getItem('token'),
        };
        if (image && productname && producttype && productdescription && productoldprice && productnewprice && productstock) {
          let formdata = new FormData();
          formdata.append('name', productname);
          formdata.append('type', producttype);
          formdata.append('description', productdescription);
          formdata.append('old_price', productoldprice);
          formdata.append('new_price', productnewprice);
          formdata.append('stock', productstock);
          formdata.append('image',image)

          console.log(formdata);
    
         axios.post('http://localhost:8000/api/addproducts', formdata, { headers })
            .then((res) => {
              console.log(res);
              if(res.data.message==='product created'){
                alert('product created');
              }
            })
            .catch((error) => {
              console.log(error);
              if(error.response.data.message==='unauthorised user'){
                alert("token expired please login again....");
                navigate('/adminlogin');
              }
              if(err.response.data.message==='token missing',{}){
                alert("token missing please relogin");
                navigate("/adminlogin");
              }
            });
            setproductname('');
            setproducttype('');
            setproductstock('');
            setproductoldprice('');
            setproductnewprice('');
            setproductdescription('')
            setimage();
        } else {
          alert('Please fill all the product details');
        }
      };
  return (
    <>
    <Adminheader/>
    <div className='w-full'>
        <form className='w-full flex flex-col justify-center items-center gap-3'>
        
    <div className='max-sm:w-11/12 w-7/12 flex flex-col'>
            <label>Enter the Product's name :</label>
            <input type='text' className='border-2 border-zinc-500 p-1' value={productname} onChange={(e)=>setproductname(e.target.value)}></input>
        </div>

        <div className='max-sm:w-11/12 w-7/12 flex flex-col'>
            <label>Enter the Product's type :</label>
            <input type='text' className='border-2 border-zinc-500 p-1' value={producttype} onChange={(e)=>setproducttype(e.target.value)}></input>
        </div>

        <div className='max-sm:w-11/12 w-7/12 flex flex-col'>
            <label>Enter the Product's stock :</label>
            <input type='number' className='border-2 border-zinc-500 p-1' value={productstock} onChange={(e)=>setproductstock(e.target.value)}></input>
        </div>

        <div className='max-sm:w-11/12 w-7/12 flex flex-col'>
            <label>Enter the Product's old price :</label>
            <input type='number' className='border-2 border-zinc-500 p-1' value={productoldprice} onChange={(e)=>setproductoldprice(e.target.value)}></input>
        </div>

        <div className='max-sm:w-11/12 w-7/12 flex flex-col'>
            <label>Enter the Product's new price :</label>
            <input type='number' className='border-2 border-zinc-500 p-1' value={productnewprice} onChange={(e)=>setproductnewprice(e.target.value)}></input>
        </div>

        <div className='max-sm:w-11/12 w-7/12 flex flex-col'>
            <label>Enter the Product's description :</label>
            <textarea className='border-2 border-zinc-500 p-1' value={productdescription} onChange={(e)=>setproductdescription(e.target.value)}></textarea>
        </div>

        <div className='max-sm:w-11/12 w-7/12 flex flex-col'>
            <label>upload the image</label>
            <input type='file' required  onChange={(e)=>setimage(e.target.files[0])}></input>
        </div>

        <div>
            <button className='bg-green-500 text-white px-8 py-1 rounded-md' onClick={handlesubmit}>Submit</button>
        </div>
        </form>
    </div>
    </>
  )
}

export default Adminaddproduct