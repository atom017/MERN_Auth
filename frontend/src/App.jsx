import React,{Fragment} from 'react'
import Header from './components/Header'
import HomeScreen from './screen/HomeScreen'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <React.Fragment>
    <Header/>
    <ToastContainer/>
    <Container className='my-2'>
    <Outlet/>
    </Container>
    
    </React.Fragment>
    
  )
}

export default App