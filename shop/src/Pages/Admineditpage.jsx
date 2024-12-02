import React, { useEffect,useState } from 'react'
import Adminheader from './Adminheader';
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';


const Admineditpage = () => {
const {id}=useParams();
console.log(id)

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

  const navigate=useNavigate();

  const handleedit=(e)=>{
    e.preventDefault();
    const headers = {
      token: localStorage.getItem('token'),
    };
    let formdata = new FormData();
          formdata.append('name', productname);
          formdata.append('type', producttype);
          formdata.append('description', productdescription);
          formdata.append('old_price', productoldprice);
          formdata.append('new_price', productnewprice);
          formdata.append('stock', productstock);
          formdata.append('image',image);
          formdata.append("dataid",id)

          console.log(formdata);
          axios.post('http://localhost:9999/api/editproducts', formdata, { headers })
          .then((res) => {
            console.log(res.data);
            if(res.data==="success"){
              alert('product updated successfullyyy...');
              navigate("/adminhome");
            }
          })
          .catch((error) => {
            console.log(error);
            if(error.response.data.message==='unauthorised user'){
              alert("token expired please login again....");
              navigate('/adminlogin');
            }
            if(error.response.data.message==='token missing',{}){
              alert("token missing please relogin");
              navigate("/adminlogin");
            }
          });
  }
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
            <button className='bg-green-500 text-white px-8 py-1 rounded-md' onClick={handleedit}>Edit Product</button>
        </div>
        </form>
    </div>
    </>
  )
}

export default Admineditpage