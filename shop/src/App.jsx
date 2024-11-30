import React from 'react'
import {BrowserRouter,Routes,Link, Route} from "react-router-dom"
import AdminLogin from './Pages/AdminLogin'
import AdminSignup from './Pages/AdminSignup'
import Adminhome from './Pages/Adminhome'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path='/adminlogin' element={<AdminLogin/>}></Route>
      <Route path='/adminsignup' element={<AdminSignup/>}></Route>
      <Route path='/adminhome' element={<Adminhome/>}></Route>



    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App