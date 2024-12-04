import React from 'react'
import {BrowserRouter,Routes,Link, Route} from "react-router-dom"
import AdminLogin from './Pages/AdminLogin'
import AdminSignup from './Pages/AdminSignup'
import Adminhome from './Pages/Adminhome'
import Adminaddproduct from './Pages/Adminaddproduct'
import Admineditpage from './Pages/Admineditpage'
import Usersignup from './Userpage/Usersignup'
import Userhome from './Userpage/Userhome'
import UserLogin from './Userpage/Userlogin'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path='/adminlogin' element={<AdminLogin/>}></Route>
      <Route path='/adminsignup' element={<AdminSignup/>}></Route>
      <Route path='/adminhome' element={<Adminhome/>}></Route>
      <Route path='/addproducts' element={<Adminaddproduct/>}></Route>
      <Route path='/editproducts/:id' element={<Admineditpage/>}></Route>

      <Route path='/usersignup' element={<Usersignup/>}></Route>
      <Route path='/userlogin' element={<UserLogin/>}></Route>
      <Route path='/home' element={<Userhome/>}></Route>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App