import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import LoginPage from './pages/Login/LoginPage'
import HomePage from './pages/Home/HomePage'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { CreateWhaleSightingPage } from './pages/WhaleSighting/CreateWhaleSightingPage'
import { ReactElement } from 'react';
 


export default function App(): ReactElement {
    return (
        <Router>
            <Routes>
              <Route path='/' element={<LoginPage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/home' element={<HomePage/>}/>
              <Route path="/add-new-sighting" element={<CreateWhaleSightingPage/>}/>      
           </Routes>        
        </Router>
    );

}  
