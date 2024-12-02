import React from 'react'
import { Link } from 'react-router-dom'

const Adminheader = () => {
  return (
    <>
    <div className='p-10 w-full'>
        <div className='flex justify-around'>
            <Link to={"/adminhome"}><p className='font-bold text-xl hover:scale-125'>VeggeFruit</p></Link>
            <div className='flex gap-10 max-sm:gap-3'>
            <Link to={'/adminhome'}><p className='font-semibold hover:scale-125'>Home</p></Link>
            <Link to={'/addproducts'}><p className='font-semibold hover:scale-125'>Add Product</p></Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default Adminheader