import React from 'react'
import {BrowserRouter,Routes,Link, Route} from "react-router-dom"
import AdminLogin from './Pages/AdminLogin'
import AdminSignup from './Pages/AdminSignup'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path='/adminlogin' element={<AdminLogin/>}></Route>
      <Route path='/adminsignup' element={<AdminSignup/>}></Route>



    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App