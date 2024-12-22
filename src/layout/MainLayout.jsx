import React from 'react'
import NavBar from '../components/ui/NavBar'
import Footer from '../components/ui/Footer'
import { ToastContainer } from 'react-toastify'
//import 'react-toastify/dist/ReactTostify.css'
import { Outlet } from 'react-router-dom'

const MainLayout = ({numListItems}) => {
  return (
    <>
    <NavBar numListItems={numListItems} />
    <ToastContainer />
    <Outlet />
    <Footer />
    </>
  )
}

export default MainLayout