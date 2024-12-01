import React from 'react'
import { Link } from 'react-router-dom'

const Adminheader = () => {
  return (
    <>
    <div className='p-10 w-full'>
        <div className='flex justify-around'>
            <p className='font-bold text-xl'>VeggeFruit</p>
            <div className='flex gap-10 max-sm:gap-3'>
            <Link to={'/adminhome'}><p className='font-semibold'>Home</p></Link>
            <Link to={'/addproducts'}><p className='font-semibold'>Add Product</p></Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default Adminheader